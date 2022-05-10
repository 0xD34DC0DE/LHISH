package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.model.ItemHistory;
import dev.d34dc0de.lhish.model.ItemHistoryEntry;
import dev.d34dc0de.lhish.repository.ItemHistoryRepository;
import org.springframework.stereotype.Service;

@Service
public class ItemHistoryService extends BaseService<ItemHistory, ItemHistoryRepository> {

    public ItemHistoryService(ItemHistoryRepository itemHistoryRepository) {
        super(itemHistoryRepository);
    }

    public ItemHistory update(ItemHistory itemHistory) {
        return repository.save(itemHistory);
    }

    public void addItemHistoryEntry(String id, ItemHistoryEntry itemHistoryEntry) {
        ItemHistory itemHistory = getById(id);
        itemHistory.getEntries().add(itemHistoryEntry);
        update(itemHistory);
    }

}
