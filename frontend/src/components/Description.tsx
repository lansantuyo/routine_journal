import React, { useState } from 'react';
import { Text, Input } from '@mantine/core';

interface DescriptionProps {
    description: string;
    onDescriptionChange: (newDescription: string) => void;
}

function Description({ description, onDescriptionChange }: DescriptionProps) {
    const [editing, setEditing] = useState(false);
    const [editedDescription, setEditedDescription] = useState(description);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedDescription(e.target.value);
    };

    const handleInputBlur = () => {
        // Save the edited description when the user clicks on outside the box
        onDescriptionChange(editedDescription);
        setEditing(false);
    };

    const handleTextClick = () => {
        // Clear the text box when clicked on
        if (!editing && description === "add a description") {
            setEditedDescription("");
        }
        setEditing(true);
    };

    return (
        <div>
            <Text>Activity Description:</Text>
            {editing ? (
                <Input
                    value={editedDescription}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    autoFocus
                />
            ) : (
                <Text onClick={handleTextClick}>{description}</Text>
            )}
        </div>
    );
}

export default Description;
