package br.com.jhisolution.user.hunters.service;

import br.com.jhisolution.user.hunters.domain.Acao;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Acao}.
 */
public interface AcaoService {
    /**
     * Save a acao.
     *
     * @param acao the entity to save.
     * @return the persisted entity.
     */
    Acao save(Acao acao);

    /**
     * Updates a acao.
     *
     * @param acao the entity to update.
     * @return the persisted entity.
     */
    Acao update(Acao acao);

    /**
     * Partially updates a acao.
     *
     * @param acao the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Acao> partialUpdate(Acao acao);

    /**
     * Get all the acaos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Acao> findAll(Pageable pageable);
    Page<Acao> findAllByReuniaoId(Long id, Pageable pageable);

    /**
     * Get the "id" acao.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Acao> findOne(Long id);

    /**
     * Delete the "id" acao.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
