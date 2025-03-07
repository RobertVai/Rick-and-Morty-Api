const fetchCharacters = async () => {
  try {
    const charactersResponse = await fetch(
      "https://rickandmortyapi.com/api/character"
    );
    const charactersData = await charactersResponse.json();

    const characters = charactersData.results;

    characters.sort((a, b) => a.name.localeCompare(b.name));

    const charactersContainer = document.getElementById("characters-container");

    characters.forEach((character) => {
      const card = document.createElement("div");
      card.className = "character-card";

      const image = document.createElement("img");
      image.src = character.image;
      image.alt = character.name;

      const name = document.createElement("h2");
      name.textContent = character.name;

      const species = document.createElement("p");
      species.textContent = `Type: ${character.species}`;

      const origin = document.createElement("p");
      origin.textContent = `Origin: ${
        character.origin.name === "unknown" ? "-" : character.origin.name
      }`;

      card.appendChild(image);
      card.appendChild(name);
      card.appendChild(species);
      card.appendChild(origin);

      charactersContainer.appendChild(card);

      card.addEventListener("click", async () => {
        try {
          const characterResponse = await fetch(
            `https://rickandmortyapi.com/api/character/${character.id}`
          );
          const characterData = await characterResponse.json();

          console.log("Character info:", characterData);
        } catch (err) {
          console.log("Character info error:", err);
        }
      });
    });
  } catch (err) {
    console.log("Error:", err);
  }
};

const fetchLocations = async () => {
  try {
    const locationsResponse = await fetch(
      "https://rickandmortyapi.com/api/location"
    );
    const locationsData = await locationsResponse.json();

    const locations = locationsData.results;

    const locationCharacterCount = {};

    for (let i = 0; i < locations.length; i++) {
      const location = locations[i];
      locationCharacterCount[location.name] = location.residents.length;
    }

    let locationWithMostCharacters = "";
    let maxCharacters = 0;

    for (const location in locationCharacterCount) {
      if (locationCharacterCount[location] > maxCharacters) {
        maxCharacters = locationCharacterCount[location];
        locationWithMostCharacters = location;
      }
    }

    console.log(
      "Location with most characters:",
      locationWithMostCharacters,
      "Characters:",
      maxCharacters
    );
  } catch (err) {
    console.log("Characters location error:", err);
  }
};

fetchCharacters();
fetchLocations();
