package br.com.jhisolution.user.hunters.repository;

import br.com.jhisolution.user.hunters.domain.VotoSimDecisao;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the VotoSimDecisao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VotoSimDecisaoRepository extends JpaRepository<VotoSimDecisao, Long> {
    @Query("select DISTINCT decisao.votoSims from Decisao decisao join decisao.votoSims where decisao.id =:id")
    Page<VotoSimDecisao> findAllByDecisaoId(@Param("id") Long id, Pageable pageable);
}
