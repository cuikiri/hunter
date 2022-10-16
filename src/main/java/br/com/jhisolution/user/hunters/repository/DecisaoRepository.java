package br.com.jhisolution.user.hunters.repository;

import br.com.jhisolution.user.hunters.domain.Decisao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Decisao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DecisaoRepository extends JpaRepository<Decisao, Long> {}
