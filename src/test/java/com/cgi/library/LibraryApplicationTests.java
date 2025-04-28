package com.cgi.library;

import com.cgi.library.entity.Book;
import com.cgi.library.model.BookDTO;
import com.cgi.library.model.BookStatus;
import com.cgi.library.service.BookService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest
class LibraryApplicationTests {

    BookDTO book;
    @Autowired
    BookService bookService;

    @BeforeEach
    void setUp() {
       book = new BookDTO();

       book.setId(UUID.randomUUID());
       book.setTitle("Book Title");
       book.setAuthor("Author");
       book.setYear(2020);
       book.setStatus(BookStatus.AVAILABLE);
       book.setAdded(LocalDate.now());
       book.setGenre("Genre");

       bookService.saveBook(book);
    }

    @Test
    @Transactional
    void givenBookId_whenGetBookById_shouldReturnBookDTO() {
        BookDTO returned = bookService.getBook(book.getId());
        assertEquals(book.getId(), returned.getId());
    }
}
