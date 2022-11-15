package br.com.jhisolution.user.hunters.service.impl;

import br.com.jhisolution.user.hunters.domain.Reuniao;
import br.com.jhisolution.user.hunters.report.util.ReportExporter;
import br.com.jhisolution.user.hunters.repository.ReuniaoRepository;
import br.com.jhisolution.user.hunters.service.ReuniaoService;
import br.com.jhisolution.user.hunters.web.rest.dto.FiltroReuniaoDTO;
import br.com.jhisolution.user.hunters.web.rest.dto.ReuniaoDTO;
import com.google.gson.Gson;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JsonDataSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;

/**
 * Service Implementation for managing {@link Reuniao}.
 */
@Service
@Transactional
public class ReuniaoServiceImpl implements ReuniaoService {

    private final Logger log = LoggerFactory.getLogger(ReuniaoServiceImpl.class);

    private final ReuniaoRepository reuniaoRepository;
    private final Path fileStorageLocation;

    public ReuniaoServiceImpl(ReuniaoRepository reuniaoRepository) {
        this.reuniaoRepository = reuniaoRepository;
        this.fileStorageLocation = Paths.get("./").toAbsolutePath().normalize();
    }

    @Override
    public Reuniao save(Reuniao reuniao) {
        log.debug("Request to save Reuniao : {}", reuniao);
        return reuniaoRepository.save(reuniao);
    }

    @Override
    public Reuniao update(Reuniao reuniao) {
        log.debug("Request to save Reuniao : {}", reuniao);
        return reuniaoRepository.save(reuniao);
    }

    @Override
    public Optional<Reuniao> partialUpdate(Reuniao reuniao) {
        log.debug("Request to partially update Reuniao : {}", reuniao);

        return reuniaoRepository
            .findById(reuniao.getId())
            .map(existingReuniao -> {
                if (reuniao.getNome() != null) {
                    existingReuniao.setNome(reuniao.getNome());
                }
                if (reuniao.getDescricao() != null) {
                    existingReuniao.setDescricao(reuniao.getDescricao());
                }
                if (reuniao.getData() != null) {
                    existingReuniao.setData(reuniao.getData());
                }
                if (reuniao.getDataInicio() != null) {
                    existingReuniao.setDataInicio(reuniao.getDataInicio());
                }
                if (reuniao.getDataFim() != null) {
                    existingReuniao.setDataFim(reuniao.getDataFim());
                }
                if (reuniao.getHoraInicio() != null) {
                    existingReuniao.setHoraInicio(reuniao.getHoraInicio());
                }
                if (reuniao.getHoraFim() != null) {
                    existingReuniao.setHoraFim(reuniao.getHoraFim());
                }
                if (reuniao.getTipoReuniao() != null) {
                    existingReuniao.setTipoReuniao(reuniao.getTipoReuniao());
                }
                if (reuniao.getObs() != null) {
                    existingReuniao.setObs(reuniao.getObs());
                }

                return existingReuniao;
            })
            .map(reuniaoRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Reuniao> findAll(Pageable pageable) {
        log.debug("Request to get all Reuniaos");
        return reuniaoRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Reuniao> findOne(Long id) {
        log.debug("Request to get Reuniao : {}", id);
        return reuniaoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Reuniao : {}", id);
        reuniaoRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ReuniaoDTO> findAllByReuniaoId(Long id) {
        log.debug("Request to get Reuniao : {}", id);
        return reuniaoRepository.findAllByReuniaoId(id).stream().map(reuniao -> reuniao.toReuniaoDTO()).collect(Collectors.toList());
    }

    @Override
    public Resource findAllByReuniaoIdJasper(FiltroReuniaoDTO filtro) {
        log.debug("Request to get jasper report of Meeting for ID: {}", filtro.getIdReuniao());
        try {
            File fileReuniao = ResourceUtils.getFile("classpath:templates/jasper/reuniao/ata_reuniao.jrxml");
            //JasperReport jasperReport = (JasperReport)JRLoader.loadObject(file);
            JasperReport jasperReuniao = JasperCompileManager.compileReport(fileReuniao.getAbsolutePath());
            //JRSaver.saveObject(jasperReport, "report_receber.jasper");

            List<ReuniaoDTO> lista = this.findAllByReuniaoId(filtro.getIdReuniao());
            String strJson = Objects.nonNull(lista) ? new Gson().toJson(lista) : "";
            log.debug("String JSON utilizada: {}", strJson);
            InputStream stream = new ByteArrayInputStream(strJson.getBytes());
            JsonDataSource dataSource = new JsonDataSource(stream);
            //JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(lista);

            Map<String, Object> parameters = new HashMap<>();
            parameters.put("SUBREPORT_DIR", "templates/jasper/reuniao/");
            //parameters.put("userName", "Dhaval's Orders");

            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReuniao, parameters, dataSource);
            ReportExporter simpleReportExporter = new ReportExporter(jasperPrint);
            String fileName = "";
            log.debug("Cria arquivo na pasta: {}", this.fileStorageLocation);

            switch (filtro.getTipo()) {
                case "PDF":
                case "PRINT":
                    fileName = "ata_reuniao.pdf";
                    //				JasperExportManager.exportReportToPdfFile(jasperPrint, this.fileStorageLocation + "/example.pdf");
                    simpleReportExporter.exportToPdf(this.fileStorageLocation + "/" + fileName, "HUNTERS");
                    break;
                case "XLSX":
                    fileName = "ata_reuniao.xlsx";
                    simpleReportExporter.exportToXlsx(this.fileStorageLocation + "/" + fileName, "HUNTERS");
                    break;
                case "CSV":
                    fileName = "ata_reuniao.csv";
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
