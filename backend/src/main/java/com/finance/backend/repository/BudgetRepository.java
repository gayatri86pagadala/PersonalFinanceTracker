package com.finance.backend.repository;
import com.finance.backend.entity.Budget;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

    Optional<Budget> findTopByOrderByIdDesc();

}