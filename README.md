# final-keep README - Sangyeob Han, sh4092

## Overview

This is a final-keep project, which clones google keep. Client is built in react, Server is built in express and connects with mondoDB Atlas.

## Getting Started

### Prerequisites

-   Node.js

-   .env file with DB_USERNAME and DB_PASSWORD, will provide it on zip file

### Running the Server

1.  **Move to server dir and setup .env**

2.  **Move to server dir and Install packages**

```bash

    npm install

```

3.  **Run server**

```bash

    npm run start

```

### Running the client

1.  **Move to client dir and Install packages**

```bash

    npm install

```

2.  **Run client**

```bash

    npm start

```

## File description for important files

### Server

**1. `server.js`**: Express server that handles request from the client.

-   `connect()`: Connects server and MongoDB
-   `app.get - /notes`: Fetches all notes stored in MongoDB and sends notes to the client
-   `app.post - /notes`: Get a new note from client and store it to MongoDB
-   `app.delete - /notes/:id`: Get a note to delete from client and delete that note in MongoDB based on \_id in the note object

**2. `.env`**: Holds DB_USERNAME, DB_PASSWORD value for MongoDB

**3. `.env.sample`**: Sample file for .env, since .env can't be public

### Client

**1. `Body.jsx`**: Component that manages body of the React App. Holds main logic and controls communication with the server.

-   `noteArray`: Array of all the notes, also a state which gets updated based on server interaction
-   `useEffect - fetch("/notes")`: Fetch notes from the server when noteArray gets updated
-   `handleDeleteButton`: Get an id from note to be deleted, sends a DELETE request to the server and remove deleted note from noteArray
-   `addNote`: get a title and content and sends POST request to the server. Update the noteArray with the new note.

**2. `InputForm.jsx`**: Handle user input(title, content) from the user and addNote method when submit button is clicked

-   `handleSubmit`: Handles user input and invoke addNote when button clicked. Prevents empty title and empty content

## Handling Empty Notes

Ways to prevent cases when the note with empty content or empty title is submitted.

### From Client

```javascript
// InputForm.jsx
const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== "" && content.trim() !== "") {
        addNote({ title, content });
        setTitle("");
        setContent("");
    }
};
```

### From Server

-   This will probably not invoked because empty note is already filtered from the client (InputForm.jsx)
-   But when invoked, server respond to client with 400 status code and "Title or content can't be empty" message. When clients receive the response from the server, it logs (console.error("Title or content can't be empty") on console.

```javascript
// server.js
app.post("/notes", async (req, res) => {
    const { title, content } = req.body;

    if (title.trim() === "" || content.trim() === "") {
        return res
            .status(400)
            .json({ message: "Title or content can't be empty" });
    }
    try {
        const newNote = new Note({ title, content });
        await newNote.save();
        console.log("Add complete: ", newNote);
        res.status(201).json(newNote);
    } catch (e) {
        console.error(e);
        res.status(500).send(e);
    }
});

// Body.jsx

const addNote = (newNote) => {
    fetch("/notes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
    })
        .then((res) => {
            if (res.status === 400) {
                throw new Error("Title or content can't be empty");
            }
            return res.json();
        })
        .then((addedNote) => {
            setNotes([...noteArray, addedNote]);
        })
        .catch((e) => console.error(e));
};
```

## Sample format for MongoDB document

```json
{
    "_id": {
        "$oid": "657cef0eb7258db2862ec1f8"
    },
    "title": "This is title",
    "content": "This is content",
    "__v": {
        "$numberInt": "0"
    }
}
```
