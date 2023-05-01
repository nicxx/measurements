package eu.devx.measurements.controller;

import com.mongodb.client.DistinctIterable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/tag")
public class TagsController {


    private MongoTemplate mongoTemplate;

    public TagsController(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    @GetMapping
    public List<String> getTags() {
        List<String> list = new ArrayList<>();

        DistinctIterable<String> distinct = mongoTemplate.getCollection("device").distinct("tags", String.class);
        distinct.forEach(list::add);

        return list;
    }
}
