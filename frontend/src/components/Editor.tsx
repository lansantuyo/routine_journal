import React, { ChangeEvent, useState } from 'react';

interface EditorProps {
    tempEntryText: string;
    setTempEntryText: (text: string) => void;
}

const Editor: React.FC<EditorProps> = ({ tempEntryText, setTempEntryText }) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setTempEntryText(e.target.value);
    };

    return (
        <section className="pane editor">
            <textarea
                className="markdown-input"
                value={tempEntryText}
                onChange={handleChange}
                style={{ width: '100%', height: '40vh', marginBottom: '20px' }}
            />
        </section>
    );
};

export default Editor;
