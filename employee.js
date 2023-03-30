const fs = require("fs");

let EMPLOYEE_DATA = "employees.json";

async function getAllEmployees() {
  let data = await fs.promises.readFile(EMPLOYEE_DATA, { encoding: "utf-8" });
  data = JSON.parse(data);
  return data;
}

getAllEmployees();
async function findEmployeeById(id) {
  let employees = await fs.promises.readFile(EMPLOYEE_DATA, {
    encoding: "utf8",
  });
  employees = JSON.parse(employees);
  let employee = employees.find((emp) => emp.id === id);
  return employee;
}

async function addNewEmployee(data) {
  let employees = await getAllEmployees();
  let max = 0;

  for (const emp of employees) {
    max = Math.max(emp.id, max);
  }

  let newEmployee = {
    id: max + 1,
    name: data.name,
    age: data.age,
    designation: data.designation,
  };

  employees.push(newEmployee);

  updateFile(employees);
  return newEmployee;
}

async function updateFile(data) {
  const content = JSON.stringify(data, null, 4);
  fs.writeFileSync(EMPLOYEE_DATA, content, {
    encoding: "utf-8",
  });
}

async function updateEmployeeById(id, data) {
  let employees = await getAllEmployees();
  let index = -1;
  let updateEmployee = employees.find((emp, idx) => {
    if (emp.id === id) {
      index = idx;
      return true;
    }
  });

  if (!updateEmployee) {
    return null;
  }

  updateEmployee = {
    ...updateEmployee,
    name: data.name,
    age: data.age,
    designation: data.designation,
  };

  employees[index] = updateEmployee;
  updateFile(employees);
  return updateEmployee;
}

async function deleteEmployeeById(id) {
  let employees = await fs.promises.readFile(EMPLOYEE_DATA, {
    encoding: "utf8",
  });
  employees = JSON.parse(employees);

  let index = -1;

  let deleteEmp = employees.find((emp, arrIdx) => {
    if (emp.id === id) {
      index = arrIdx;
      return true;
    }
  });

  if (index == -1) {
    return null;
  }

  employees.splice(index, 1);
  updateFile(employees);
  return deleteEmp;
}

module.exports = {
  getAllEmployees,
  addNewEmployee,
  findEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
};
