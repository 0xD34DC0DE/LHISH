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
    private final ImageService imageService;
    private final ItemHistoryService itemHistoryService;
    private final TemplateService templateService;

    public ItemService(ItemRepository itemRepository,
                       CategoryService categoryService,
                       ImageService imageService,
                       ItemHistoryService itemHistoryService,
                       TemplateService templateService) {
        this.itemRepository = itemRepository;
        this.categoryService = categoryService;
        this.imageService = imageService;
        this.itemHistoryService = itemHistoryService;
        this.templateService = templateService;
    }

    public Item insert(Item item) throws NotFoundException {
        if (item.getCategoryId() == null) {
            throw new NullFieldException("Category id cannot be null");
        }

        if (categoryService.findById(item.getCategoryId()).isEmpty()) {
            throw new NotFoundException("Category", item.getCategoryId());
        }

        return itemRepository.insert(item);
    }

    public void deleteById(String id) {
        itemRepository.findById(id).ifPresent(item -> {
            imageService.deleteById(item.getImageId());
            itemHistoryService.deleteById(item.getHistoryId());
            templateService.deleteById(item.getTemplateId());
            itemRepository.deleteById(id);
        });
    }

    public List<Item> getAll() {
        return itemRepository.findAll();
    }

    public Optional<Item> findById(String id) {
        return itemRepository.findById(id);
    }

    public List<Item> findByCategoryId(String categoryId) {
        if (categoryService.findById(categoryId).isEmpty()) {
            throw new NotFoundException("Category", categoryId);
        }
        return itemRepository.findByCategoryId(categoryId);
    }
}
