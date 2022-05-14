package dev.d34dc0de.lhish.repository;

import dev.d34dc0de.lhish.model.DBMetrics;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@NoRepositoryBean
public interface BaseRepository<T> extends MongoRepository<T, String> {

    /**
     * Get the metrics for the repository
     * @return the metrics for the repository
     */
    DBMetrics getMetrics();

    /**
     * Get the name of the domain class
     * @return the name of the domain class
     */
    String getEntityName();

    /**
     * Find an entity by its id
     * @param id the id of the entity to find
     * @return Optional of the result
     */
    Optional<T> findById(String id);

    /**
     * Deletes an entity by its id and all other fields marked by the @CascadeDelete annotation
     */
    @Override
    void deleteById(String id);

    /**
     * Executes a query for a single entity
     * @param criterion the list of criteria to use
     * @return Optional of the result
     */
    Optional<T> queryOne(Criteria... criterion);

    /**
     * Executes a query for a single entity that is restricted to the entity class of the repository.
     * @param criteria the list of criteria to use
     * @return Optional of the result
     */
    Optional<T> queryOneRestricted(Criteria... criteria);

    /**
     * Executes a query for on multiple entities
     * @param criterion the list of criterion to use
     * @return a list of the results
     */
    List<T> queryMultiple(Criteria... criterion);

    /**
     * Executes a query for on multiple entities
     * @param criterion the list of criterion to use
     * @return a stream of the results
     */
    Stream<T> queryMultipleStream(Criteria... criterion);

    /**
     * Executes a query on multiple entities that are restricted to the entity class of the repository.
     * @param criterion the list of criterion to use
     * @return a list of the results
     */
    List<T> queryMultipleRestricted(Criteria... criterion);

    /**
     * Executes a query on multiple entities that are restricted to the entity class of the repository.
     * @param criterion the list of criteria to use
     * @return a stream of the results
     */
    Stream<T> queryMultipleRestrictedStream(Criteria... criterion);
}
