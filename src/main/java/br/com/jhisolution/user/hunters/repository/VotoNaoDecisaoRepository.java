package br.com.jhisolution.user.hunters.repository;

import br.com.jhisolution.user.hunters.domain.VotoNaoDecisao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the VotoNaoDecisao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VotoNaoDecisaoRepository extends JpaRepository<VotoNaoDecisao, Long> {}
