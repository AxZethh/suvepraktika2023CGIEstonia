package com.cgi.library.controller;

import com.cgi.library.model.BookDTO;
import com.cgi.library.model.BookStatus;
import com.cgi.library.service.BookService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.UUID;

@RestController
@RequestMapping("/api/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @GetMapping( "getBooks")
    public ResponseEntity<Page<BookDTO>> getBooks(Pageable pageable) {
        return ResponseEntity.ok(bookService.getBooks(pageable));
    }

    @GetMapping("getBook")
    public ResponseEntity<BookDTO> getBook(@RequestParam(value = "bookId") UUID bookId) {
        return ResponseEntity.ok(bookService.getBook(bookId));
    }

    @GetMapping("getBookByTitle")
    public ResponseEntity<BookDTO> getBookByTitle(@RequestParam(value = "title") String title) {
        return ResponseEntity.ok(bookService.getBookByTitle(title));
    }

    @PostMapping("saveBook")
    public ResponseEntity<String> saveBook(@RequestBody BookDTO book) {
        book.setId(UUID.randomUUID());
        book.setAdded(LocalDate.now());
        return ResponseEntity.ok("\"" + bookService.saveBook(book) + "\"");
    }

    @DeleteMapping("deleteBook")
    public ResponseEntity<String> deleteBook(@RequestParam(value = "bookId") UUID bookId) {
        if(bookService.getBook(bookId).getStatus() != BookStatus.AVAILABLE) {
            throw new RuntimeException("Unable to Delete! Object used in Checkout");
        }
        bookService.deleteBook(bookId);
        return ResponseEntity.ok("");
    }
}
