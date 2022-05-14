package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.exceptions.NotFoundException;
import dev.d34dc0de.lhish.model.DBMetrics;
import dev.d34dc0de.lhish.repository.BaseRepository;

import java.util.List;
import java.util.Optional;

public abstract class BaseService<T, R extends BaseRepository<T>> {

    protected final R repository;

    public BaseService(R repository) {
        this.repository = repository;
    }

    public DBMetrics getMetrics() {
       return repository.getMetrics();
    }

    public Optional<T> findById(String id) {
        return repository.findById(id);
    }

    public T getById(String id) {
        return repository.findById(id).orElseThrow(() -> new NotFoundException(repository.getEntityName(), id));
    }

    public T save(T entity) {
        return repository.save(entity);
    }

    public T update(T entity) {
        return repository.save(entity);
    }

    public void deleteById(String id) {
        repository.deleteById(id);
    }

    public List<T> getAll() {
        return repository.findAll();
    }

}
