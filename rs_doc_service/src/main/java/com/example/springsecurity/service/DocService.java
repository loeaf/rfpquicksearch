package com.example.springsecurity.service;

import com.example.springsecurity.model.NounStatus;
import com.example.springsecurity.model.NounsDic;
import com.example.springsecurity.model.NounsResult;
import com.example.springsecurity.repository.DocManageRepository;
import org.apache.commons.exec.CommandLine;
import org.apache.commons.exec.DefaultExecutor;
import org.apache.commons.exec.PumpStreamHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Scope;
import org.springframework.core.io.ClassPathResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@Service
public class DocService {

    @Autowired
    DocManageRepository docManageRepository;

//    @Bean
//    @Scope(value = "prototype")
    @Transactional
    public void initNounDic() throws IOException {
        ClassPathResource resource = new ClassPathResource("assets/noun.dic");
        Path path = Paths.get(resource.getURI());
        //System.out.println("한글");
        List<String> content = Files.readAllLines(path, StandardCharsets.UTF_8);
        int max = 0;
        for (var o : content) {
            var splitStr = o.split("[/;]");
            var lenSeplit = splitStr.length;
            if(max < lenSeplit)
             max = lenSeplit;
            if(o.equals("") || o.contains("//"))
                continue;

            String nounDicFullName = splitStr[0];
            NounStatus nounDicType = NounStatus.valueOf(splitStr[1]);
            String nounMixFullName;
            NounsDic nounsDic = new NounsDic();
            nounsDic.setNounsFullName(nounDicFullName);
            nounsDic.setNounsType(nounDicType);
            if (lenSeplit == 3) {
                nounsDic.setCombinNounsName(splitStr[2]);
            }
            this.docManageRepository.save(nounsDic);
        }
    }

//    @Bean
//    @Scope(value = "prototype")
    @Transactional
    public List<NounsDic> findAllNounsDic() {
        return this.docManageRepository.findAll();
    }

//    @Bean
//    @Scope(value = "prototype")
    @Transactional
    public NounsDic findAllNounsDicByName(String nounId) {
        var result = this.docManageRepository.findByNounsFullName(nounId);
        return result;
    }

//    @Bean
//    @Scope(value = "prototype")
    @Transactional
    public List<NounsDic> findAllNounsDicByPage(int page) {
        Pageable pg = PageRequest.of(page, 5);
        var result = this.docManageRepository.findAll(pg).toList();
        return result;
    }

//    @Bean
//    @Scope(value = "prototype")
    @Transactional
    public NounsDic addNounsDic(NounsDic nounsDic) {
        String nounsFullName = nounsDic.getNounsFullName();
        var result = this.docManageRepository.findByNounsFullName(nounsFullName);
        if(result != null)
            return null;

        return this.docManageRepository.save(nounsDic);
    }

//    @Bean
//    @Scope(value = "prototype")
    @Transactional
    public int removeNounsDic(NounsDic nounsDic) {
        String nounsFullName = nounsDic.getNounsFullName();
        var result = this.docManageRepository.findByNounsFullName(nounsFullName);
        if(result == null)
            return 0;
        this.docManageRepository.delete(nounsDic);
        return 1;
    }

//    @Bean
//    @Scope(value = "prototype")
    @Transactional
    public ArrayList<NounsResult> analysisSentence(String MorphParam) throws Exception {
        String pythonPath = "C://Users/Daumsoft/Anaconda3/python";
        String runPyPath = "C://Deport/2020_RFPSEARCH/rfpquicksearch/rs_doc_service/src/main/resources/assets/KKmaNouns.py";
        String cmd_str =pythonPath + " " + runPyPath + " " +  MorphParam;
        CommandLine cm = CommandLine.parse(cmd_str);
        var result = execAndRtnResult(cm);
        return result;
    }

    /**
     * 외부 명령 실행 후 결과를 String으로 받음
     *
     * @param command
     * @return
     * @throws Exception
     */
    private ArrayList<NounsResult> execAndRtnResult(CommandLine command) throws Exception {
        System.out.println("execAndRtnResult. command: " + command.toString());

        DefaultExecutor executor = new DefaultExecutor();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();

        PumpStreamHandler streamHandler = new PumpStreamHandler(baos);
        executor.setStreamHandler(streamHandler);

        var resultList = new ArrayList<NounsResult>();
        try {
            int exitCode = executor.execute(new CommandLine(command));
            System.out.println(exitCode);
            var nounsString = baos.toString("utf-8");
            System.out.println(nounsString);
            var noutsLists = nounsString.split(",");
            for(var nouns: noutsLists) {
                var nounsResultInfo = new NounsResult();
                var nounsInfo = this.docManageRepository.findByNounsFullName(nouns);
                if(nounsInfo == null) {
                    var nounsObj = new NounsDic();
                    nounsObj.setNounsFullName(nouns);
                    nounsResultInfo.setNd(nounsObj);
                    nounsResultInfo.setExsist(0);
                } else {
                    nounsResultInfo.setNd(nounsInfo);
                    nounsResultInfo.setExsist(1);
                }
                resultList.add(nounsResultInfo);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new Exception(e.getMessage(), e);
        }
        return resultList;
    }

    public List<NounsDic> getRfpDicNounsByList(ArrayList<String> nounsData ) {
        return this.docManageRepository.findByNounsFullNameIn(nounsData);
    }

    public NounsDic getRfpDicNounsByNounsWord(String nounsWord ) {
        return this.docManageRepository.findByNounsFullName(nounsWord);
    }

    public NounsDic modifyRfpDic(String nounsFullName, String nounsType, String combinNounsName) {
        var isNouns = this.docManageRepository.findByNounsFullName(nounsFullName);
        if(isNouns == null) {
            var nounsDic = new NounsDic(nounsFullName, NounStatus.valueOf(nounsType), combinNounsName);
            return this.docManageRepository.save(nounsDic);
        } else {
            isNouns.setCombinNounsName(combinNounsName);
            isNouns.setNounsType(NounStatus.valueOf(nounsType));
            return this.docManageRepository.save(isNouns);
        }
    }

    public int deleteRfpDic(String nounsFullName) {
        var isNouns = this.docManageRepository.findByNounsFullName(nounsFullName);
        if(isNouns == null) {
            return 0;
        } else {
            this.docManageRepository.delete(isNouns);
            return 1;
        }
    }

    public NounsDic postRfpDicNounsByNouns(NounsDic nounsDic) {
        var isNouns = this.docManageRepository.findByNounsFullName(nounsDic.getNounsFullName());
        if(isNouns != null) {
            return this.docManageRepository.save(nounsDic);
        } else {
            isNouns.setCombinNounsName(nounsDic.getCombinNounsName());
            isNouns.setNounsType(nounsDic.getNounsType());
            return this.docManageRepository.save(isNouns);
        }
    }
}
