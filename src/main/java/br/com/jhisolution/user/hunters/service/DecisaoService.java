package br.com.jhisolution.user.hunters.service;

import br.com.jhisolution.user.hunters.domain.Decisao;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Decisao}.
 */
public interface DecisaoService {
    /**
     * Save a decisao.
     *
     * @param decisao the entity to save.
     * @return the persisted entity.
     */
    Decisao save(Decisao decisao);

    /**
     * Updates a decisao.
     *
     * @param decisao the entity to update.
     * @return the persisted entity.
     */
    Decisao update(Decisao decisao);

    /**
     * Partially updates a decisao.
     *
     * @param decisao the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Decisao> partialUpdate(Decisao decisao);

    /**
     * Get all the decisaos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Decisao> findAll(Pageable pageable);
    Page<Decisao> findAllByReuniaoId(Long id, Pageable pageable);

    /**
     * Get the "id" decisao.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Decisao> findOne(Long id);

    /**
     * Delete the "id" decisao.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
