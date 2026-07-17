package com.finance.backend.dto;

public class DashboardResponse {

    private Double totalIncome;
    private Double totalExpense;
    private Double balance;

    private Integer totalTransactions;

    private Double highestIncome;
    private Double highestExpense;
    private Double averageIncome;
    private Double averageExpense;

    public DashboardResponse() {
    }

    public DashboardResponse(
            Double totalIncome,
            Double totalExpense,
            Double balance,
            Integer totalTransactions,
            Double highestIncome,
            Double highestExpense,
            Double averageIncome,
            Double averageExpense) {

        this.totalIncome = totalIncome;
        this.totalExpense = totalExpense;
        this.balance = balance;
        this.totalTransactions = totalTransactions;
        this.highestIncome = highestIncome;
        this.highestExpense = highestExpense;
        this.averageIncome = averageIncome;
        this.averageExpense = averageExpense;
    }

    public Double getTotalIncome() {
        return totalIncome;
    }

    public void setTotalIncome(Double totalIncome) {
        this.totalIncome = totalIncome;
    }

    public Double getTotalExpense() {
        return totalExpense;
    }

    public void setTotalExpense(Double totalExpense) {
        this.totalExpense = totalExpense;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public Integer getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(Integer totalTransactions) {
        this.totalTransactions = totalTransactions;
    }

    public Double getHighestIncome() {
        return highestIncome;
    }

    public void setHighestIncome(Double highestIncome) {
        this.highestIncome = highestIncome;
    }

    public Double getHighestExpense() {
        return highestExpense;
    }

    public void setHighestExpense(Double highestExpense) {
        this.highestExpense = highestExpense;
    }

    public Double getAverageIncome() {
        return averageIncome;
    }

    public void setAverageIncome(Double averageIncome) {
        this.averageIncome = averageIncome;
    }

    public Double getAverageExpense() {
        return averageExpense;
    }

    public void setAverageExpense(Double averageExpense) {
        this.averageExpense = averageExpense;
    }
}