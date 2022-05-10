package dev.d34dc0de.lhish.configuration;

import dev.d34dc0de.lhish.repository.BaseRepositoryImpl;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.data.mongodb.repository.support.MongoRepositoryFactory;

@Configuration
@EnableMongoRepositories(basePackages = "dev.d34dc0de.lhish.repository", repositoryBaseClass = BaseRepositoryImpl.class)
public class MongoRepositoryFactoryConfig {
    @Bean
    public MongoRepositoryFactory mongoRepositoryFactory(MongoOperations mongoOperations) {
        return new MongoRepositoryFactory(mongoOperations);
    }

    @Bean
    public MongoTemplate mongoTemplate(MongoDatabaseFactory factory) {
        return new MongoTemplate(factory);
    }
}
