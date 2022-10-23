package br.com.jhisolution.user.hunters.service;

import br.com.jhisolution.user.hunters.domain.VotoSimDecisao;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link VotoSimDecisao}.
 */
public interface VotoSimDecisaoService {
    /**
     * Save a votoSimDecisao.
     *
     * @param votoSimDecisao the entity to save.
     * @return the persisted entity.
     */
    VotoSimDecisao save(VotoSimDecisao votoSimDecisao);

    /**
     * Updates a votoSimDecisao.
     *
     * @param votoSimDecisao the entity to update.
     * @return the persisted entity.
     */
    VotoSimDecisao update(VotoSimDecisao votoSimDecisao);

    /**
     * Partially updates a votoSimDecisao.
     *
     * @param votoSimDecisao the entity to update partially.
     * @return the persisted entity.
     */
    Optional<VotoSimDecisao> partialUpdate(VotoSimDecisao votoSimDecisao);

    /**
     * Get all the votoSimDecisaos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<VotoSimDecisao> findAll(Pageable pageable);
    Page<VotoSimDecisao> findAllByDecisaoId(Long id, Pageable pageable);

    /**
     * Get the "id" votoSimDecisao.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<VotoSimDecisao> findOne(Long id);

    /**
     * Delete the "id" votoSimDecisao.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
