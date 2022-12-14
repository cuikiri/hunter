package br.com.jhisolution.user.hunters.service;

import br.com.jhisolution.user.hunters.domain.Turma;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Turma}.
 */
public interface TurmaService {
    /**
     * Save a turma.
     *
     * @param turma the entity to save.
     * @return the persisted entity.
     */
    Turma save(Turma turma);

    /**
     * Updates a turma.
     *
     * @param turma the entity to update.
     * @return the persisted entity.
     */
    Turma update(Turma turma);

    /**
     * Partially updates a turma.
     *
     * @param turma the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Turma> partialUpdate(Turma turma);

    /**
     * Get all the turmas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Turma> findAll(Pageable pageable);

    /**
     * Get all the turmas with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Turma> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" turma.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Turma> findOne(Long id);

    /**
     * Delete the "id" turma.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
