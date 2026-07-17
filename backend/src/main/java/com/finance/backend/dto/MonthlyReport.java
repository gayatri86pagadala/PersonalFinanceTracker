package com.finance.backend.dto;

public class MonthlyReport {

    private String month;
    private Double totalExpense;

    public MonthlyReport() {
    }

    public MonthlyReport(String month, Double totalExpense) {
        this.month = month;
        this.totalExpense = totalExpense;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(String month) {
        this.month = month;
    }

    public Double getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(Double totalExpense) {
        this.totalExpense = totalExpense;
    }
}