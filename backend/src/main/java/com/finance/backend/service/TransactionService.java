package com.finance.backend.service;

import com.finance.backend.dto.CategoryReport;
import com.finance.backend.dto.DashboardResponse;
import com.finance.backend.dto.MonthlyReport;
import com.finance.backend.entity.Transaction;
import com.finance.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.Month;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    // Add Transaction
    public Transaction addTransaction(Transaction transaction) {

        if (transaction.getDate() == null) {
            transaction.setDate(LocalDate.now());
        }

        return transactionRepository.save(transaction);
    }

    // Update Transaction
    public Transaction updateTransaction(Long id, Transaction updatedTransaction) {

        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        transaction.setCategory(updatedTransaction.getCategory());
        transaction.setDescription(updatedTransaction.getDescription());
        transaction.setAmount(updatedTransaction.getAmount());
        transaction.setType(updatedTransaction.getType());

        if (updatedTransaction.getDate() != null) {
            transaction.setDate(updatedTransaction.getDate());
        }

        return transactionRepository.save(transaction);
    }

    // Delete Transaction
    public void deleteTransaction(Long id) {
        transactionRepository.deleteById(id);
    }

    // Get All Transactions
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    // Get Income Transactions
    public List<Transaction> getIncome() {
        return transactionRepository.findByType("INCOME");
    }

    // Get Expense Transactions
    public List<Transaction> getExpense() {
        return transactionRepository.findByType("EXPENSE");
    }

    // Get Recent Transactions
    public List<Transaction> getRecentTransactions() {

        List<Transaction> transactions = transactionRepository.findAll();

        transactions.sort(
                Comparator.comparing(Transaction::getDate).reversed()
        );

        return transactions.stream()
                .limit(5)
                .toList();
    }

    // Dashboard
    public DashboardResponse getDashboard() {

        List<Transaction> incomes = transactionRepository.findByType("INCOME");
        List<Transaction> expenses = transactionRepository.findByType("EXPENSE");
        List<Transaction> allTransactions = transactionRepository.findAll();

        double totalIncome = incomes.stream()
                .mapToDouble(Transaction::getAmount)
                .sum();

        double totalExpense = expenses.stream()
                .mapToDouble(Transaction::getAmount)
                .sum();

        double highestIncome = incomes.stream()
                .mapToDouble(Transaction::getAmount)
                .max()
                .orElse(0);

        double highestExpense = expenses.stream()
                .mapToDouble(Transaction::getAmount)
                .max()
                .orElse(0);

        double averageIncome = incomes.stream()
                .mapToDouble(Transaction::getAmount)
                .average()
                .orElse(0);

        double averageExpense = expenses.stream()
                .mapToDouble(Transaction::getAmount)
                .average()
                .orElse(0);

        DashboardResponse response = new DashboardResponse();

        response.setTotalIncome(totalIncome);
        response.setTotalExpense(totalExpense);
        response.setBalance(totalIncome - totalExpense);
        response.setTotalTransactions(allTransactions.size());

        response.setHighestIncome(highestIncome);
        response.setHighestExpense(highestExpense);

        response.setAverageIncome(averageIncome);
        response.setAverageExpense(averageExpense);

        return response;
    }

    // Monthly Expense Report
    public List<MonthlyReport> getMonthlyExpenseReport() {

        List<Transaction> expenses = transactionRepository.findByType("EXPENSE");

        Map<Month, Double> monthlyTotals = expenses.stream()
                .collect(Collectors.groupingBy(
                        transaction -> transaction.getDate().getMonth(),
                        Collectors.summingDouble(Transaction::getAmount)
                ));

        List<MonthlyReport> report = new ArrayList<>();

        for (Month month : Month.values()) {

            report.add(
                    new MonthlyReport(
                            month.name(),
                            monthlyTotals.getOrDefault(month, 0.0)
                    )
            );
        }

        return report;
    }

    // Category Expense Report
    public List<CategoryReport> getCategoryReport() {

        List<Transaction> expenses = transactionRepository.findByType("EXPENSE");

        Map<String, Double> categoryTotals = expenses.stream()
                .collect(Collectors.groupingBy(
                        Transaction::getCategory,
                        Collectors.summingDouble(Transaction::getAmount)
                ));

        List<CategoryReport> report = new ArrayList<>();

        for (Map.Entry<String, Double> entry : categoryTotals.entrySet()) {

            report.add(
                    new CategoryReport(
                            entry.getKey(),
                            entry.getValue()
                    )
            );
        }

        return report;
    }
    // Search Transactions
    public List<Transaction> searchTransactions(String keyword, String type) {

        if (keyword == null) keyword = "";

        if (type == null || type.isEmpty()) {

            return transactionRepository
                    .findByDescriptionContainingIgnoreCase(keyword);

        }

        return transactionRepository
                .findByCategoryContainingIgnoreCaseAndType(keyword, type);
    }

}