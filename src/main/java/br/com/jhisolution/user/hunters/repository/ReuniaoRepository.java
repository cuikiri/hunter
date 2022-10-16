package br.com.jhisolution.user.hunters.repository;

import br.com.jhisolution.user.hunters.domain.Reuniao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Reuniao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ReuniaoRepository extends JpaRepository<Reuniao, Long> {}
