package com.dhkim.morph.domain;

import com.dhkim.common.domain.Domain;
import lombok.*;

import javax.persistence.*;

@Entity
@Data
@EqualsAndHashCode(callSuper=false)
@NoArgsConstructor
@AllArgsConstructor
public class NounsDic extends Domain {

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
}
