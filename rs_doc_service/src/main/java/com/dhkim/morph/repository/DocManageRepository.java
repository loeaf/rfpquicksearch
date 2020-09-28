package com.dhkim.morph.repository;

import com.dhkim.morph.domain.NounsDic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public interface DocManageRepository extends JpaRepository<NounsDic, String> {
    NounsDic findTop1ByNounsFullName(String nounsFullName);
    List<NounsDic> findByNounsFullNameIn(ArrayList<String> nounsFullName);
    List<NounsDic> findByRegistDtBetween(LocalDateTime startDt, LocalDateTime endDt);
}