import { Modal, TextInput, Textarea, Button, Group, Autocomplete } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useEffect, useState } from 'react';
import api from "../api";

interface CreateActivityTypeModalProps {
    opened: boolean;
    onClose: () => void;
}

interface FormValues {
    name: string;
    description: string;
    category: string;
}

interface CategoryOption {
    value: number;
    label: string;
}

const CreateActivityTypeModal: React.FC<CreateActivityTypeModalProps> = ({ opened, onClose }) => {
    const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
    const [lastUpdated, setLastUpdated] = useState(Date.now());

    const form = useForm<FormValues>({
        initialValues: {
            name: '',
            description: '',
            category: '',
        },
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await api.get('/api/categories/');
                const categories = data.map((cat: any) => ({
                    value: cat.id,
                    label: cat.name,
                }));
                setCategoryOptions(categories);
            } catch (error) {
                console.error('Failed to fetch categories', error);
            }
        };

        fetchCategories();
    }, [lastUpdated]);

    const handleSubmit = async (values: FormValues) => {
        try {
            let categoryId = null;
            const existingCategory = categoryOptions.find(option => option.label === values.category);

            if (existingCategory) {
                categoryId = existingCategory.value; // Use existing category ID
            } else {
                // Category does not exist, create a new one
                const newCategoryResponse = await api.post('/api/categories/', { name: values.category });
                categoryId = newCategoryResponse.data.id; // Assuming the new category ID is returned
                setLastUpdated(Date.now()); // Trigger re-fetch of categories
            }

            // Submit the main form data with the categoryId
            const response = await api.post('/api/activity_types/', {
                name: values.name,
                description: values.description,
                category: categoryId,
            });

            console.log('Activity Type Created:', response.data); // Ensure `response` is used within this block
            form.reset(); // Reset form fields after submission
            onClose(); // Close modal on successful submission
        } catch (error) {
            console.error('Failed to create activity type or category', error);
        }
    };


    const handleModalClose = () => {
        form.reset();
        onClose();
    };

    return (
        <Modal opened={opened} onClose={handleModalClose} title="Create New Activity Type">
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <TextInput
                    label="Name"
                    placeholder="Name of the activity type"
                    {...form.getInputProps('name')}
                    required
                />
                <Autocomplete
                label="Category"
                placeholder="Type or select a category"
                data={categoryOptions.map(option => option.label)} // Map to just strings for display
                value={form.values.category}
                onChange={(value) => form.setFieldValue('category', value)}
                />
                <Textarea
                    label="Description"
                    placeholder="Description (optional)"
                    {...form.getInputProps('description')}
                />
                <Group mt="md">
                    <Button type="submit">Create</Button>
                </Group>
            </form>
        </Modal>
    );
};

export default CreateActivityTypeModal;
