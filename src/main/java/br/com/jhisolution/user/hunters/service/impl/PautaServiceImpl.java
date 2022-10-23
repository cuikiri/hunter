package br.com.jhisolution.user.hunters.service.impl;

import br.com.jhisolution.user.hunters.domain.Pauta;
import br.com.jhisolution.user.hunters.repository.PautaRepository;
import br.com.jhisolution.user.hunters.service.PautaService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Pauta}.
 */
@Service
@Transactional
public class PautaServiceImpl implements PautaService {

    private final Logger log = LoggerFactory.getLogger(PautaServiceImpl.class);

    private final PautaRepository pautaRepository;

    public PautaServiceImpl(PautaRepository pautaRepository) {
        this.pautaRepository = pautaRepository;
    }

    @Override
    public Pauta save(Pauta pauta) {
        log.debug("Request to save Pauta : {}", pauta);
        return pautaRepository.save(pauta);
    }

    @Override
    public Pauta update(Pauta pauta) {
        log.debug("Request to save Pauta : {}", pauta);
        return pautaRepository.save(pauta);
    }

    @Override
    public Optional<Pauta> partialUpdate(Pauta pauta) {
        log.debug("Request to partially update Pauta : {}", pauta);

        return pautaRepository
            .findById(pauta.getId())
            .map(existingPauta -> {
                if (pauta.getNome() != null) {
                    existingPauta.setNome(pauta.getNome());
                }
                if (pauta.getObs() != null) {
                    existingPauta.setObs(pauta.getObs());
                }

                return existingPauta;
            })
            .map(pautaRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Pauta> findAll(Pageable pageable) {
        log.debug("Request to get all Pautas");
        return pautaRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Pauta> findOne(Long id) {
        log.debug("Request to get Pauta : {}", id);
        return pautaRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Pauta : {}", id);
        pautaRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Pauta> findAllByReuniaoId(Long id, Pageable pageable) {
        log.debug("Request to get all Acaos");
        return pautaRepository.findAllByReuniaoId(id, pageable);
    }
}
