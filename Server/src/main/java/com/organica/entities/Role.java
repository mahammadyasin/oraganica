package com.organica.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String role;

    @ManyToOne
    @JoinColumn(name = "user_id")  // FK column in Role table
    private User user;

    public Role(String role) {
        this.role = role;
    }
}
