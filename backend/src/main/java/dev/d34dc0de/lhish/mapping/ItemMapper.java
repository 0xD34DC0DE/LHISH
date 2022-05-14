package dev.d34dc0de.lhish.mapping;

import dev.d34dc0de.lhish.annotation.MappingMethod;
import dev.d34dc0de.lhish.annotation.MappingMethodListSource;
import dev.d34dc0de.lhish.exceptions.NullFieldException;
import dev.d34dc0de.lhish.mapping.parameter.ItemCreationParameters;
import dev.d34dc0de.lhish.model.Item;
import dev.d34dc0de.lhish.model.Template;
import dev.d34dc0de.lhish.service.MapperService;
import dev.d34dc0de.lhish.service.TemplateService;
import dev.d34dc0de.lhish.view.ItemListView;
import dev.d34dc0de.lhish.view.ItemView;
import dev.d34dc0de.lhish.view.ValueFieldView;
import dev.d34dc0de.lhish.view.view_factory.ValueFieldViewFactory;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ItemMapper implements Mapper {

    private static TemplateService templateService;

    private static MapperService mapperService;

    public ItemMapper(TemplateService templateService, @Lazy MapperService mapperService) {
        ItemMapper.templateService = templateService;
        ItemMapper.mapperService = mapperService;
    }

    @MappingMethod
    public static ItemView toView(Item item) {
        List<ValueFieldView> fields;

        if(item.getTemplateId() != null) {
            Template template = templateService.getById(item.getTemplateId());

            fields =  template.getValueFields().stream()
                    .map(t -> mapperService.map(t, ValueFieldView.class))
                    .toList();
        } else {
            fields = List.of();
        }

        return ItemView.builder()
                .id(item.getId())
                .name(item.getName())
                .description(item.getDescription())
                .imageId(item.getImageId())
                .historyId(item.getHistoryId())
                .fields(fields)
                .build();
    }

    @MappingMethod
    @MappingMethodListSource(Item.class)
    public static ItemListView toItemListView(List<Item> items) {
        return ItemListView.builder()
                .items(items.stream().map(ItemMapper::toView).toList())
                .build();
    }

    @MappingMethod
    public static Item toItem(ItemCreationParameters itemCreationParameters) {

        if (itemCreationParameters.imageId() == null) {
            throw new NullFieldException("Image cannot be null");
        }

        return Item.builder()
                .userId(itemCreationParameters.userId())
                .categoryId(itemCreationParameters.itemCreationForm().categoryId())
                .name(itemCreationParameters.itemCreationForm().name())
                .description(itemCreationParameters.itemCreationForm().description())
                .imageId(itemCreationParameters.imageId())
                .historyId(itemCreationParameters.historyId())
                .templateId(itemCreationParameters.templateId())
                .build();
    }


}
