package br.com.jhisolution.user.hunters.service;

import br.com.jhisolution.user.hunters.domain.VotoNaoDecisao;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link VotoNaoDecisao}.
 */
public interface VotoNaoDecisaoService {
    /**
     * Save a votoNaoDecisao.
     *
     * @param votoNaoDecisao the entity to save.
     * @return the persisted entity.
     */
    VotoNaoDecisao save(VotoNaoDecisao votoNaoDecisao);

    /**
     * Updates a votoNaoDecisao.
     *
     * @param votoNaoDecisao the entity to update.
     * @return the persisted entity.
     */
    VotoNaoDecisao update(VotoNaoDecisao votoNaoDecisao);

    /**
     * Partially updates a votoNaoDecisao.
     *
     * @param votoNaoDecisao the entity to update partially.
     * @return the persisted entity.
     */
    Optional<VotoNaoDecisao> partialUpdate(VotoNaoDecisao votoNaoDecisao);

    /**
     * Get all the votoNaoDecisaos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<VotoNaoDecisao> findAll(Pageable pageable);
    Page<VotoNaoDecisao> findAllByDecisaoId(Long id, Pageable pageable);

    /**
     * Get the "id" votoNaoDecisao.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<VotoNaoDecisao> findOne(Long id);

    /**
     * Delete the "id" votoNaoDecisao.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
