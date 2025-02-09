var employee = [
  { id: '1', name: 'Mohamed Sayed' },
];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
// DELETE Employee
exports.deleteEmployee = (req, res) => {
  const { id } = req.params; // Extract ID from URL params
  employee = employee.filter(emp => emp.id !== id); // Remove employee
  res.status(200).json({ data: employee });
};

// TODO
exports.createEmployee = async (req, res, next) => {
  employee.push({ id: req.body.id, name: req.body.name });
};
