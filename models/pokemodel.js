const mongoose = require('mongoose');

// Define a schema for the individual Pokémon data
const pokemonSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter a Pokémon name"]
        },
        url: {
            type: String,
            required: [true, "Please enter a Pokémon URL"]
        }
    }
);

// Define the main schema for the Pokémon list, including pagination fields
const pokemonListSchema = mongoose.Schema(
    {
        count: {
            type: Number,
            required: true
        },
        next: {
            type: String, // URL for the next page
            required: false
        },
        previous: {
            type: String, // URL for the previous page
            required: false
        },
        results: {
            type: [pokemonSchema], // Array of Pokémon objects
            required: true
        }
    },
    {
        timestamps: true
    }
);

const PokemonList = mongoose.model('PokemonList', pokemonListSchema);

module.exports = PokemonList;