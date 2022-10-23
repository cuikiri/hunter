package br.com.jhisolution.user.hunters.service;

import br.com.jhisolution.user.hunters.domain.Participante;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Participante}.
 */
public interface ParticipanteService {
    /**
     * Save a participante.
     *
     * @param participante the entity to save.
     * @return the persisted entity.
     */
    Participante save(Participante participante);

    /**
     * Updates a participante.
     *
     * @param participante the entity to update.
     * @return the persisted entity.
     */
    Participante update(Participante participante);

    /**
     * Partially updates a participante.
     *
     * @param participante the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Participante> partialUpdate(Participante participante);

    /**
     * Get all the participantes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Participante> findAll(Pageable pageable);
    Page<Participante> findAllByReuniaoId(Long id, Pageable pageable);

    /**
     * Get the "id" participante.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Participante> findOne(Long id);

    /**
     * Delete the "id" participante.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
