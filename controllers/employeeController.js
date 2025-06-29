import Employee from "../models/employee.js";

// CREATE - Save new employee
// Create a new employee
export async function saveEmployee(req, res) {
  try {
    // Default ID
    let employeeId = "EMP00001";

    // Find the latest employee by creation date
    const lastEmployee = await Employee.find().sort({  _id: -1}).limit(1);

    if (lastEmployee.length > 0) {
      const lastId = lastEmployee[0].employeeId;  // "EMP00051"
      const numberPart = parseInt(lastId.replace("EMP", ""));  // 51
      const newNumber = numberPart + 1;
      const newId = String(newNumber).padStart(5, "0");  // "00052"
      employeeId = "EMP" + newId;  // "EMP00052"
    }

    // Create employee
    const employee = new Employee({
      employeeId,
      ...req.body
    });

    const savedEmployee = await employee.save();

    res.json({
      message: "Employee added successfully",
      employee: savedEmployee,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add employee",
      error: error.message,
    });
  }
}

// READ - Get all employees
export async function getEmployees(req, res) {
  try {
    const employees = await Employee.find().sort({  _id: 1});
    res.json(employees);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch employees",
      error: error.message,
    });
  }
}

// READ - Get single employee by employeeId
export async function getEmployeeById(req, res) {
  const empId = req.params.employeeId;

  try {
    const employee = await Employee.findOne({ employeeId: empId });

    if (!employee) {
      res.status(404).json({
        message: "Employee not found",
      });
      return;
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({
      message: "Failed to find employee",
      error: error.message,
    });
  }
}

// UPDATE - Update employee
export async function updateEmployee(req, res) {
  const empId = req.params.employeeId;
  const updatedData = req.body;

  try {
    const result = await Employee.updateOne({ employeeId: empId }, updatedData);

    if (result.matchedCount === 0) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    res.json({
      message: "Employee updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update employee",
      error: error.message,
    });
  }
}

// DELETE - Delete employee
export async function deleteEmployee(req, res) {
  const empId = req.params.employeeId;

  try {
    const result = await Employee.deleteOne({ employeeId: empId });

    if (result.deletedCount === 0) {
      res.status(404).json({ message: "Employee not found" });
      return;
    }

    res.json({
      message: "Employee deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete employee",
      error: error.message,
    });
  }
}

// SEARCH - Search employees by name, position, or department
export async function searchEmployee(req, res) {
  const query = req.params.query;

  try {
    const employees = await Employee.find({
      $or: [
        { employeeId: { $regex: query, $options: "i" } }, 
        { firstName: { $regex: query, $options: "i" } },
        { lastName: { $regex: query, $options: "i" } },
        { position: { $regex: query, $options: "i" } },
        { department: { $regex: query, $options: "i" } },

      ],
    });

    res.json(employees);
  } catch (error) {
    res.status(500).json({
      message: "Error in searching employees",
      error: error.message,
    });
  }
}
