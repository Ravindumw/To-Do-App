import { Router } from "express";
const controller = Router();
controller.get('/', (req, res) => {
    res.send("<h1>Customer Controller: Get</h1>");
});
controller.post('/', (req, res) => {
    res.send("<h1>Customer Controller: Post</h1>");
});
controller.patch('/', (req, res) => {
    res.send("<h1>Customer Controller: Patch</h1>");
});
controller.delete('/', (req, res) => {
    res.send("<h1>Customer Controller: Delete</h1>");
});
export { controller as TaskHttpController };
//# sourceMappingURL=TaskHttpController.js.map