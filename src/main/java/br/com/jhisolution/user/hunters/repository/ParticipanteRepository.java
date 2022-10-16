package br.com.jhisolution.user.hunters.repository;

import br.com.jhisolution.user.hunters.domain.Participante;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Participante entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ParticipanteRepository extends JpaRepository<Participante, Long> {}
