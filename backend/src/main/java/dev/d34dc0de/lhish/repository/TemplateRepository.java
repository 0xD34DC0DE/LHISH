package dev.d34dc0de.lhish.repository;

import dev.d34dc0de.lhish.model.Template;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TemplateRepository extends MongoRepository<Template, String> {
    List<Template> findAllByIsInstanceFalse();
}
