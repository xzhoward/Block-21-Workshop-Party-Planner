const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/events";
const partyList = document.getElementById("party-list");
const form = document.getElementById("party-form");

async function fetchParties() {
  const res = await fetch(API_URL);
  const data = await res.json();
  renderParties(data.data);
}

// Render parties
function renderParties(parties) {
  partyList.innerHTML = "";
  parties.forEach(party => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${party.name}</h3>
      <p>${new Date(party.date).toLocaleString()}</p>
      <p><strong>Location:</strong> ${party.location}</p>
      <p>${party.description || ""}</p>
      <button data-id="${party.id}">Delete</button>
    `;
    div.querySelector("button").addEventListener("click", () => deleteParty(party.id));
    partyList.appendChild(div);
  });
}

// Add new party
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const newParty = {
    name: formData.get("name"),
    date: formData.get("date"),
    location: formData.get("location"),
    description: formData.get("description")
  };

  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newParty)
  });

  form.reset();
  fetchParties();
});

// Delete a party
async function deleteParty(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
  fetchParties();
}

// Initialize
fetchParties();
