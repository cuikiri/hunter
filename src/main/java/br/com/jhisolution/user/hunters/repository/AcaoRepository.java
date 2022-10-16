package br.com.jhisolution.user.hunters.repository;

import br.com.jhisolution.user.hunters.domain.Acao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Acao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcaoRepository extends JpaRepository<Acao, Long> {}
