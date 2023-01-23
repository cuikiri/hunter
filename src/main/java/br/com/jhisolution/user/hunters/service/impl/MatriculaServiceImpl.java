package br.com.jhisolution.user.hunters.service.impl;

import br.com.jhisolution.user.hunters.domain.Matricula;
import br.com.jhisolution.user.hunters.report.util.ReportExporter;
import br.com.jhisolution.user.hunters.repository.MatriculaRepository;
import br.com.jhisolution.user.hunters.service.MatriculaService;
import br.com.jhisolution.user.hunters.service.dto.MatriculaDTO;
import br.com.jhisolution.user.hunters.web.rest.dto.FiltroMatriculaDTO;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ResourceUtils;

/**
 * Service Implementation for managing {@link Matricula}.
 */
@Service
@Transactional
public class MatriculaServiceImpl implements MatriculaService {

    private final Logger log = LoggerFactory.getLogger(MatriculaServiceImpl.class);

    private final MatriculaRepository matriculaRepository;
    private final Path fileStorageLocation;

    public MatriculaServiceImpl(MatriculaRepository matriculaRepository) {
        this.matriculaRepository = matriculaRepository;
        this.fileStorageLocation = Paths.get("./").toAbsolutePath().normalize();
    }

    @Override
    public Matricula save(Matricula matricula) {
        log.debug("Request to save Matricula : {}", matricula);
        return matriculaRepository.save(matricula);
    }

    @Override
    public Matricula update(Matricula matricula) {
        log.debug("Request to save Matricula : {}", matricula);
        return matriculaRepository.save(matricula);
    }

    @Override
    public Optional<Matricula> partialUpdate(Matricula matricula) {
        log.debug("Request to partially update Matricula : {}", matricula);

        return matriculaRepository
            .findById(matricula.getId())
            .map(existingMatricula -> {
                if (matricula.getData() != null) {
                    existingMatricula.setData(matricula.getData());
                }
                if (matricula.getObs() != null) {
                    existingMatricula.setObs(matricula.getObs());
                }

                return existingMatricula;
            })
            .map(matriculaRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Matricula> findAll(Pageable pageable) {
        log.debug("Request to get all Matriculas");
        return matriculaRepository.findAll(pageable);
    }

    public Page<Matricula> findAllWithEagerRelationships(Pageable pageable) {
        return matriculaRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Matricula> findOne(Long id) {
        log.debug("Request to get Matricula : {}", id);
        return matriculaRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Matricula : {}", id);
        matriculaRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Matricula> findAllByPessoaId(Long id, Pageable pageable) {
        log.debug("Request to get all Matricula by DadoPessoal id");
        return matriculaRepository.findAllByPessoaId(id, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Matricula> findAllByPessoaLikeNome(String nome, Pageable pageable) {
        log.debug("Request to get all Matricula by DadoPessoal id");
        return matriculaRepository.findAllByPessoaLikeNome(nome, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Resource findOneJasper(FiltroMatriculaDTO filtro) {
        log.debug("Request to get jasper report of findOneJasper");
        String[] docs = {
            "autorizacao_esportiva.jrxml",
            "autorizacao_imagem.jrxml",
            "questionario_saude.jrxml",
            "regras_projeto.jrxml",
            "termo_lgpd.jrxml",
        };
        List<String> arrayDoc = new ArrayList<String>(Arrays.asList(docs));
        StringBuilder url = new StringBuilder("classpath:templates/jasper/matricula/");
        url.append(arrayDoc.get(filtro.getTipoDocumento()));
        try {
            File file = ResourceUtils.getFile(url.toString());
            JasperReport jasperReport = JasperCompileManager.compileReport(file.getAbsolutePath());

            Optional<Matricula> matricula = this.findOne(filtro.getIdMatricula());

            MatriculaDTO resp = new MatriculaDTO();
            Matricula obj = matricula.orElse(null);

            if (Objects.nonNull(obj)) {
                resp =
                    new MatriculaDTO(
                        obj.getId(),
                        obj.getData(),
                        obj.getResponsavel(),
                        obj.getRg(),
                        obj.getCpf(),
                        Objects.nonNull(obj.getDadosPessoais())
                            ? obj.getDadosPessoais().getNome() + " " + obj.getDadosPessoais().getSobreNome()
                            : ""
                    );
            }

            List<MatriculaDTO> lista = new ArrayList<>();
            lista.add(resp);
            JRBeanCollectionDataSource dataSource = new JRBeanCollectionDataSource(lista);

            Map<String, Object> parameters = new HashMap<>();

            JasperPrint jasperPrint = JasperFillManager.fillReport(jasperReport, parameters, dataSource);
            ReportExporter simpleReportExporter = new ReportExporter(jasperPrint);
            String fileName = "";

            switch (filtro.getTipo()) {
                case "PDF":
                case "PRINT":
                    fileName = "autorizacao_esportiva.pdf";
                    simpleReportExporter.exportToPdf(this.fileStorageLocation + "/" + fileName, "HUNTERS");
                    break;
                case "XLSX":
                    fileName = "autorizacao_esportiva.xlsx";
                    simpleReportExporter.exportToXlsx(this.fileStorageLocation + "/" + fileName, "HUNTERS");
                    break;
                case "CSV":
                    fileName = "autorizacao_esportiva.csv";
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
