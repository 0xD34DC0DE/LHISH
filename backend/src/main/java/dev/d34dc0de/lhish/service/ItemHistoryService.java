package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.exceptions.NotFoundException;
import dev.d34dc0de.lhish.model.ItemHistory;
import dev.d34dc0de.lhish.repository.ItemHistoryRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ItemHistoryService {

    private final ItemHistoryRepository itemHistoryRepository;

    public ItemHistoryService(ItemHistoryRepository itemHistoryRepository) {
        this.itemHistoryRepository = itemHistoryRepository;
    }

    public ItemHistory insert(ItemHistory itemHistory) {
        return itemHistoryRepository.save(itemHistory);
    }

    /**
     * Try to find an item history by its id.
     * @param id id of the item history to find
     * @return Optional&lt;ItemHistory&gt; if found, empty otherwise
     */
    public Optional<ItemHistory> findById(String id) {
        return itemHistoryRepository.findById(id);
    }

    /**
     * Get an item history by its id.
     * @param id id of the item history to get
     * @return ItemHistory if found, throws NotFoundException otherwise
     */
    public ItemHistory getById(String id) {
        return itemHistoryRepository.findById(id).orElseThrow(() -> new NotFoundException("ItemHistory", id));
    }
}
