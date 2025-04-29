package com.cgi.library.controller;

import com.cgi.library.model.BookDTO;
import com.cgi.library.model.BookStatus;
import com.cgi.library.model.CheckOutDTO;
import com.cgi.library.service.BookService;
import com.cgi.library.service.CheckOutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping("/api/checkout")
public class CheckOutController {

    @Autowired
    private CheckOutService checkOutService;
    @Autowired
    private BookService bookService;

    @GetMapping("getCheckouts")
    public ResponseEntity<Page<CheckOutDTO>> getCheckOuts(Pageable pageable) {
        return ResponseEntity.ok(checkOutService.getCheckOuts(pageable));
    }

    @GetMapping( "getCheckout")
    public ResponseEntity<CheckOutDTO> getCheckOut(@RequestParam(value = "checkOutId") UUID checkOutId) {
        return ResponseEntity.ok(checkOutService.getCheckOut(checkOutId));
    }

    @GetMapping("getCheckoutsByBook")
    public ResponseEntity<Page<CheckOutDTO>> getCheckOutsByBook(Pageable pageable, UUID bookId) {
        return ResponseEntity.ok(checkOutService.getCheckOutsByBook(pageable, bookId));
    }
    @GetMapping("getCheckoutsByTitleContains")
    public ResponseEntity<Page<CheckOutDTO>> getCheckOutsByTitleContains(String title, Pageable pageable) {
        return ResponseEntity.ok(checkOutService.getCheckOutsByTitleContains(title, pageable));
    }

    @PostMapping("addCheckout")
    public ResponseEntity<String> saveCheckOut(@RequestBody BookDTO book) {
        CheckOutDTO checkout = new CheckOutDTO();

        checkout.setBorrowerFirstName("Someone");
        checkout.setBorrowerLastName("Someones Last Name");
        checkout.setBorrowedBook(bookService.getBook(book.getId()));
        checkout.getBorrowedBook().setStatus(BookStatus.BORROWED);
        checkout.setCheckedOutDate(LocalDate.now());
        checkout.setDueDate(LocalDate.now().plusDays(14));
        checkout.setReturnedDate(null);

        checkOutService.saveCheckOut(checkout);

        return ResponseEntity.ok("");
    }

    @DeleteMapping("deleteCheckout")
    public ResponseEntity<String> deleteCheckOut(@RequestParam(value = "checkOutId") UUID checkOutId) throws RuntimeException {
        checkOutService.deleteCheckOut(checkOutId);
        return ResponseEntity.ok("Delete Successful!");
    }
}
