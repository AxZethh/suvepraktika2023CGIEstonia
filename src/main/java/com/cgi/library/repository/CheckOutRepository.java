package com.cgi.library.repository;

import com.cgi.library.entity.CheckOut;
import com.cgi.library.model.CheckOutDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface CheckOutRepository extends JpaRepository<CheckOut, UUID> {
    Page<CheckOut> findAllByBorrowedBook_Id(UUID borrowedBookId, Pageable pageable);
    Page<CheckOut> findAllByBorrowedBookTitleContainsIgnoreCase(String title, Pageable pageable);
}
