package com.finance.backend.service;

import com.finance.backend.dto.BudgetProgressResponse;
import com.finance.backend.entity.Budget;
import com.finance.backend.entity.Transaction;
import com.finance.backend.repository.BudgetRepository;
import com.finance.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BudgetService {

    @Autowired
    private BudgetRepository budgetRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    // Save Manual Budget
    public Budget saveBudget(Budget budget) {

        return budgetRepository.save(budget);

    }

    // Get Current Budget
    public Budget getBudget() {

        List<Budget> budgets = budgetRepository.findAll();

        // If no manual budget exists,
        // use total income as automatic budget
        if (budgets.isEmpty()) {

            double totalIncome = transactionRepository.findByType("INCOME")
                    .stream()
                    .mapToDouble(Transaction::getAmount)
                    .sum();

            Budget budget = new Budget();
            budget.setMonthlyBudget(totalIncome);

            return budget;
        }

        // Latest manual budget
        return budgets.get(budgets.size() - 1);
    }

    // Budget Progress
    public BudgetProgressResponse getBudgetProgress() {

        double totalIncome = transactionRepository.findByType("INCOME")
                .stream()
                .mapToDouble(Transaction::getAmount)
                .sum();

        double spent = transactionRepository.findByType("EXPENSE")
                .stream()
                .mapToDouble(Transaction::getAmount)
                .sum();

        Budget budgetEntity = getBudget();

        double budget;

        if (budgetEntity == null || budgetEntity.getMonthlyBudget() == null) {

            budget = totalIncome;

        } else {

            budget = budgetEntity.getMonthlyBudget();

        }

        double remaining = budget - spent;

        double percentage = 0;

        if (budget > 0) {

            percentage = (spent / budget) * 100;

        }

        BudgetProgressResponse response = new BudgetProgressResponse();

        response.setBudget(budget);
        response.setSpent(spent);
        response.setRemaining(remaining);
        response.setPercentage(percentage);

        return response;
    }

    // Remove Manual Budget
    public void useAutomaticBudget() {

        budgetRepository.deleteAll();

    }

}