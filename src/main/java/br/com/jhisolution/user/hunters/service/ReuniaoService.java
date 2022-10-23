package br.com.jhisolution.user.hunters.service;

import br.com.jhisolution.user.hunters.domain.Reuniao;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

/**
 * Service Interface for managing {@link Reuniao}.
 */
public interface ReuniaoService {
    /**
     * Save a reuniao.
     *
     * @param reuniao the entity to save.
     * @return the persisted entity.
     */
    Reuniao save(Reuniao reuniao);

    /**
     * Updates a reuniao.
     *
     * @param reuniao the entity to update.
     * @return the persisted entity.
     */
    Reuniao update(Reuniao reuniao);

    /**
     * Partially updates a reuniao.
     *
     * @param reuniao the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Reuniao> partialUpdate(Reuniao reuniao);

    /**
     * Get all the reuniaos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Reuniao> findAll(Pageable pageable);
    List<Reuniao> findAllByReuniaoId(Long id);

    /**
     * Get the "id" reuniao.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Reuniao> findOne(Long id);

    /**
     * Delete the "id" reuniao.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
