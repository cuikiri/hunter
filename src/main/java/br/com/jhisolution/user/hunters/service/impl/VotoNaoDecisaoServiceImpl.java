package br.com.jhisolution.user.hunters.service.impl;

import br.com.jhisolution.user.hunters.domain.VotoNaoDecisao;
import br.com.jhisolution.user.hunters.repository.VotoNaoDecisaoRepository;
import br.com.jhisolution.user.hunters.service.VotoNaoDecisaoService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link VotoNaoDecisao}.
 */
@Service
@Transactional
public class VotoNaoDecisaoServiceImpl implements VotoNaoDecisaoService {

    private final Logger log = LoggerFactory.getLogger(VotoNaoDecisaoServiceImpl.class);

    private final VotoNaoDecisaoRepository votoNaoDecisaoRepository;

    public VotoNaoDecisaoServiceImpl(VotoNaoDecisaoRepository votoNaoDecisaoRepository) {
        this.votoNaoDecisaoRepository = votoNaoDecisaoRepository;
    }

    @Override
    public VotoNaoDecisao save(VotoNaoDecisao votoNaoDecisao) {
        log.debug("Request to save VotoNaoDecisao : {}", votoNaoDecisao);
        return votoNaoDecisaoRepository.save(votoNaoDecisao);
    }

    @Override
    public VotoNaoDecisao update(VotoNaoDecisao votoNaoDecisao) {
        log.debug("Request to save VotoNaoDecisao : {}", votoNaoDecisao);
        return votoNaoDecisaoRepository.save(votoNaoDecisao);
    }

    @Override
    public Optional<VotoNaoDecisao> partialUpdate(VotoNaoDecisao votoNaoDecisao) {
        log.debug("Request to partially update VotoNaoDecisao : {}", votoNaoDecisao);

        return votoNaoDecisaoRepository
            .findById(votoNaoDecisao.getId())
            .map(existingVotoNaoDecisao -> {
                if (votoNaoDecisao.getNome() != null) {
                    existingVotoNaoDecisao.setNome(votoNaoDecisao.getNome());
                }
                if (votoNaoDecisao.getObs() != null) {
                    existingVotoNaoDecisao.setObs(votoNaoDecisao.getObs());
                }

                return existingVotoNaoDecisao;
            })
            .map(votoNaoDecisaoRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<VotoNaoDecisao> findAll(Pageable pageable) {
        log.debug("Request to get all VotoNaoDecisaos");
        return votoNaoDecisaoRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<VotoNaoDecisao> findOne(Long id) {
        log.debug("Request to get VotoNaoDecisao : {}", id);
        return votoNaoDecisaoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete VotoNaoDecisao : {}", id);
        votoNaoDecisaoRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<VotoNaoDecisao> findAllByDecisaoId(Long id, Pageable pageable) {
        log.debug("Request to get all VotoNaoDecisaos");
        return votoNaoDecisaoRepository.findAllByDecisaoId(id, pageable);
    }
}
