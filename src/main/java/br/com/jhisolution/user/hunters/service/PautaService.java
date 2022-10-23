package br.com.jhisolution.user.hunters.service;

import br.com.jhisolution.user.hunters.domain.Pauta;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Pauta}.
 */
public interface PautaService {
    /**
     * Save a pauta.
     *
     * @param pauta the entity to save.
     * @return the persisted entity.
     */
    Pauta save(Pauta pauta);

    /**
     * Updates a pauta.
     *
     * @param pauta the entity to update.
     * @return the persisted entity.
     */
    Pauta update(Pauta pauta);

    /**
     * Partially updates a pauta.
     *
     * @param pauta the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Pauta> partialUpdate(Pauta pauta);

    /**
     * Get all the pautas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Pauta> findAll(Pageable pageable);
    Page<Pauta> findAllByReuniaoId(Long id, Pageable pageable);

    /**
     * Get the "id" pauta.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Pauta> findOne(Long id);

    /**
     * Delete the "id" pauta.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
