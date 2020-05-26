package com.example.springsecurity.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NounsDic {
    @Id
    private String nounsFullName;

    @Column(nullable = false)
    private NounStatus nounsType;

    @Column(nullable = true)
    private String combinNounsName;

    public NounsDic(String nounsFullName, NounStatus nounsType) {
        this.nounsFullName = nounsFullName;
        this.nounsType = nounsType;
    }
}
