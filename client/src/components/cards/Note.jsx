import React from "react";

export default function Note({ note, hanleDeleteButton }) {
    return (
        <div className="note">
            <h1 className="title">{note.title}</h1>
            <p className="content">{note.content}</p>
            <div className="button-container">
                <button className="button" onClick={hanleDeleteButton}>
                    Delete
                </button>
            </div>
        </div>
    );
}
