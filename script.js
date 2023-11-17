document.addEventListener("DOMContentLoaded", function () {
  const searchForm = document.getElementById("search-form");
  const resultContainer = document.getElementById("result-container");

  searchForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const searchInput = document.getElementById("search-input").value.trim();
    if (searchInput !== "") {
      // Call the Blockchair API to get transaction details
      const apiUrl = `https://api.blockchair.com/bitcoin/dashboards/${searchInput}`;

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          // Process and display the transaction details
          displayTransactionDetails(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          resultContainer.innerHTML =
            "<p>Error fetching data. Please try again.</p>";
        });
    }
  });

  function displayTransactionDetails(data) {
    resultContainer.innerHTML = "";

    if (data && data.data) {
      const transactionDetails = data.data[0];

      const detailsList = document.createElement("ul");
      for (const [key, value] of Object.entries(transactionDetails)) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${key}:</strong> ${value}`;
        detailsList.appendChild(listItem);
      }

      resultContainer.appendChild(detailsList);
    } else {
      resultContainer.innerHTML = "<p>No data found for the given search.</p>";
    }
  }
});
