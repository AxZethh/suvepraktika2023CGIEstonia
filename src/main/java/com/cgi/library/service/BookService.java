package com.cgi.library.service;

import com.cgi.library.entity.Book;
import com.cgi.library.model.BookDTO;
import com.cgi.library.model.BookStatus;
import com.cgi.library.repository.BookRepository;
import com.cgi.library.util.ModelMapperFactory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    ModelMapper modelMapper = ModelMapperFactory.getMapper();

    public Page<BookDTO> getBooks(Pageable pageable) {
        return bookRepository.findAll(pageable).map(book -> modelMapper.map(book, BookDTO.class));
    }

    public BookDTO getBook(UUID bookId) {
        Book book = bookRepository.getOne((bookId));
        return modelMapper.map(book, BookDTO.class);
    }

    public UUID saveBook(BookDTO bookDTO) {
        return bookRepository.save(modelMapper.map(bookDTO, Book.class)).getId();
    }

    public void deleteBook(UUID bookId) {
        if(bookRepository.findBookById((bookId)).getStatus() != BookStatus.AVAILABLE) {
            throw new RuntimeException("Unable to Delete! Book is still checked out!");
        }
        bookRepository.deleteById(bookId);
    }

    public BookDTO getBookByTitle(String title) {
        return modelMapper.map(bookRepository.findBookByTitle(title.trim()), BookDTO.class);
    }

    public Page<BookDTO> getBooksByTitleContaining(String title,Pageable pageable) {
        return bookRepository.findBooksByTitleContainingIgnoreCase(title.trim(), pageable).map(book -> modelMapper.map(book, BookDTO.class));
    }


    public Page<BookDTO> getBooksByStatus(BookStatus status,Pageable pageable) {
        return bookRepository.findBooksByStatus(status,pageable).map(book -> modelMapper.map(book, BookDTO.class));
    }
}
