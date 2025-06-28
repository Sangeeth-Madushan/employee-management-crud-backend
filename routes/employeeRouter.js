import express from "express";
import { deleteEmployee, getEmployeeById, getEmployees,  saveEmployee, searchEmployee, updateEmployee} from "../controllers/employeeController.js";

const employeeRouter = express.Router();

employeeRouter.post("/",saveEmployee );
employeeRouter.get("/", getEmployees);
employeeRouter.get("/:employeeId", getEmployeeById);
employeeRouter.put("/:employeeId", updateEmployee);
employeeRouter.delete("/:employeeId", deleteEmployee);
employeeRouter.get("/search/:query", searchEmployee);

export default employeeRouter;
