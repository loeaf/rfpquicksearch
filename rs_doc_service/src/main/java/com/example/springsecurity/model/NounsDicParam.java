package com.example.springsecurity.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NounsDicParam {
    private String nounsFullName;
    private String nounsType;
    private String combinNounsName;
}
