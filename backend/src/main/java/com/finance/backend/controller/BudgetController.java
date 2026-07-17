package com.finance.backend.controller;

import com.finance.backend.dto.BudgetProgressResponse;
import com.finance.backend.entity.Budget;
import com.finance.backend.service.BudgetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/budget")
public class BudgetController {

    @Autowired
    private BudgetService budgetService;

    // Save Manual Budget
    @PostMapping
    public Budget saveBudget(@RequestBody Budget budget) {

        return budgetService.saveBudget(budget);

    }

    // Get Current Budget
    @GetMapping
    public Budget getBudget() {

        return budgetService.getBudget();

    }

    // Budget Progress
    @GetMapping("/progress")
    public BudgetProgressResponse getBudgetProgress() {

        return budgetService.getBudgetProgress();

    }

    // Switch Back To Automatic Budget
    @DeleteMapping("/automatic")
    public String useAutomaticBudget() {

        budgetService.useAutomaticBudget();

        return "Automatic Budget Enabled";

    }

}