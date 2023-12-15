import React, { useState, useEffect } from "react";
import InputForm from "./cards/InputForm";
import Note from "./cards/Note";

export default function Body() {
    const [noteArray, setNotes] = useState([]);

    useEffect(() => {
        fetch("/notes")
            .then((res) => res.json())
            .then((data) => {
                data = data.notes;
                console.log(data);
                setNotes(data);
            });
    }, []);

    const hanleDeleteButton = (key) => {
        const updatedNoteArray = noteArray.filter((note) => note.key !== key);
        setNotes(updatedNoteArray);
    };

    const addNote = (note) => {
        const updatedNoteArray = [...noteArray, { key: Date.now(), ...note }];
        setNotes(updatedNoteArray);
    };

    return (
        <div className="body">
            <InputForm addNote={addNote} />
            <div className="notes-container">
                {noteArray.map((note) => {
                    return (
                        <Note
                            key={note.key}
                            note={note}
                            hanleDeleteButton={() =>
                                hanleDeleteButton(note.key)
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
}
