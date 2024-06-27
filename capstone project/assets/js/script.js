// Function to fetch  API
async function fetchCryptoData() {
  try {
    const response = await
      fetch('https://api.coinranking.com/v2/coins');
    const data = await response.json();
    return data.data.coins;
  } catch (error) {
    console.error('Error fetching cryptocurrency data:', error);
    return [];
  }
}

// Function to display cryptocurrency table
function displayCryptoData(coins) {
  const cryptoTable = document.getElementById('cryptoTable');
  cryptoTable.innerHTML = '';

  coins.forEach(coin => {
    const row = document.createElement('tr');
    row.innerHTML = `
    <td><a href="index.html"><img src="${coin.iconUrl}"
    class="crypto-logo" alt="${coin.name}"></a></td>
      <td><a href="./assets1/index.html">${coin.name}</a></td>
      <td><a href="./assets1/index.html">${coin.symbol}</a></td>
      <td><a href="./assets1/index.html">$${coin.price}</a></td>
      <td><a href="./assets1/index.html">${coin.change}%</a></td>
      <td><a href="./assets1/index.html">${coin.volume ? coin.volume : '-'}</a></td>
      <td><a href="./assets1/index.html">${coin.marketCap ? coin.marketCap : '-'}</a></td>
    `;
    cryptoTable.appendChild(row);
  });
}

// Function to filter cryptocurrencies 
function filterCryptoData(coins, searchTerm) {
  searchTerm = searchTerm.toLowerCase();

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(searchTerm) ||
    coin.symbol.toLowerCase().includes(searchTerm)
  );

  return filteredCoins;
}

// Function to handle search input
function handleSearchInput() {
  const searchInput = document.getElementById('searchInput');
  const searchTerm = searchInput.value.trim();

  fetchCryptoData().then(coins => {
    const filteredCoins = filterCryptoData(coins,
      searchTerm);
    displayCryptoData(filteredCoins);
  });
}

// Function to initialize the app
async function initializeApp() {
  const coins = await fetchCryptoData();
  displayCryptoData(coins);

  // Add event listener to search input
  const searchInput = 
    document.getElementById('searchInput');
  searchInput.addEventListener('input',
    handleSearchInput);
}

// Call initializeApp function
// when the DOM content is loaded
document.addEventListener('DOMContentLoaded'
  , initializeApp);
