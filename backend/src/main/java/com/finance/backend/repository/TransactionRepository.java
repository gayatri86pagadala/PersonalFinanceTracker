package com.finance.backend.repository;

import com.finance.backend.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByType(String type);

    List<Transaction> findByCategoryContainingIgnoreCase(String category);

    List<Transaction> findByDescriptionContainingIgnoreCase(String description);

    List<Transaction> findByCategoryContainingIgnoreCaseAndType(
            String category,
            String type
    );

}