import React, { useEffect, useState } from 'react';
import { Modal, TextInput, Textarea, Button, Group, Autocomplete } from '@mantine/core';
import { useForm } from '@mantine/form';
import api from "../api";

interface CreateActivityTypeModalProps {
    opened: boolean;
    onClose: () => void;
    onAddActivityType: (newActivityType: ActivityType) => void;
    initialActivityName?: string;
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

interface MetricType {
    name: string;
    description: string;
}

interface ActivityType {
    id: number;
    name: string;
    description?: string;
}

const CreateActivityTypeModal: React.FC<CreateActivityTypeModalProps> = ({ opened, onClose, onAddActivityType, initialActivityName }) => {
    const [categoryOptions, setCategoryOptions] = useState<CategoryOption[]>([]);
    const [metricTypes, setMetricTypes] = useState<MetricType[]>([]);

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
    }, []);

    // Update form values when initialActivityName changes
    useEffect(() => {
        if (initialActivityName) {
            form.setValues({
                name: initialActivityName,
                description: form.values.description,
                category: form.values.category,
            });
        }
    }, [initialActivityName, form]);

    const handleSubmit = async (values: FormValues) => {
        try {
            let categoryId = null;
            const trimmedCategory = values.category.trim();

            // Check if there's a non-empty category provided
            if (trimmedCategory) {
                const existingCategory = categoryOptions.find(option => option.label === trimmedCategory);

                if (existingCategory) {
                    categoryId = existingCategory.value;
                } else {
                    // Only create a new category if the name is not empty
                    const newCategoryResponse = await api.post('/api/categories/', { name: trimmedCategory });
                    categoryId = newCategoryResponse.data.id;

                    const newCategory = {
                        value: categoryId,
                        label: trimmedCategory
                    };
                    setCategoryOptions(currentCategories => [...currentCategories, newCategory]);
                }
            }

            const activityTypeResponse = await api.post('/api/activity_types/', {
                name: values.name,
                description: values.description,
                category: categoryId,
            });
            if (activityTypeResponse.status === 200 || activityTypeResponse.status === 201) {
                console.log('Activity Type Created:', activityTypeResponse.data);
                onAddActivityType(activityTypeResponse.data); // Use the callback to update the parent's state
            }

            for (const metric of metricTypes) {
                await api.post('/api/metric_types/', {
                    name: metric.name,
                    description: metric.description,
                    activity_type: activityTypeResponse.data.id
                });
            }
            form.reset();
            setMetricTypes([]);
            onClose();
        } catch (error) {
            console.error('Failed to create activity type or category', error);
        }
    };


    const handleAddMetricType = () => {
        setMetricTypes([...metricTypes, { name: '', description: '' }]);
    };

    const handleMetricChange = (index: number, field: keyof MetricType, value: string) => {
        const updatedMetrics = metricTypes.map((metric, idx) => {
            if (idx === index) {
                return { ...metric, [field]: value };
            }
            return metric;
        });
        setMetricTypes(updatedMetrics);
    };

    const handleRemoveMetricType = (index: number) => {
        setMetricTypes(metricTypes.filter((_, idx) => idx !== index));
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
                    data={categoryOptions.map(option => option.label)}
                    value={form.values.category}
                    onChange={(value) => form.setFieldValue('category', value)}
                />
                <Textarea
                    label="Description"
                    placeholder="Description (optional)"
                    {...form.getInputProps('description')}
                />
                <Button onClick={handleAddMetricType} variant="outline" style={{ marginTop: 10 }}>
                    + Add Metric Type
                </Button>
                {metricTypes.map((metric, index) => (
                    <Group key={index} mt="md">
                        <TextInput
                            label="Metric Name"
                            placeholder="Name of the metric type"
                            value={metric.name}
                            onChange={(event) => handleMetricChange(index, 'name', event.target.value)}
                        />
                        <Textarea
                            label="Metric Description"
                            placeholder="Description of the metric type"
                            value={metric.description}
                            onChange={(event) => handleMetricChange(index, 'description', event.target.value)}
                        />
                        <Button onClick={() => handleRemoveMetricType(index)} color="red">Remove</Button>
                    </Group>
                ))}
                <Group mt="md">
                    <Button type="submit">Create</Button>
                </Group>
            </form>
        </Modal>

    );
};

export default CreateActivityTypeModal;
