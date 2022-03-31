package dev.d34dc0de.lhish.repository;

import dev.d34dc0de.lhish.model.Item;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemRepository extends MongoRepository<Item, String> {
    List<Item> findByCategoryId(String categoryId);
}