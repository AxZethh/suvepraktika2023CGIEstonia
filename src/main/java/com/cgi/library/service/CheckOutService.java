package com.cgi.library.service;

import com.cgi.library.entity.CheckOut;
import com.cgi.library.model.CheckOutDTO;
import com.cgi.library.repository.CheckOutRepository;
import com.cgi.library.util.ModelMapperFactory;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.UUID;

@Service
public class CheckOutService {

    @Autowired
    private CheckOutRepository checkOutRepository;

    ModelMapper modelMapper = ModelMapperFactory.getMapper();

    public Page<CheckOutDTO> getCheckOuts(Pageable pageable) {
        return checkOutRepository.findAll(pageable).map(checkOut -> modelMapper.map(checkOut, CheckOutDTO.class));
    }

    public CheckOutDTO getCheckOut(UUID checkOutId) {
        CheckOut checkOut = checkOutRepository.getOne(checkOutId);
        return modelMapper.map(checkOut, CheckOutDTO.class);
    }

    public void saveCheckOut(CheckOutDTO checkOutDTO) {
        checkOutDTO.setId(generateRandomUUID());
        checkOutRepository.save(ModelMapperFactory.getMapper().map(checkOutDTO, CheckOut.class));
    }

    public void deleteCheckOut(UUID checkOutId) {
        checkOutRepository.deleteById(checkOutId);
    }

    public Page<CheckOutDTO> getCheckOutsByBook(Pageable pageable, UUID bookId) {
       return checkOutRepository.findAllByBorrowedBook_Id(bookId, pageable).map(checkOut -> modelMapper.map(checkOut, CheckOutDTO.class));
    }

    public boolean existsById(UUID id) {
        return checkOutRepository.existsById(id);
    }

    private UUID generateRandomUUID() {
        UUID uuid = UUID.randomUUID();
        while(checkOutRepository.existsById(uuid)) {
            uuid = UUID.randomUUID();
        }
        return uuid;
    }
}
