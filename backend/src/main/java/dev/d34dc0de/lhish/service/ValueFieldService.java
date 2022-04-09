package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.model.ViewFields.ValueField;
import dev.d34dc0de.lhish.repository.ValueFieldRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ValueFieldService {

    private final ValueFieldRepository valueFieldRepository;

    public ValueFieldService(ValueFieldRepository valueFieldRepository) {
        this.valueFieldRepository = valueFieldRepository;
    }

    public Optional<ValueField> findById(String id) {
        return valueFieldRepository.findById(id);
    }
}
