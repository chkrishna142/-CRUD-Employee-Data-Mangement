const express = require("express");
const app = express();
const port = 3000;
let {
  getAllEmployees,
  findEmployeeById,
  addNewEmployee,
  updateEmployeeById,
  deleteEmployeeById,
} = require("./employee.js");

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <div> 
      <h1> EMPLOYEE DATA MANAGEMENT </h1>
      <h2> Req Type: GET,    Endpoint: localhost:3000/employee => See All employees data  </h2>
      <h2> Req Type: GET,    Endpoint: localhost:3000/employee/7 => See single employee data  </h2>
      <h2> Req Type: POST,   Endpoint: localhost:3000/employee => Add a new employee details </h2>
      <h2> Req Type: PATCH,  Endpoint: localhost:3000/employee/7 => Update employee details </h2>
      <h2> Req Type: DELETE, Endpoint: localhost:3000/employee/7 => Delete employee from list</h2>
    </div>
  `);
});

app.get("/employee", async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.send({
      data: employees,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send("Something wrong...");
  }
});

app.post("/employee", async (req, res) => {
  try {
    const data = req.body;

    const employees = await addNewEmployee(data);

    return res.send({
      data: employees,
    });
  } catch (error) {
    return res.send("Something wrong...");
  }
});

app.patch("/employee/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let data = req.body;

  try {
    const employees = await updateEmployeeById(id, data);

    if (employees) {
      res.send({
        data: employees,
      });
    } else {
      res.status(404).send({
        error: "Employee is not availble",
      });
    }
  } catch (err) {
    console.log("patch err: ", err);
  }
});

app.get("/employee/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  
  try {
    let employee = await findEmployeeById(id);

    if (employee) {
      return res.send({
        data: employee,
      });
    } else {
      return res.status(404).send({
        error: "Employee is not availble",
      });
    }
  } catch (error) {
    console.log(error);
    return res.send("Something wrong...");
  }
});

app.delete("/employee/:id", async (req, res) => {
  let id = parseInt(req.params.id);

  try {
    let empDelete = await deleteEmployeeById(id);
    console.log(empDelete, "ee");
    if (empDelete) {
      return res.send({
        data: empDelete,
      });
    } else {
      return res.status(404).send({
        error: "Employee not availble for deleting",
      });
    }
  } catch (error) {
    console.log(error);
    return res.send("Something wrong...");
  }
});

app.get("*", (req, res) => {
  res.send("<h1> Check url </h1>");
});

app.listen(port, () => {
  console.log(`server listen on port ${port}`);
});
