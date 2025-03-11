document.addEventListener("DOMContentLoaded", () => {
    const API_URL = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/events";
    const partyList = document.getElementById("party-list");
    const partyForm = document.getElementById("party-form");

    // Fetch and display parties
    function fetchParties() {
        fetch(API_URL)
            .then(response => response.json())
            .then(parties => {
                partyList.innerHTML = "";
                parties.forEach(party => renderParty(party));
            })
            .catch(error => console.error("Error fetching parties:", error));
    }

    function renderParty(party) {
        const li = document.createElement("li");
        li.innerHTML = `
            <h2>${party.name}</h2>
            <p>${party.date} @ ${party.time}</p>
            <p>Location: ${party.location}</p>
            <p>${party.description}</p>
            <button class="delete-btn" data-id="${party.id}">Delete</button>
        `;
        partyList.appendChild(li);
    }

    // Add new party
    partyForm.addEventListener("submit", event => {
        event.preventDefault();
        const formData = new FormData(partyForm);
        const newParty = Object.fromEntries(formData);

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newParty)
        })
        .then(response => response.json())
        .then(addedParty => {
            renderParty(addedParty);
            partyForm.reset();
        })
        .catch(error => console.error("Error adding party:", error));
    });

    // Delete a party
    partyList.addEventListener("click", event => {
        if (event.target.classList.contains("delete-btn")) {
            const id = event.target.getAttribute("data-id");
            fetch(`${API_URL}/${id}`, { method: "DELETE" })
                .then(() => event.target.parentElement.remove())
                .catch(error => console.error("Error deleting party:", error));
        }
    });

    fetchParties();
});
