package br.com.jhisolution.user.hunters.service.impl;

import br.com.jhisolution.user.hunters.domain.Reuniao;
import br.com.jhisolution.user.hunters.repository.ReuniaoRepository;
import br.com.jhisolution.user.hunters.service.ReuniaoService;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Reuniao}.
 */
@Service
@Transactional
public class ReuniaoServiceImpl implements ReuniaoService {

    private final Logger log = LoggerFactory.getLogger(ReuniaoServiceImpl.class);

    private final ReuniaoRepository reuniaoRepository;

    public ReuniaoServiceImpl(ReuniaoRepository reuniaoRepository) {
        this.reuniaoRepository = reuniaoRepository;
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
    public List<Reuniao> findAllByReuniaoId(Long id) {
        log.debug("Request to get Reuniao : {}", id);
        return reuniaoRepository.findAllByReuniaoId(id);
    }
}
