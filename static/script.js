document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("search");
    const suggestionsList = document.getElementById("suggestions");
    let debounceTimeout;

    const fetchSuggestions = async (query) => {
        const response = await fetch(`/suggest?q=${query}`);
        const suggestions = await response.json();
        suggestionsList.innerHTML = suggestions
            .map(item => `
                <li>
                    <strong>${item.name}</strong><br>
                    <em>in ${item.category}</em><br>
                </li>`)
            .join("");
    };

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.trim();
        clearTimeout(debounceTimeout);

        if (query.length >= 2) {
            debounceTimeout = setTimeout(() => {
                fetchSuggestions(query);
            }, 300);
        } else {
            suggestionsList.innerHTML = "";
        }
    });
});
