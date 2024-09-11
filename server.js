const express = require('express');
const mongoose = require('mongoose');
const PokemonList = require('./models/pokemodel'); // Updated model
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes

// Basic home route
app.get('/', (req, res) => {
    res.send('Welcome to the Pokémon API');
});

// GET all Pokémon lists (paginated lists of Pokémon)
app.get('/pokemon', async (req, res) => {
    try {
        const pokemonLists = await PokemonList.find({});
        res.status(200).json(pokemonLists);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET a specific Pokémon list by ID
app.get('/pokemon/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pokemonList = await PokemonList.findById(id);
        if (!pokemonList) {
            return res.status(404).json({ message: `No Pokémon list found with ID ${id}` });
        }
        res.status(200).json(pokemonList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST a new Pokémon list (create)
app.post('/pokemon', async (req, res) => {
    try {
        const pokemonList = await PokemonList.create(req.body);
        res.status(201).json(pokemonList);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// UPDATE a specific Pokémon list by ID (PATCH)
app.patch('/pokemon/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pokemonList = await PokemonList.findByIdAndUpdate(id, req.body, { new: true });
        if (!pokemonList) {
            return res.status(404).json({ message: `No Pokémon list found with ID ${id}` });
        }
        res.status(200).json(pokemonList);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE a specific Pokémon list by ID
app.delete('/pokemon/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pokemonList = await PokemonList.findByIdAndDelete(id);
        if (!pokemonList) {
            return res.status(404).json({ message: `No Pokémon list found with ID ${id}` });
        }
        res.status(200).json({ message: 'Pokémon list deleted successfully', data: pokemonList });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// MongoDB connection and server setup
mongoose.set("strictQuery", false);
mongoose
    .connect('mongodb+srv://r73310668:abc00123@pokemon.maz1b.mongodb.net/?retryWrites=true&w=majority&appName=pokemon')
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(3000, () => {
            console.log('Node API app is running on port 3000');
        });
    })
    .catch((error) => {
        console.log(error);
    });
    