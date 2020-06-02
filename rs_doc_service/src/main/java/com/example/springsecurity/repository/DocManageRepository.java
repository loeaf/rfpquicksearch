package com.example.springsecurity.repository;

import com.example.springsecurity.model.NounsDic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.List;

public interface DocManageRepository extends JpaRepository<NounsDic, String> {
    NounsDic findByNounsFullName(String nounsFullName);
    List<NounsDic> findByNounsFullNameIn(ArrayList<String> nounsFullName);
}