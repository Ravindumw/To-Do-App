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
import java.sql.*;
import java.util.ArrayList;
import java.util.LinkedList;
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
    public TaskTO createTask(@RequestBody @Validated TaskTO task){
        try (Connection connection = pool.getConnection()){
            PreparedStatement stm = connection.
                    prepareStatement("INSERT INTO task (description, status) VALUES (?, FALSE)", Statement.RETURN_GENERATED_KEYS);
            stm.setString(1,task.getDescription());
            stm.executeUpdate();
            ResultSet generatedKeys = stm.getGeneratedKeys();
            generatedKeys.next();
            int id = generatedKeys.getInt(1);
            task.setId(id);
            task.setStatus(false);
            return task;
        }catch (SQLException e){
            throw new RuntimeException(e);
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @PatchMapping(value = "/{id}" , consumes = "application/json")
    public void updateTask(@PathVariable("id") int taskId,
                           @RequestBody @Validated(TaskTO.Update.class) TaskTO task){
        try (Connection connection = pool.getConnection()){
            PreparedStatement stmExist = connection.prepareStatement("SELECT * FROM task WHERE id = ?");
            stmExist.setInt(1,taskId);
            if(!stmExist.executeQuery().next()){
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found");
            }

            PreparedStatement stm = connection.prepareStatement("UPDATE task SET  description = ?, status = ? WHERE id = ?");
            stm.setString(1, task.getDescription());
            stm.setBoolean(2,task.getStatus());
            stm.setInt(3,taskId);
            stm.executeUpdate();
        }catch (SQLException e){
            throw new RuntimeException(e);
        }
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable int id){
        try (Connection connection = pool.getConnection()) {
            PreparedStatement stmExist = connection.prepareStatement("SELECT * FROM task WHERE id = ?");
            stmExist.setInt(1, id);
            if (!stmExist.executeQuery().next()) {
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found");
            }
            PreparedStatement stm = connection.prepareStatement("DELETE FROM task WHERE id = ?");
            stm.setInt(1, id);
            stm.executeUpdate();
        }catch (SQLException e){
            throw new RuntimeException(e);
        }
    }

    /* @ResponseStatus(HttpStatus.OK) */
    @GetMapping(produces = "application/json")
    public List<TaskTO> getAllTasks(){
        try (Connection connection = pool.getConnection()){
            Statement stm = connection.createStatement();
            ResultSet rst = stm.executeQuery("SELECT * FROM task ORDER BY id");
            List<TaskTO> taskList = new LinkedList<>();
            while (rst.next()){
                int id = rst.getInt("id");
                String description = rst.getString("description");
                boolean status = rst.getBoolean("status");
                taskList.add(new TaskTO(id,description,status));
            }
            return taskList;
        }catch (SQLException e){
            throw new RuntimeException(e);
        }
    }

}
