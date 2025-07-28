package com.organica.repositories;

import com.organica.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Integer> {

   // This will work ONLY if Role has @ManyToOne User user;
    
   // List<Role> findAllByUserUserid(Long userId);
   @Query("SELECT r FROM Role r WHERE r.user.Userid = :userId")
   List<Role> getRolesByUserId(@Param("userId") Long userId);

}
