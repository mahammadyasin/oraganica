package com.organica.repositories;

import com.organica.entities.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {

//    List<Address> findAllByUserUserid(Long userId);

}
