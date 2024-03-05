import React from 'react';

// Define an interface for the component props
interface EditorProps {
    tempEntryText: string;
    setTempEntryText: (text: string) => void;
}

const Editor: React.FC<EditorProps> = ({ tempEntryText, setTempEntryText }) => {
    return (
        <section className="pane editor">
            <textarea
                className="text-input" // Use a class to style your textarea
                value={tempEntryText}
                onChange={(e) => setTempEntryText(e.target.value)}
                placeholder="Enter your note here..."
                style={{ minHeight: '80vh' }} // Inline styles for height or you can use a CSS class
            />
        </section>
    );
}

export default Editor;
