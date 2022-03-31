package dev.d34dc0de.lhish.repository;

import dev.d34dc0de.lhish.model.Account;
import dev.d34dc0de.lhish.model.Category;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String> {
}