import { Router } from "express";
const controller = Router();
controller.get('/', getAllTasks);
controller.post('/', saveTask);
controller.patch('/:id', updateTask);
controller.delete('/:id', deleteTask);
function getAllTasks(req, res) {
    res.send("<h1>Task Controller: Get</h1>");
}
function saveTask(req, res) {
    res.send("<h1>Task Controller: Post</h1>");
}
function updateTask(req, res) {
    res.send("<h1>Task Controller: Patch</h1>");
}
function deleteTask(req, res) {
    res.send("<h1>Task Controller: Delete</h1>");
}
export { controller as TaskHttpController };
//# sourceMappingURL=task.http.controller.js.map