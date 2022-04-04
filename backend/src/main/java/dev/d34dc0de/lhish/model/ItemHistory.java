package dev.d34dc0de.lhish.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
public class ItemHistory {
    @Id
    private String id;
    private List<ItemHistoryEntry> entries;
}
