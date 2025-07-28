package com.organica.repositories;

import com.organica.entities.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long> {

    //    List<Address> findAllByUserUserid(Long userId);
//    List<Address> findAllByUserUserid(Long Userid); // Match exactly!

    @Query("SELECT a FROM Address a WHERE a.user.Userid = :userId") // Capital 'U'
    List<Address> getAddressesByUser(@Param("userId") Long userId);


}
