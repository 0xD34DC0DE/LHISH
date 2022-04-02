package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.exceptions.NotFoundException;
import dev.d34dc0de.lhish.exceptions.NullFieldException;
import dev.d34dc0de.lhish.model.Item;
import dev.d34dc0de.lhish.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    private final CategoryService categoryService;

    public ItemService(ItemRepository itemRepository, CategoryService categoryService) {
        this.itemRepository = itemRepository;
        this.categoryService = categoryService;
    }

    public Item insert(Item item) throws NotFoundException {
//        if(item.getCategoryId() == null) {
//            throw new NullFieldException("Category id cannot be null");
//        }

//        if (categoryService.findById(item.getCategoryId()).isEmpty()) {
//            throw new NotFoundException("Category", item.getCategoryId());
//        }

        return itemRepository.insert(item);
    }

    public List<Item> getAll() {
        return itemRepository.findAll();
    }

    public Optional<Item> findById(String id) {
        return itemRepository.findById(id);
    }
}
