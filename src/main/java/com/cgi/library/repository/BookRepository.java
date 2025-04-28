package com.cgi.library.repository;

import com.cgi.library.entity.Book;
import com.cgi.library.model.BookStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BookRepository extends JpaRepository<Book, UUID> {
    Book findBookByTitle(String title);
    Page<Book> findBooksByTitleContainingIgnoreCase(String title, Pageable pageable);
    Page<Book> findBooksByStatus(BookStatus status, Pageable pageable);


    Book findBookById(UUID id);
}
