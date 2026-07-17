package com.finance.backend.service;

import com.finance.backend.entity.Transaction;
import com.finance.backend.repository.TransactionRepository;
import com.lowagie.text.Document;
import com.lowagie.text.Element;
import com.lowagie.text.Font;
import com.lowagie.text.FontFactory;
import com.lowagie.text.PageSize;
import com.lowagie.text.Paragraph;
import com.lowagie.text.Phrase;
import com.lowagie.text.pdf.PdfPCell;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.List;

@Service
public class PdfService {

    @Autowired
    private TransactionRepository transactionRepository;

    public ByteArrayInputStream generatePdf() {

        List<Transaction> transactions = transactionRepository.findAll();

        Document document = new Document(PageSize.A4);
        ByteArrayOutputStream out = new ByteArrayOutputStream();

        try {

            PdfWriter.getInstance(document, out);

            document.open();

            Font titleFont = FontFactory.getFont(
                    FontFactory.HELVETICA_BOLD,
                    18
            );

            Paragraph title = new Paragraph(
                    "Personal Finance Tracker Report",
                    titleFont
            );

            title.setAlignment(Element.ALIGN_CENTER);

            document.add(title);

            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(5);

            table.setWidthPercentage(100);

            table.setWidths(new float[]{2, 4, 2, 2, 3});

            String[] headers = {
                    "Category",
                    "Description",
                    "Amount",
                    "Type",
                    "Date"
            };

            for (String header : headers) {

                PdfPCell cell = new PdfPCell(new Phrase(header));

                cell.setBackgroundColor(Color.LIGHT_GRAY);

                cell.setHorizontalAlignment(Element.ALIGN_CENTER);

                table.addCell(cell);

            }

            for (Transaction transaction : transactions) {

                table.addCell(transaction.getCategory());

                table.addCell(transaction.getDescription());

                table.addCell("₹ " + transaction.getAmount());

                table.addCell(transaction.getType());

                table.addCell(transaction.getDate().toString());

            }

            document.add(table);

            document.close();

        } catch (Exception e) {

            e.printStackTrace();

        }

        return new ByteArrayInputStream(out.toByteArray());

    }

}