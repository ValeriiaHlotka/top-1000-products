document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const suggestionsList = document.getElementById("suggestions");

    searchInput.addEventListener("input", async () => {
        const query = searchInput.value.trim();
        if (query.length < 2) {
            suggestionsList.innerHTML = "";
            return;
        }

        const response = await fetch(`/suggest?q=${query}`);
        const suggestions = await response.json();

        suggestionsList.innerHTML = suggestions
            .map(item => `<li>${item.name}</li>`)
            .join("");
    });
});
