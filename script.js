// DOM element where machinery will be displayed
const machineryList = document.getElementById('machinery-list');
const searchInput = document.getElementById('search');
const resetButton = document.getElementById('reset-button'); // Add this line

// Fetch data from db.json
fetch('http://localhost:3000/machinery')
  .then(response => response.json())
  .then(data => {
    displayMachinery(data); // Store data for later use
    resetButton.addEventListener('click', () => {
      searchInput.value = ''; // Clear the search input
      displayMachinery(data);  // Display all machinery
    });
  });

// Function to display the machinery items
function displayMachinery(machinery) {
  machineryList.innerHTML = ''; // Clear previous content
  machinery.forEach(item => {
    const card = document.createElement('div');
    card.className = 'machinery-card';

    // Create the rent button
    const rentButton = document.createElement('button');
    rentButton.textContent = 'Rent';
    rentButton.className = 'rent-button';

    // Add event listener for renting the machinery
    rentButton.addEventListener('click', () => {
      alert(`You have rented the ${item.name}!`);
    });

    // Add the image, name, price, and availability
    card.innerHTML = `
      <img src="${item.image_url}" alt="${item.name}" class="machinery-image">
      <h2>${item.name}</h2>
      <p>Price per day: ${item.price_per_day}</p>
      <p>${item.available ? "Available" : "Not Available"}</p>
    `;

    // Append the rent button to the card
    card.appendChild(rentButton);

    // Append the card to the machinery list
    machineryList.appendChild(card);
  });
}

// Search functionality
searchInput.addEventListener('input', (e) => {
  const searchTerm = e.target.value.toLowerCase();
  fetch('http://localhost:3000/machinery')
    .then(response => response.json())
    .then(data => {
      const filteredMachinery = data.filter(item => item.name.toLowerCase().includes(searchTerm));
      displayMachinery(filteredMachinery);
    });
});


const darkModeToggle = document.getElementById('dark-mode-toggle');

darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});





// Function to display the machinery items
function displayMachinery(machinery) {
  machineryList.innerHTML = ''; // Clear previous content
  machinery.forEach(item => {
    const card = document.createElement('div');
    card.className = 'machinery-card';

    // Create the rent button
    const rentButton = document.createElement('button');
    rentButton.textContent = 'Rent';
    rentButton.className = 'rent-button';

    // Check if the machinery is available
    if (!item.available) {
      rentButton.disabled = true; // Disable the button
      rentButton.classList.add('disabled'); // Add a class to style the disabled button
    }

    // Add event listener for renting the machinery if available
    rentButton.addEventListener('click', () => {
      if (item.available) {
        alert(`You have rented the ${item.name}!`);
      }
    });

    // Add the image, name, price, and availability
    card.innerHTML = `
      <img src="${item.image_url}" alt="${item.name}" class="machinery-image">
      <h2>${item.name}</h2>
      <p>Price per day: ${item.price_per_day}</p>
      <p>${item.available ? "Available" : "Not Available"}</p>
    `;

    // Append the rent button to the card
    card.appendChild(rentButton);

    // Append the card to the machinery list
    machineryList.appendChild(card);
  });
}
