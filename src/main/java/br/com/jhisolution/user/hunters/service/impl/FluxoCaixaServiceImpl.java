package br.com.jhisolution.user.hunters.service.impl;

import br.com.jhisolution.user.hunters.report.util.ReportExporter;
import br.com.jhisolution.user.hunters.service.FluxoCaixaService;
import br.com.jhisolution.user.hunters.service.PagarService;
import br.com.jhisolution.user.hunters.service.ReceberService;
import br.com.jhisolution.user.hunters.web.rest.dto.FiltroFluxoCaixaDTO;
import br.com.jhisolution.user.hunters.web.rest.dto.FiltroPagarDTO;
import br.com.jhisolution.user.hunters.web.rest.dto.FiltroReceberDTO;
import br.com.jhisolution.user.hunters.web.rest.dto.FluxoCaixaDTO;
import br.com.jhisolution.user.hunters.web.rest.dto.PagarDTO;
import br.com.jhisolution.user.hunters.web.rest.dto.ReceberDTO;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;

@Service
@Transactional
public class FluxoCaixaServiceImpl implements FluxoCaixaService {

    private final Logger log = LoggerFactory.getLogger(FluxoCaixaServiceImpl.class);
    private PagarService pagarService;
    private ReceberService receberService;
    private Float saldoFinal = 0F;
    private final Path fileStorageLocation;

    public FluxoCaixaServiceImpl(PagarService pagarService, ReceberService receberService) {
        this.pagarService = pagarService;
        this.receberService = receberService;
        this.fileStorageLocation = Paths.get("./").toAbsolutePath().normalize();
    }

    @Override
    public List<FluxoCaixaDTO> findAllByDataInicialAndDataFinal(FiltroFluxoCaixaDTO filtro) {
        log.debug("Request to get Fluxo Caixa by data início:{} e data fim:{}", filtro.getDataInicio(), filtro.getDataFim());

        //DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/YYY");

        FiltroPagarDTO filtroPagar = FiltroPagarDTO.gitInstance(filtro.getDataInicio(), filtro.getDataFim());
        List<PagarDTO> listaPagar = pagarService.findAllByDataInicialAndDataFinal(filtroPagar);

        FiltroReceberDTO filtroReceber = FiltroReceberDTO.getInstance(filtro.getDataInicio(), filtro.getDataFim());
        List<ReceberDTO> listaReceber = receberService.findAllByDataInicialAndDataFinal(filtroReceber);

        List<FluxoCaixaDTO> listaFluxo = new ArrayList<>();

        saldoFinal = 0F;

        log.debug("findAllByDataInicialAndDataFinal -> Data início:{} e data fim:{}", filtro.getDataInicio(), filtro.getDataFim());

        if (listaPagar.size() >= listaReceber.size()) {
            listaPagar.forEach(pagar -> {
                FluxoCaixaDTO fluxo = FluxoCaixaDTO.getInstance(pagar.getData(), 0F, "", pagar.getValor(), pagar.getStatus(), 0F, 0F);
                for (ReceberDTO receber : listaReceber) {
                    if (pagar.getData().equals(receber.getData()) && receber.getTratada() == false) {
                        if (pagar.getData().equals(receber.getData())) {
                            fluxo.setReceber(receber.getValor());
                            fluxo.setStatusReceber(receber.getStatus());
                            receber.setTratada(true);
                            break;
                        }
                    }
                }
                listaFluxo.add(fluxo);
            });

            listaReceber
                .stream()
                .forEach(receber -> {
                    if (receber.getTratada() == false) {
                        listaFluxo.add(
                            FluxoCaixaDTO.getInstance(receber.getData(), receber.getValor(), receber.getStatus(), 0F, "", 0F, 0F)
                        );
                        receber.setTratada(true);
                    }
                });
        } else {
            listaReceber.forEach(receber -> {
                FluxoCaixaDTO fluxo = FluxoCaixaDTO.getInstance(receber.getData(), receber.getValor(), receber.getStatus(), 0F, "", 0F, 0F);
                for (PagarDTO pagar : listaPagar) {
                    if (pagar.getData().equals(receber.getData()) && pagar.getTratada() == false) {
                        fluxo.setPagar(pagar.getValor());
                        fluxo.setStatusPagar(pagar.getStatus());
                        pagar.setTratada(true);
                    }
                    break;
                }
                listaFluxo.add(fluxo);
            });
            listaPagar
                .stream()
                .forEach(pagar -> {
                    if (pagar.getTratada() == false) {
                        listaFluxo.add(FluxoCaixaDTO.getInstance(pagar.getData(), pagar.getValor(), pagar.getStatus(), 0F, "", 0F, 0F));
                        pagar.setTratada(true);
                    }
                });
        }

        List<FluxoCaixaDTO> lista = listaFluxo.stream().sorted(Comparator.comparing(FluxoCaixaDTO::getData)).collect(Collectors.toList());

        lista.forEach(fluxo -> {
            float receber = Objects.nonNull(fluxo.getReceber()) ? fluxo.getReceber() : 0F;
            float pagar = Objects.nonNull(fluxo.getPagar()) ? fluxo.getPagar() : 0F;
            float saldo = receber - pagar;
            saldoFinal += saldo;
            fluxo.setSaldo(saldo);
            fluxo.setSaldoFinal(saldoFinal);
        });

        return lista;
    }

    @Override
    public Resource findAllByDataInicialAndDataFinalJasper(FiltroFluxoCaixaDTO filtro) {
        log.debug(
            "Request to get jasper report of dataInicial: {}, dataFinal: {}, tipo: {}",
            filtro.getDataInicio(),
            filtro.getDataFim(),
            filtro.getTipo()
        );
        try {
            File file = ResourceUtils.getFile("classpath:templates/jasper/pagar-receber/fluxo_caixa.jrxml");
            //JasperReport jasperReport = (JasperReport)JRLoader.loadObject(file);
            JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());
            //JRSaver.saveObject(jasperReport, "report_receber.jasper");

            List<FluxoCaixaDTO> lista = this.findAllByDataInicialAndDataFinal(filtro);
            //String strJson = Objects.nonNull(dto)? gson.toJson(dto) : "";
            //log.debug("String JSON utilizada: {}", strJson);
            //InputStream stream = new ByteArrayInputStream(strJson.getBytes());
            //JsonDataSource dataSource = new JsonDataSource(stream);
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(lista);

            Map<String, Object> parameters = new HashMap<>();
            //parameters.put("userName", "Dhaval's Orders");

            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
            ReportExporter simpleReportExporter = new ReportExporter(jasperPrint);
            String fileName = "";
            log.debug("Cria arquivo na pasta: {}", this.fileStorageLocation);

            switch (filtro.getTipo()) {
                case "PDF":
                case "PRINT":
                    fileName = "fluxo_caixa.pdf";
                    //				JasperExportManager.exportReportToPdfFile(jasperPrint, this.fileStorageLocation + "/example.pdf");
                    simpleReportExporter.exportToPdf(this.fileStorageLocation + "/" + fileName, "HUNTERS");
                    break;
                case "XLSX":
                    fileName = "fluxo_caixa.xlsx";
                    simpleReportExporter.exportToXlsx(this.fileStorageLocation + "/" + fileName, "HUNTERS");
                    break;
                case "CSV":
                    fileName = "fluxo_caixa.csv";
                    simpleReportExporter.exportToCsv(this.fileStorageLocation + "/" + fileName);
                    break;
                default:
                    break;
            }
            log.debug("Lê arquivo {} na pasta: {}", fileName, this.fileStorageLocation);
            return loadFileAsResource(fileName);
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (JRException e) {
            e.printStackTrace();
        } catch (IOException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        return null;
    }

    private Resource loadFileAsResource(String fileName) throws IOException {
        try {
            Path filePath = this.fileStorageLocation.resolve(fileName).normalize();
            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists()) {
                return resource;
            } else {
                throw new FileNotFoundException("File not found " + fileName);
            }
        } catch (MalformedURLException ex) {
            throw new FileNotFoundException("File not found " + fileName);
        }
    }
}
