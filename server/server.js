require("dotenv").config();

const express = require("express");
const { default: mongoose } = require("mongoose");
const app = express();

app.use(express.json());

//connect to mongodb
const mongodburi = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.f2g4ftd.mongodb.net/keep?retryWrites=true&w=majority`;
async function connect() {
    try {
        await mongoose.connect(mongodburi);
        console.log("connected to mongoDB");
    } catch (e) {
        console.error(e);
    }
}
connect();

//create schema for each notes
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});
const Note = mongoose.model("Note", noteSchema);

app.get("/notes", async (req, res) => {
    try {
        const notes = await Note.find();
        res.json({ notes });
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

app.post("/notes", async (req, res) => {
    const { title, content } = req.body;

    try {
        const newNote = new Note({ title, content });
        await newNote.save();
        res.status(201).json(newNote);
    } catch {
        console.error(e);
        res.status(500).send(e);
    }
});

app.delete("/notes/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNote = await Note.findByIdAndDelete(id);
        res.status(200).json(deletedNote);
    } catch {
        console.error(e);
        res.status(500).send(e);
    }
});

app.listen(5001, () => {
    console.log("Server started on port 5001");
});
