package dev.d34dc0de.lhish.repository;

import dev.d34dc0de.lhish.model.ViewFields.ValueField;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ValueFieldRepository extends MongoRepository<ValueField, String> {
}
