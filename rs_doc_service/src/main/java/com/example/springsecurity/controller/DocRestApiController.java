package com.example.springsecurity.controller;

        import com.example.springsecurity.model.NounsResult;
        import com.example.springsecurity.service.DocService;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.web.bind.annotation.*;

        import java.util.ArrayList;
        import java.util.Collection;
        import java.util.Collections;
        import java.util.Comparator;

@RestController
@RequestMapping("api/doc")
@CrossOrigin(origins="http://localhost:4200")
public class DocRestApiController {

    @Autowired
    private DocService docService;

    @GetMapping("morphList/{sentence}")
    public ArrayList<NounsResult> getMorphList(@PathVariable String sentence) throws Exception {
        var result = docService.analysisSentence(sentence);
        Collections.sort(result, Comparator.comparing(NounsResult::getExsist));
        return result;
    }

    @GetMapping("test2")
    public String test2(){
        return "API Test 2";
    }

}