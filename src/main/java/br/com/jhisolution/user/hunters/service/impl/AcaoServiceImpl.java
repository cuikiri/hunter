package br.com.jhisolution.user.hunters.service.impl;

import br.com.jhisolution.user.hunters.domain.Acao;
import br.com.jhisolution.user.hunters.repository.AcaoRepository;
import br.com.jhisolution.user.hunters.service.AcaoService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Acao}.
 */
@Service
@Transactional
public class AcaoServiceImpl implements AcaoService {

    private final Logger log = LoggerFactory.getLogger(AcaoServiceImpl.class);

    private final AcaoRepository acaoRepository;

    public AcaoServiceImpl(AcaoRepository acaoRepository) {
        this.acaoRepository = acaoRepository;
    }

    @Override
    public Acao save(Acao acao) {
        log.debug("Request to save Acao : {}", acao);
        return acaoRepository.save(acao);
    }

    @Override
    public Acao update(Acao acao) {
        log.debug("Request to save Acao : {}", acao);
        return acaoRepository.save(acao);
    }

    @Override
    public Optional<Acao> partialUpdate(Acao acao) {
        log.debug("Request to partially update Acao : {}", acao);

        return acaoRepository
            .findById(acao.getId())
            .map(existingAcao -> {
                if (acao.getNome() != null) {
                    existingAcao.setNome(acao.getNome());
                }
                if (acao.getObs() != null) {
                    existingAcao.setObs(acao.getObs());
                }

                return existingAcao;
            })
            .map(acaoRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Acao> findAll(Pageable pageable) {
        log.debug("Request to get all Acaos");
        return acaoRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Acao> findOne(Long id) {
        log.debug("Request to get Acao : {}", id);
        return acaoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Acao : {}", id);
        acaoRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Acao> findAllByReuniaoId(Long id, Pageable pageable) {
        log.debug("Request to get all Acaos");
        return acaoRepository.findAllByReuniaoId(id, pageable);
    }
}
