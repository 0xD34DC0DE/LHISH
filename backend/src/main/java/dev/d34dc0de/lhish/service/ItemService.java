package dev.d34dc0de.lhish.service;

import dev.d34dc0de.lhish.exceptions.NotFoundException;
import dev.d34dc0de.lhish.exceptions.NullFieldException;
import dev.d34dc0de.lhish.form.ItemCreationForm;
import dev.d34dc0de.lhish.mapping.parameter.ItemCreationParameters;
import dev.d34dc0de.lhish.model.Image;
import dev.d34dc0de.lhish.model.Item;
import dev.d34dc0de.lhish.model.ItemHistory;
import dev.d34dc0de.lhish.repository.ItemRepository;
import dev.d34dc0de.lhish.service.utils.CheckUtils;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService extends BaseService<Item, ItemRepository> {

    private final CategoryService categoryService;

    private final ImageService imageService;

    private final ItemHistoryService itemHistoryService;

    private final TemplateService templateService;

    private final MapperService mapperService;

    public ItemService(ItemRepository itemRepository,
                       CategoryService categoryService,
                       ImageService imageService,
                       ItemHistoryService itemHistoryService,
                       TemplateService templateService,
                       MapperService mapperService) {
        super(itemRepository);
        this.categoryService = categoryService;
        this.imageService = imageService;
        this.itemHistoryService = itemHistoryService;
        this.templateService = templateService;
        this.mapperService = mapperService;
    }

    @Override
    public Item save(Item item) throws NotFoundException {
        CheckUtils.throwIfNull(item.getCategoryId(), "categoryId");
        categoryService.getById(item.getCategoryId());
        return repository.insert(item);
    }

    public List<Item> findByCategoryId(String categoryId) {
        categoryService.getById(categoryId);
        Criteria criteria = Criteria.where("categoryId").is(categoryId);
        return repository.queryMultiple(criteria);
    }

    public void insertFromForm(ItemCreationForm itemCreationForm, String userId) throws NullFieldException, NotFoundException {
        Image image = imageService.save(mapperService.map(itemCreationForm.image(), Image.class));
        ItemHistory itemHistory = insertItemHistory(userId);

        templateService.getById(itemCreationForm.templateId());

        ItemCreationParameters itemCreationParameters = ItemCreationParameters.builder()
                .itemCreationForm(itemCreationForm)
                .userId(userId)
                .imageId(image.getId())
                .historyId(itemHistory.getId())
                .templateId(itemCreationForm.templateId())
                .build();

        save(mapperService.map(itemCreationParameters, Item.class));
    }

    private ItemHistory insertItemHistory(String userId) {
        return itemHistoryService.save(mapperService.map(userId, ItemHistory.class));
    }
}
