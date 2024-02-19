This project leverages the PokéApi to bring all existing Pokémon and their data to life. 

## Features

### Locations

- The site displays the first 20 locations retrieved from PokéApi.
- Users can select a location to find a random Pokémon and start an encounter.

### Pokémon Encounters

- Upon selecting a location, the game finds a random Pokémon in that location, and an encounter starts.
- If a location does not have any Pokémon, the site will display a message: "This location doesn't seem to have any Pokémon" along with a button to return to the list of locations.

### The Battle

- Users can pick one of their own Pokémon to fight against the encountered Pokémon.
- The battle mechanics are based on Pokémon's HP, Attack, and Defense stats, with damage calculated using a specific formula.

### Capturing Pokémon

- If the opponent Pokémon's HP reaches 0 while the user's Pokémon still has positive HP, the encountered Pokémon is captured and added to the user's list of Pokémon.
- If the user's Pokémon's HP reaches 0 first, the encounter ends, and the list of locations is displayed again for further exploration.

## Getting Started

To get started with this project, clone this repository and follow the setup instructions in the `setup.md` file. Ensure you have Node.js and npm installed to manage dependencies and run the project.

## Contributing

Feel free to contribute to this project by submitting pull requests or suggesting new features or improvements.

Happy exploring and battling!
