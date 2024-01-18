package lk.project.app.to;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskTO implements Serializable {
    private Integer id;
    private String description;
    private Boolean status;
}
