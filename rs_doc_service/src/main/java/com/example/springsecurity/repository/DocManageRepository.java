package com.example.springsecurity.repository;

import com.example.springsecurity.model.NounsDic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocManageRepository extends JpaRepository<NounsDic, String> {
    NounsDic findByNounsFullName(String nounsFullName);
}