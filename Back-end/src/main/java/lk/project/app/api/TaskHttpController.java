package lk.project.app.api;

import lk.project.app.to.TaskTO;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tasks")
public class TaskHttpController {
    @PostMapping
    public TaskTO createTask(@RequestBody String description){
        System.out.println("createTask");
        return new TaskTO(1,description, false);
    }

    @GetMapping
    public List<TaskTO> getAllTasks(){
        System.out.println("getAllTasks");
        return new ArrayList<>();
    }

    @PatchMapping("/{id}")
    public void updateTask(@RequestBody Map<String,String> params,
                           @PathVariable("id") String taskId){
        System.out.println("updateTask");
    }

    @DeleteMapping("/{id}")
    public void deleteTask(@PathVariable String id){
        System.out.println("DeleteMapping");
    }

}
