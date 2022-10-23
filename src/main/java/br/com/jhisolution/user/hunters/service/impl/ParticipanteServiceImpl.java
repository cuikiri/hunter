package br.com.jhisolution.user.hunters.service.impl;

import br.com.jhisolution.user.hunters.domain.Participante;
import br.com.jhisolution.user.hunters.repository.ParticipanteRepository;
import br.com.jhisolution.user.hunters.service.ParticipanteService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Participante}.
 */
@Service
@Transactional
public class ParticipanteServiceImpl implements ParticipanteService {

    private final Logger log = LoggerFactory.getLogger(ParticipanteServiceImpl.class);

    private final ParticipanteRepository participanteRepository;

    public ParticipanteServiceImpl(ParticipanteRepository participanteRepository) {
        this.participanteRepository = participanteRepository;
    }

    @Override
    public Participante save(Participante participante) {
        log.debug("Request to save Participante : {}", participante);
        return participanteRepository.save(participante);
    }

    @Override
    public Participante update(Participante participante) {
        log.debug("Request to save Participante : {}", participante);
        return participanteRepository.save(participante);
    }

    @Override
    public Optional<Participante> partialUpdate(Participante participante) {
        log.debug("Request to partially update Participante : {}", participante);

        return participanteRepository
            .findById(participante.getId())
            .map(existingParticipante -> {
                if (participante.getNome() != null) {
                    existingParticipante.setNome(participante.getNome());
                }
                if (participante.getObs() != null) {
                    existingParticipante.setObs(participante.getObs());
                }

                return existingParticipante;
            })
            .map(participanteRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Participante> findAll(Pageable pageable) {
        log.debug("Request to get all Participantes");
        return participanteRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Participante> findOne(Long id) {
        log.debug("Request to get Participante : {}", id);
        return participanteRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Participante : {}", id);
        participanteRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Participante> findAllByReuniaoId(Long id, Pageable pageable) {
        log.debug("Request to get all Acaos");
        return participanteRepository.findAllByReuniaoId(id, pageable);
    }
}
