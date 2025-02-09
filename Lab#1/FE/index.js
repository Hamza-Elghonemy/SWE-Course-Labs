function fetchEmployees() {
  fetch('http://localhost:3000/api/v1/employee')
    .then(response => response.json())
    .then(data => {
      const tableBody = document.getElementById('dataTable');
      tableBody.innerHTML = ''; // Clear previous rows
      const list = data.data;

      list.forEach(item => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.textContent = item.id;
        row.appendChild(idCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        row.appendChild(nameCell);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.dataset.id = item.id; // Store the employee ID in a data attribute
        deleteButton.addEventListener('click', deleteEmployee); // Attach event listener
        deleteCell.appendChild(deleteButton);

        row.appendChild(deleteCell);
        tableBody.appendChild(row);
      });
    })
    .catch(error => console.error(error));
}

// Add event listener to submit button
document.getElementById("submitbutton").addEventListener('click', createEmployee);

function createEmployee() {
  const create_id = document.getElementById("id").value;
  const create_name = document.getElementById("name").value;

  fetch('http://localhost:3000/api/v1/employee/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: create_id, name: create_name }),
  })
  .then(response => response.json())
  .then(() => fetchEmployees()) // Refresh employee list after adding
  .catch(error => console.error(error));
}

function deleteEmployee(event) {
  const id = event.target.dataset.id; 

  fetch(`http://localhost:3000/api/v1/employee/${id}`, {  
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    }
  })
  .then(response => response.json())
  .then(() => fetchEmployees()) // 
  .catch(error => console.error(error));
}

// Fetch employees on page load
fetchEmployees();
