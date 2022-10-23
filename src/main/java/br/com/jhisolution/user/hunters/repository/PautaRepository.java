package br.com.jhisolution.user.hunters.repository;

import br.com.jhisolution.user.hunters.domain.Endereco;
import br.com.jhisolution.user.hunters.domain.Pauta;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Pauta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PautaRepository extends JpaRepository<Pauta, Long> {
    @Query("select DISTINCT reuniao.pautas from Reuniao reuniao join reuniao.pautas where reuniao.id =:id")
    Page<Pauta> findAllByReuniaoId(@Param("id") Long id, Pageable pageable);
}
