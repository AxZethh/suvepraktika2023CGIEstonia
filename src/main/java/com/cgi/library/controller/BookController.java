package com.cgi.library.controller;

import com.cgi.library.model.BookDTO;
import com.cgi.library.model.BookStatus;
import com.cgi.library.model.BookUpdateDTO;
import com.cgi.library.service.BookService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Optional;
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
    public ResponseEntity<BookDTO> getBooksByTitle(@RequestParam(value = "title") String title) {
        return ResponseEntity.ok(bookService.getBookByTitle(title));
    }
    @GetMapping( "getBooksByStatus")
    public ResponseEntity<Page<BookDTO>> getBooksByStatus(Pageable pageable, @RequestParam BookStatus status) {
        return ResponseEntity.ok(bookService.getBooksByStatus(status, pageable));
    }

    @GetMapping("getBooksByTitleContains")
    public ResponseEntity<Page<BookDTO>> getBooksByTitleContains(Pageable pageable,@RequestParam String title) {
        return ResponseEntity.ok(bookService.getBooksByTitleContaining(title, pageable));
    }

    @PostMapping("saveBook")
    public ResponseEntity<String> saveBook(@RequestBody BookDTO book) {
        book.setId(UUID.randomUUID());
        book.setAdded(LocalDate.now());
        return ResponseEntity.ok("\"" + bookService.saveBook(book) + "\"");
    }

    @DeleteMapping("deleteBook")
    public ResponseEntity<String> deleteBook(@RequestParam(value = "bookId") UUID bookId) {

        bookService.deleteBook(bookId);
        return ResponseEntity.ok("");
    }

    @PatchMapping("updateBook")
    public ResponseEntity<String> updateBook(@RequestBody BookUpdateDTO bookUpdateDTO) {
        BookDTO book = bookService.getBook(bookUpdateDTO.getId());

        Optional.ofNullable(bookUpdateDTO.getTitle()).ifPresent(book::setTitle);
        Optional.ofNullable(bookUpdateDTO.getAuthor()).ifPresent(book::setAuthor);
        Optional.ofNullable(bookUpdateDTO.getGenre()).ifPresent(book::setGenre);
        Optional.ofNullable(bookUpdateDTO.getYear()).ifPresent(book::setYear);

        Optional.ofNullable(bookUpdateDTO.getStatus()).ifPresent(book::setStatus);

        bookService.saveBook(book);
        return ResponseEntity.ok("");
    }
}
