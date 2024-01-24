import { Router } from "express";
const controller = Router();
controller.get('/', (req, res) => {
    res.send("<h1>Task Controller: Get</h1>");
});
controller.post('/', (req, res) => {
    res.send("<h1>Task Controller: Post</h1>");
});
controller.patch('/:id', (req, res) => {
    res.send("<h1>Task Controller: Patch</h1>");
});
controller.delete('/:id', (req, res) => {
    res.send("<h1>Task Controller: Delete</h1>");
});
export { controller as TaskHttpController };
//# sourceMappingURL=task.http.controller.js.map