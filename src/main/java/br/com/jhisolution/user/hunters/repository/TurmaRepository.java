package br.com.jhisolution.user.hunters.repository;

import br.com.jhisolution.user.hunters.domain.Turma;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the Turma entity.
 */
@Repository
public interface TurmaRepository extends JpaRepository<Turma, Long> {
    default Optional<Turma> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Turma> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Turma> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct turma from Turma turma left join fetch turma.periodoDuracao",
        countQuery = "select count(distinct turma) from Turma turma"
    )
    Page<Turma> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct turma from Turma turma left join fetch turma.periodoDuracao")
    List<Turma> findAllWithToOneRelationships();

    @Query("select turma from Turma turma left join fetch turma.periodoDuracao where turma.id =:id")
    Optional<Turma> findOneWithToOneRelationships(@Param("id") Long id);
}
