package dev.d34dc0de.lhish.repository;

import dev.d34dc0de.lhish.annotation.CascadeDelete;
import dev.d34dc0de.lhish.model.DBMetrics;
import dev.d34dc0de.lhish.repository.utils.RepositoryReflectionUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.repository.query.MongoEntityInformation;
import org.springframework.data.mongodb.repository.support.SimpleMongoRepository;

import java.lang.reflect.Field;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

public class BaseRepositoryImpl<T> extends SimpleMongoRepository<T, String> implements BaseRepository<T> {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final MongoOperations mongoOperations;

    private final MongoEntityInformation<T, String> entityInformation;

    public BaseRepositoryImpl(MongoEntityInformation<T, String> entityInformation, MongoOperations mongoOperations) {
        super(entityInformation, mongoOperations);
        this.entityInformation = entityInformation;
        this.mongoOperations = mongoOperations;
    }

    @Override
    public DBMetrics getMetrics() {
        String collection = entityInformation.getCollectionName();
        String command = "{collStats: '" + collection + "', scale: 1024}";
        return new DBMetrics(mongoOperations.executeCommand(command));
    }

    @Override
    public String getEntityName() {
        return entityInformation.getJavaType().getSimpleName();
    }

    @Override
    public void deleteById(String id) {
        Optional<T> entity = findById(id);

        if (entity.isEmpty())
            return;

        entity.map(e -> e.getClass().getDeclaredFields())
                .stream()
                .flatMap(Arrays::stream)
                .forEach(field -> deleteByIdField(entity.get(), field));

        deleteByIdInCollection(id, entityInformation.getCollectionName());
    }

    private void deleteByIdField(T entity, Field field) {
        Optional<Class<?>> clazz = getCascadeDeleteEntityClass(field);

        clazz.ifPresent(entityClass -> {
            String collectionName = mongoOperations.getCollectionName(entityClass);
            Optional<String> fieldId = RepositoryReflectionUtil.getStringValue(field, entity);
            
            if (fieldId.isPresent()) {
                deleteByIdInCollection(fieldId.get(), collectionName);
            } else {
                logger.warn("Field {} is null", field.getName());
            }
        });
    }

    private void deleteByIdInCollection(String fieldId, String collectionName) {
        Query query = new Query(Criteria.where("_id").is(fieldId));
        mongoOperations.remove(query, collectionName);
    }

    private Optional<Class<?>> getCascadeDeleteEntityClass(Field field) {
        return RepositoryReflectionUtil.getAnnotationValue(field, CascadeDelete.class);
    }

    @Override
    public Optional<T> queryOne(Criteria... criterion) {
        Query query = getQuery(criterion);
        return Optional.ofNullable(mongoOperations.findOne(query, entityInformation.getJavaType()));
    }

    @Override
    public Optional<T> queryOneRestricted(Criteria... criterion) {
        Query query = getQuery(criterion);
        query.restrict(entityInformation.getJavaType());
        return Optional.ofNullable(mongoOperations.findOne(query, entityInformation.getJavaType()));
    }

    @Override
    public List<T> queryMultiple(Criteria... criterion) {
        Query query = getQuery(criterion);
        return mongoOperations.find(query, entityInformation.getJavaType());
    }

    @Override
    public Stream<T> queryMultipleStream(Criteria... criterion) {
        return queryMultiple(criterion).stream();
    }

    @Override
    public List<T> queryMultipleRestricted(Criteria... criterion) {
        Query query = getQuery(criterion);
        query.restrict(entityInformation.getJavaType());
        return mongoOperations.find(query, entityInformation.getJavaType());
    }

    @Override
    public Stream<T> queryMultipleRestrictedStream(Criteria... criterion) {
        return queryMultipleRestricted(criterion).stream();
    }

    private Query getQuery(Criteria[] criteria) {
        Query query = new Query();
        for (Criteria c : criteria) {
            query.addCriteria(c);
        }
        return query;
    }
}


