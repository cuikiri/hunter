package br.com.jhisolution.user.hunters.repository;

import br.com.jhisolution.user.hunters.domain.Acao;
import br.com.jhisolution.user.hunters.domain.Endereco;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Acao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcaoRepository extends JpaRepository<Acao, Long> {
    @Query("select DISTINCT reuniao.acoes from Reuniao reuniao join reuniao.acoes where reuniao.id =:id")
    Page<Acao> findAllByReuniaoId(@Param("id") Long id, Pageable pageable);
}
