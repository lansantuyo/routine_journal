import React, { useState } from 'react';
import axios from 'axios';
import { DateTimePicker } from '@mantine/dates';
import { useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import '../styles/AddActivityForm.css';

function AddActivityForm() {
  const [activity_name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('');
  const [start_date, setStartDate] = useState<Date | null>(new Date());
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light');

  const toggleColorScheme = () => {
      setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/activity/', { activity_name, description, frequency, start_date });
      
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <form 
      className="form-container"
      onSubmit={handleSubmit}
      style={{ 
        backgroundColor: computedColorScheme === 'dark' ? '#2D2222' : '#EAD8C2', 
        color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F'
      }}
    >
      <input type="text" value={activity_name} onChange={(e) => setName(e.target.value)} placeholder="Activity Name" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type ="text" value={frequency} onChange={(e) => setFrequency(e.target.value)} placeholder = "Frequency" />
      <DateTimePicker
        value={start_date}
        onChange={(value) => setStartDate(value)}
        placeholder="Start Date"
      />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddActivityForm;