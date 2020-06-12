package com.example.springsecurity.controller;

import com.example.springsecurity.model.NounStatus;
import com.example.springsecurity.model.NounsDic;
import com.example.springsecurity.model.NounsDicParam;
import com.example.springsecurity.model.NounsResult;
import com.example.springsecurity.service.DocService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("api/doc")
public class DocRestApiController {
    @Autowired
    private DocService docService;

    /**
     * 형태소 문장을 분석하여 정렬해서 보내준다
     * @param sentence
     * @return 정렬된 형태소 값
     * @throws Exception
     */
    @GetMapping("morph/{sentence}")
    public ArrayList<NounsResult> getMorphList(@PathVariable String sentence) throws Exception {
        var result = docService.analysisSentence(sentence);
        Collections.sort(result, Comparator.comparing(NounsResult::getExsist));
        return result;
    }

    /**
     * "김+도현"과 같이 명사가 복합으로 구성되어진 단어들에 대해서 DB에 있는지 확인하고 리턴
     * 단어가 모두다 사전에 있는지 확인, 있으면 O, 없으면 X
     * @param sentence
     * @return 명사들이 DB에 있는지에 대한 결과
     * @throws Exception
     */
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
        var nounsResult = new NounsResult();
        var nounsDicObj = docService.modifyRfpDic(sentence, nounsDic.getNounsType() + "", nounsDic.getCombinNounsName());;
        nounsResult.setNd(nounsDicObj);
        nounsResult.setExsist(1);
        return nounsResult;
    }

    @DeleteMapping("morph/{sentence}")
    public int patchMorphList(
            @PathVariable String sentence) throws Exception {
        return docService.deleteRfpDic(sentence);
    }

    /**
     * "김+도현"과 같이 명사가 복합으로 구성되어진 단어들에 대해서 DB에 있는지 확인하고 리턴
     * 단어가 모두다 사전에 있는지 확인, 있으면 O, 없으면 X
     * @param sentence
     * @return 명사들이 DB에 있는지에 대한 결과
     * @throws Exception
     */
    @GetMapping("nouns/{nounsWord}")
    public NounsDic getNounsDetailInfo(@PathVariable String nounsWord) throws Exception {
        return docService.getRfpDicNounsByNounsWord(nounsWord);
    }

    @PostMapping("nouns")
    public NounsDic postNouns(@RequestBody NounsDicParam nounsDicParam) throws Exception {
        var nounsDic = new NounsDic();
        nounsDic.setNounsType(NounStatus.valueOf(nounsDicParam.getNounsType()));
        nounsDic.setCombinNounsName(nounsDicParam.getCombinNounsName());
        nounsDic.setNounsFullName(nounsDicParam.getNounsFullName());
        return docService.postRfpDicNounsByNouns(nounsDic);
    }

    @GetMapping("initDic")
    public String test2() throws IOException {
        this.docService.initNounDic();
        return "";
    }

    @GetMapping("makeDic")
    public String makeDic() throws ParseException {
        LocalDate localDate = LocalDate.of(2017, 12, 12);
        var dicObjList = this.docService.getDicNounsByDate("2020/06/05", "2020/06/08");

        File file = new File("C:\\Users\\Daumsoft\\Anaconda3\\Lib\\site-packages\\konlpy\\java\\kkma-2.0\\dic\\nouns_" + localDate + ".dic");

        try {
            FileWriter fw = new FileWriter(file);
            dicObjList.forEach(p -> {
                try {
                    String lineString = String.format("%s/%s/%s", p.getNounsFullName(), p.getNounsType(), p.getCombinNounsName());
                    fw.write(lineString + "\n");
                } catch (IOException e) {
                    e.printStackTrace();
                }
            });
            fw.close();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "";
    }
}