package br.com.jhisolution.user.hunters.repository;

import br.com.jhisolution.user.hunters.domain.Matricula;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Matricula entity.
 */
@Repository
public interface MatriculaRepository extends JpaRepository<Matricula, Long> {
    default Optional<Matricula> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Matricula> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Matricula> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct matricula from Matricula matricula left join fetch matricula.turma",
        countQuery = "select count(distinct matricula) from Matricula matricula"
    )
    Page<Matricula> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct matricula from Matricula matricula left join fetch matricula.turma")
    List<Matricula> findAllWithToOneRelationships();

    @Query("select matricula from Matricula matricula left join fetch matricula.turma where matricula.id =:id")
    Optional<Matricula> findOneWithToOneRelationships(@Param("id") Long id);

    @Query(
        "select DISTINCT dadosPessoais.matriculas from DadosPessoais dadosPessoais join dadosPessoais.matriculas where dadosPessoais.id =:id"
    )
    Page<Matricula> findAllByPessoalId(@Param("id") Long id, Pageable pageable);
}
