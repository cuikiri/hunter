package br.com.jhisolution.user.hunters.repository;

import br.com.jhisolution.user.hunters.domain.Endereco;
import br.com.jhisolution.user.hunters.domain.Participante;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Participante entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParticipanteRepository extends JpaRepository<Participante, Long> {
    @Query("select DISTINCT reuniao.participantes from Reuniao reuniao join reuniao.participantes where reuniao.id =:id")
    Page<Participante> findAllByReuniaoId(@Param("id") Long id, Pageable pageable);
}
