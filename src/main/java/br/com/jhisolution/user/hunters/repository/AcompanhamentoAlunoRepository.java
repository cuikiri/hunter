package br.com.jhisolution.user.hunters.repository;

import br.com.jhisolution.user.hunters.domain.AcompanhamentoAluno;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the AcompanhamentoAluno entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcompanhamentoAlunoRepository extends JpaRepository<AcompanhamentoAluno, Long> {}
