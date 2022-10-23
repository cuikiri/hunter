package br.com.jhisolution.user.hunters.service.impl;

import br.com.jhisolution.user.hunters.domain.Decisao;
import br.com.jhisolution.user.hunters.repository.DecisaoRepository;
import br.com.jhisolution.user.hunters.service.DecisaoService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Decisao}.
 */
@Service
@Transactional
public class DecisaoServiceImpl implements DecisaoService {

    private final Logger log = LoggerFactory.getLogger(DecisaoServiceImpl.class);

    private final DecisaoRepository decisaoRepository;

    public DecisaoServiceImpl(DecisaoRepository decisaoRepository) {
        this.decisaoRepository = decisaoRepository;
    }

    @Override
    public Decisao save(Decisao decisao) {
        log.debug("Request to save Decisao : {}", decisao);
        return decisaoRepository.save(decisao);
    }

    @Override
    public Decisao update(Decisao decisao) {
        log.debug("Request to save Decisao : {}", decisao);
        return decisaoRepository.save(decisao);
    }

    @Override
    public Optional<Decisao> partialUpdate(Decisao decisao) {
        log.debug("Request to partially update Decisao : {}", decisao);

        return decisaoRepository
            .findById(decisao.getId())
            .map(existingDecisao -> {
                if (decisao.getNome() != null) {
                    existingDecisao.setNome(decisao.getNome());
                }
                if (decisao.getObs() != null) {
                    existingDecisao.setObs(decisao.getObs());
                }

                return existingDecisao;
            })
            .map(decisaoRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Decisao> findAll(Pageable pageable) {
        log.debug("Request to get all Decisaos");
        return decisaoRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Decisao> findOne(Long id) {
        log.debug("Request to get Decisao : {}", id);
        return decisaoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Decisao : {}", id);
        decisaoRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Decisao> findAllByReuniaoId(Long id, Pageable pageable) {
        log.debug("Request to get all Acaos");
        return decisaoRepository.findAllByReuniaoId(id, pageable);
    }
}
