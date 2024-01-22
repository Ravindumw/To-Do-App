package lk.project.app.to;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import javax.validation.groups.Default;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TaskTO implements Serializable {
    @Null(message = "Id should be empty")
    private Integer id;
    @NotBlank(message = "Description can't be empty")
    private String description;
    @Null(message = "Status should be empty", groups = Create.class) // create
    @NotNull(message = "Status should be empty", groups = Update.class) // update
    private Boolean status;
    @NotEmpty(message = "Email can't be empty")
    @Email
    private String email;

    public interface Update extends Default {}
    public interface Create extends Default {}
}
