package com.finance.backend.service;

import com.finance.backend.entity.Transaction;
import com.finance.backend.repository.TransactionRepository;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class ExcelService {

    @Autowired
    private TransactionRepository transactionRepository;

    public ByteArrayInputStream generateExcel() {

        List<Transaction> transactions = transactionRepository.findAll();

        try (Workbook workbook = new XSSFWorkbook()) {

            Sheet sheet = workbook.createSheet("Transactions");

            Row header = sheet.createRow(0);

            header.createCell(0).setCellValue("Category");
            header.createCell(1).setCellValue("Description");
            header.createCell(2).setCellValue("Amount");
            header.createCell(3).setCellValue("Type");
            header.createCell(4).setCellValue("Date");

            int rowNum = 1;

            for (Transaction transaction : transactions) {

                Row row = sheet.createRow(rowNum++);

                row.createCell(0).setCellValue(transaction.getCategory());
                row.createCell(1).setCellValue(transaction.getDescription());
                row.createCell(2).setCellValue(transaction.getAmount());
                row.createCell(3).setCellValue(transaction.getType());
                row.createCell(4).setCellValue(transaction.getDate().toString());
            }

            for (int i = 0; i < 5; i++) {
                sheet.autoSizeColumn(i);
            }

            ByteArrayOutputStream out = new ByteArrayOutputStream();

            workbook.write(out);

            return new ByteArrayInputStream(out.toByteArray());

        } catch (Exception e) {
            throw new RuntimeException("Error generating Excel file", e);
        }
    }
}