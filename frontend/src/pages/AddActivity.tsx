import React, { useState } from 'react';
import axios from 'axios';
import { DateTimePicker } from '@mantine/dates';

function AddActivityForm() {
  const [activity_name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState('');
  const [start_date, setStartDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/activity/', { activity_name, description, frequency, start_date });
      
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={activity_name} onChange={(e) => setName(e.target.value)} placeholder="Activity Name" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
      <input type ="text" value={frequency} onChange={(e) => setFrequency(e.target.value)} placeholder = "Frequency" />
      <input type="date" value={start_date} onChange={(e) => setStartDate(e.target.value)} placeholder="Start Date" />
      <button type="submit">Add Item</button>
    </form>
  );
}

export default AddActivityForm;