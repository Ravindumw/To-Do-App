package lk.project.app.api;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import lk.project.app.to.TaskTO;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.annotation.PreDestroy;
import javax.validation.Valid;
import javax.validation.groups.Default;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tasks")
public class TaskHttpController {

    private final HikariDataSource pool;
    public TaskHttpController() {
        HikariConfig config = new HikariConfig();
        config.setUsername("postgres");
        config.setPassword("Ravindu123");
        config.setJdbcUrl("jdbc:postgresql://localhost:5432/project_todo_app");
        config.setDriverClassName("org.postgresql.Driver");
        config.addDataSourceProperty("maximumPoolSize",10);
        pool = new HikariDataSource(config);
    }


    @PreDestroy
    public void destroy(){
        pool.close();
    }

    /*
          The schema object defines the content of the request and response. In other words,
          it refers to the definition and set of rules (validation rules) for representing
          the structure of API data
      */
    @ResponseStatus(HttpStatus.CREATED)
    @PostMapping(produces = "application/json", consumes = "application/json")
    public TaskTO createTask(@RequestBody @Validated(TaskTO.Create.class) TaskTO task){
        System.out.println("createTask");
        return null;
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id){
        System.out.println("DeleteMapping");
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PatchMapping(value = "/{id}" , consumes = "application/json")
    public void updateTask(@PathVariable("id") String taskId,
                           @RequestBody @Validated(TaskTO.Update.class) TaskTO task){
        System.out.println("updateTask");
    }

    @GetMapping(produces = "application/json")
    public List<TaskTO> getAllTasks(){
        System.out.println("getAllTasks");
        return new ArrayList<>();
    }

}
