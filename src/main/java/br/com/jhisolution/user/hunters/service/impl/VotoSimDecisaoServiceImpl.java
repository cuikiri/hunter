package br.com.jhisolution.user.hunters.service.impl;

import br.com.jhisolution.user.hunters.domain.VotoSimDecisao;
import br.com.jhisolution.user.hunters.repository.VotoSimDecisaoRepository;
import br.com.jhisolution.user.hunters.service.VotoSimDecisaoService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link VotoSimDecisao}.
 */
@Service
@Transactional
public class VotoSimDecisaoServiceImpl implements VotoSimDecisaoService {

    private final Logger log = LoggerFactory.getLogger(VotoSimDecisaoServiceImpl.class);

    private final VotoSimDecisaoRepository votoSimDecisaoRepository;

    public VotoSimDecisaoServiceImpl(VotoSimDecisaoRepository votoSimDecisaoRepository) {
        this.votoSimDecisaoRepository = votoSimDecisaoRepository;
    }

    @Override
    public VotoSimDecisao save(VotoSimDecisao votoSimDecisao) {
        log.debug("Request to save VotoSimDecisao : {}", votoSimDecisao);
        return votoSimDecisaoRepository.save(votoSimDecisao);
    }

    @Override
    public VotoSimDecisao update(VotoSimDecisao votoSimDecisao) {
        log.debug("Request to save VotoSimDecisao : {}", votoSimDecisao);
        return votoSimDecisaoRepository.save(votoSimDecisao);
    }

    @Override
    public Optional<VotoSimDecisao> partialUpdate(VotoSimDecisao votoSimDecisao) {
        log.debug("Request to partially update VotoSimDecisao : {}", votoSimDecisao);

        return votoSimDecisaoRepository
            .findById(votoSimDecisao.getId())
            .map(existingVotoSimDecisao -> {
                if (votoSimDecisao.getNome() != null) {
                    existingVotoSimDecisao.setNome(votoSimDecisao.getNome());
                }
                if (votoSimDecisao.getObs() != null) {
                    existingVotoSimDecisao.setObs(votoSimDecisao.getObs());
                }

                return existingVotoSimDecisao;
            })
            .map(votoSimDecisaoRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<VotoSimDecisao> findAll(Pageable pageable) {
        log.debug("Request to get all VotoSimDecisaos");
        return votoSimDecisaoRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<VotoSimDecisao> findOne(Long id) {
        log.debug("Request to get VotoSimDecisao : {}", id);
        return votoSimDecisaoRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete VotoSimDecisao : {}", id);
        votoSimDecisaoRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<VotoSimDecisao> findAllByDecisaoId(Long id, Pageable pageable) {
        log.debug("Request to get all VotoSimDecisao");
        return votoSimDecisaoRepository.findAllByDecisaoId(id, pageable);
    }
}
