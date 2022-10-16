package br.com.jhisolution.user.hunters.repository;

import br.com.jhisolution.user.hunters.domain.Pauta;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Pauta entity.
 */
@SuppressWarnings("unused")
@Repository
public interface PautaRepository extends JpaRepository<Pauta, Long> {}
