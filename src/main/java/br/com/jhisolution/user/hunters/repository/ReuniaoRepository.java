package br.com.jhisolution.user.hunters.repository;

import br.com.jhisolution.user.hunters.domain.Reuniao;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Reuniao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReuniaoRepository extends JpaRepository<Reuniao, Long> {
    @Query(
        "select DISTINCT reuniao " +
        "from Reuniao reuniao " +
        "left join fetch reuniao.participantes " +
        "left join fetch reuniao.pautas " +
        "left join fetch reuniao.acoes " +
        "left join fetch reuniao.decisoes decisoes " +
        "left join fetch decisoes.votoSims " +
        "left join fetch decisoes.votoNaos " +
        "where reuniao.id =:id"
    )
    List<Reuniao> findAllByReuniaoId(@Param("id") Long id);
}
