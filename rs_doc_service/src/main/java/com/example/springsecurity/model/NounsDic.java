package com.example.springsecurity.model;

import lombok.*;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@AllArgsConstructor
public class NounsDic extends  BaseEntity{
    @Id
    @Column
    @GeneratedValue
    public Long id;

    @Column
    private String nounsFullName;

    @Column(nullable = false)
    private NounStatus nounsType;

    @Column(nullable = true)
    private String combinNounsName;

    public NounsDic(String nounsFullName, NounStatus nounsType) {
        this.nounsFullName = nounsFullName;
        this.nounsType = nounsType;
    }
    public NounsDic(String nounsFullName, NounStatus nounsType, String combinNounsName) {
        this.nounsFullName = nounsFullName;
        this.nounsType = nounsType;
        this.combinNounsName = combinNounsName;
    }
}
