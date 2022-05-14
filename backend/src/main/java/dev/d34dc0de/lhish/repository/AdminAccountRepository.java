package dev.d34dc0de.lhish.repository;

import dev.d34dc0de.lhish.model.AdminAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.repository.query.MongoEntityInformation;
import org.springframework.data.mongodb.repository.support.MongoRepositoryFactory;
import org.springframework.data.mongodb.repository.support.SimpleMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminAccountRepository extends BaseRepository<AdminAccount> {
}

