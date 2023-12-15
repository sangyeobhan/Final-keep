import React, { useState } from "react";

export default function InputForm({ addNote }) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const updateTitle = (e) => {
        setTitle(e.target.value);
    };

    const updateContent = (e) => {
        setContent(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() !== "" && content.trim() !== "") {
            addNote({ title, content });
            setTitle("");
            setContent("");
        }
    };

    return (
        <form className="input-form" onSubmit={handleSubmit}>
            <input
                className="input-title"
                name="title"
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={updateTitle}
            />
            <textarea
                className="input-content"
                name="content"
                placeholder="Enter content..."
                value={content}
                onChange={updateContent}
            ></textarea>
            <div className="button-container">
                <button className="button">Add</button>
            </div>
        </form>
    );
}
