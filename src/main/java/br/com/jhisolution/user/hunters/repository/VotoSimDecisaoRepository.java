package br.com.jhisolution.user.hunters.repository;

import br.com.jhisolution.user.hunters.domain.VotoSimDecisao;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the VotoSimDecisao entity.
 */
@SuppressWarnings("unused")
@Repository
public interface VotoSimDecisaoRepository extends JpaRepository<VotoSimDecisao, Long> {}
