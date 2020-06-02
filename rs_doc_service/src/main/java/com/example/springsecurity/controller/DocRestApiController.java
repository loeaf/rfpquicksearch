package com.example.springsecurity.controller;

import com.example.springsecurity.model.NounsDic;
import com.example.springsecurity.model.NounsResult;
import com.example.springsecurity.service.DocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("api/doc")
public class DocRestApiController {
    @Autowired
    private DocService docService;

    @GetMapping("morph/{sentence}")
    public ArrayList<NounsResult> getMorphList(@PathVariable String sentence) throws Exception {
        var result = docService.analysisSentence(sentence);
        Collections.sort(result, Comparator.comparing(NounsResult::getExsist));
        return result;
    }

    // 단어가 모두다 사전에 있는지 확인, 있으면 O, 없으면 X
    @GetMapping("combinNouns/{sentence}")
    public List<NounsDic> getNounsListByCombinNouns(@PathVariable String sentence) throws Exception {
        var nounsArr = new ArrayList<String>();
        Arrays.stream(sentence.split("\\+")).forEach(p -> nounsArr.add(p));
        System.out.println(nounsArr.toString());
        return docService.getRfpDicNounsByList(nounsArr);
    }

    @PutMapping("morph/{sentence}")
    public NounsResult patchMorphList(
            @RequestBody NounsDic nounsDic,
            @PathVariable String sentence) throws Exception {
        docService.modifyRfpDic(sentence, nounsDic.getNounsType() + "", nounsDic.getCombinNounsName());
        var nounsResult = new NounsResult();
        var nounsDicObj = new NounsDic();
        nounsResult.setNd(nounsDicObj);
        nounsResult.setExsist(1);
        return nounsResult;
    }

    @DeleteMapping("morph/{sentence}")
    public int patchMorphList(
            @PathVariable String sentence) throws Exception {
        return docService.deleteRfpDic(sentence);
    }

    @GetMapping("test2")
    public String test2(){
        return "API Test 2";
    }

}