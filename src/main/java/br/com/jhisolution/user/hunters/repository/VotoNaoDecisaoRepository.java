package br.com.jhisolution.user.hunters.repository;

import br.com.jhisolution.user.hunters.domain.Pauta;
import br.com.jhisolution.user.hunters.domain.VotoNaoDecisao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the VotoNaoDecisao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VotoNaoDecisaoRepository extends JpaRepository<VotoNaoDecisao, Long> {
    @Query("select DISTINCT decisao.votoNaos from Decisao decisao join decisao.votoNaos where decisao.id =:id")
    Page<VotoNaoDecisao> findAllByDecisaoId(@Param("id") Long id, Pageable pageable);
}
