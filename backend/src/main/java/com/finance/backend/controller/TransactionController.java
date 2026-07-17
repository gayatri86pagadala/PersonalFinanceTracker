package com.finance.backend.controller;

import com.finance.backend.dto.CategoryReport;
import com.finance.backend.dto.DashboardResponse;
import com.finance.backend.dto.MonthlyReport;
import com.finance.backend.entity.Transaction;
import com.finance.backend.service.ExcelService;
import com.finance.backend.service.PdfService;
import com.finance.backend.service.TransactionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private PdfService pdfService;

    @Autowired
    private ExcelService excelService;

    // Add Transaction
    @PostMapping
    public Transaction addTransaction(@RequestBody Transaction transaction) {
        return transactionService.addTransaction(transaction);
    }

    // Get All Transactions
    @GetMapping
    public List<Transaction> getAllTransactions() {
        return transactionService.getAllTransactions();
    }

    // Get Income Transactions
    @GetMapping("/income")
    public List<Transaction> getIncome() {
        return transactionService.getIncome();
    }

    // Get Expense Transactions
    @GetMapping("/expense")
    public List<Transaction> getExpense() {
        return transactionService.getExpense();
    }

    // Get Recent Transactions
    @GetMapping("/recent")
    public List<Transaction> getRecentTransactions() {
        return transactionService.getRecentTransactions();
    }

    // Dashboard Summary
    @GetMapping("/dashboard")
    public DashboardResponse getDashboard() {
        return transactionService.getDashboard();
    }

    // Monthly Expense Report
    @GetMapping("/monthly-report")
    public List<MonthlyReport> getMonthlyReport() {
        return transactionService.getMonthlyExpenseReport();
    }

    // Category Expense Report
    @GetMapping("/category-report")
    public List<CategoryReport> getCategoryReport() {
        return transactionService.getCategoryReport();
    }

    // Update Transaction
    @PutMapping("/{id}")
    public Transaction updateTransaction(
            @PathVariable Long id,
            @RequestBody Transaction transaction) {

        return transactionService.updateTransaction(id, transaction);
    }

    // Delete Transaction
    @DeleteMapping("/{id}")
    public void deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
    }

    // Download PDF
    @GetMapping("/pdf")
    public ResponseEntity<InputStreamResource> downloadPdf() {

        ByteArrayInputStream pdf = pdfService.generatePdf();

        HttpHeaders headers = new HttpHeaders();
        headers.add(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=transactions.pdf"
        );

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(MediaType.APPLICATION_PDF)
                .body(new InputStreamResource(pdf));
    }

    // Download Excel
    @GetMapping("/excel")
    public ResponseEntity<InputStreamResource> downloadExcel() {

        ByteArrayInputStream excel = excelService.generateExcel();

        HttpHeaders headers = new HttpHeaders();
        headers.add(
                HttpHeaders.CONTENT_DISPOSITION,
                "attachment; filename=transactions.xlsx"
        );

        return ResponseEntity.ok()
                .headers(headers)
                .contentType(
                        MediaType.parseMediaType(
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        )
                )
                .body(new InputStreamResource(excel));
    }
    @GetMapping("/search")
    public List<Transaction> searchTransactions(

            @RequestParam(required = false) String keyword,
            @RequestParam(required = false) String type

    ) {

        return transactionService.searchTransactions(keyword, type);

    }
}