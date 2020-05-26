package com.example.springsecurity;

import com.example.springsecurity.model.NounStatus;
import com.example.springsecurity.model.NounsDic;
import com.example.springsecurity.service.DocService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.io.IOException;

@SpringBootApplication
public class SpringSecurityApplication {

    public static void main(String[] args) {
//        try (ConfigurableApplicationContext ctx = SpringApplication.run(SpringSecurityApplication.class, args)) {
//            var bean1 = ctx.getBean(DocService.class);
            // bean1.initNounDic();
//            var aa = bean1.findAllNounsDicByName("aaaa");
//            var aa = bean1.addNounsDic(new NounsDic("aaaa", NounStatus.MMG));
//            var aa = bean1.removeNounsDic(new NounsDic("aaaa", NounStatus.MMG));
//            var aa = bean1.findAllNounsDicByPage(1);
//            String MorphParam = "\"제안사는 사업을 기간 내에 완수하기 위해 단계별 " +
//                    "추진일정 등이 포함된 일정계획을 제시하여야 착수보고서 제출 사업 진행의 모든 일정이 명시된 사업 일정계획표(WBS)를 함께 제출 발주기관의 승인을 받아야 " +
//                    "제안사는 일정계획에 따른 관리방안 체계를 제시하여야 사업수행은 일정에 맞춰서 진행하되 일정이 변경될 경우에는 사전에 발주기관과 협의하여야 최종 선정되어 " +
//                    "계약체결된 사업자는 계약일로부터 14일 이내에 계약서, 제안요청서, 제안서, 과업지시서 등을 근거로, 사업을 수행하기 위한 착수계 세부사업추진계획서를 작성·" +
//                    "제출하여야 사업자는 사업추진과정에서 생산되는 제반 작업 단위별 산출물에 대하여 작업 일정계획 품질보증계획과 연계하여 산출물의 종류, 주요내용, 작성 제출시기 " +
//                    "등을 제시하여야 작성된 보고서에 대한 오류, 미비점 발견 수정 요구 즉시 응해야 하며, 추가 요구가 있을 이에 응하여야 사업의 효율적인 추진을 위해 " +
//                    "보고회(착수보고회, 중간보고회, 완료보고회 등), 워크숍 위험관리 방안을 제시하여야\"";
//
//            var result = bean1.analysisSentence(MorphParam);
//            System.out.println(result.toString());
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
        SpringApplication.run(SpringSecurityApplication.class, args);
    }

}
