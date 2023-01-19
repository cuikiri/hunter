package br.com.jhisolution.user.hunters.repository;

import br.com.jhisolution.user.hunters.domain.DiaSemana;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data SQL repository for the DiaSemana entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DiaSemanaRepository extends JpaRepository<DiaSemana, Long> {
    @Query("select DISTINCT periodo.diaSemanas from PeriodoDuracao periodo join periodo.diaSemanas where periodo.id =:id")
    Page<DiaSemana> findAllByPeridoDuracaoId(@Param("id") Long id, Pageable pageable);
}
