package br.com.jhisolution.user.hunters.repository;

import br.com.jhisolution.user.hunters.domain.Acao;
import br.com.jhisolution.user.hunters.domain.Decisao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Decisao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DecisaoRepository extends JpaRepository<Decisao, Long> {
    @Query("select DISTINCT reuniao.decisoes from Reuniao reuniao join reuniao.decisoes where reuniao.id =:id")
    Page<Decisao> findAllByReuniaoId(@Param("id") Long id, Pageable pageable);
}
