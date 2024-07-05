import React, { useState } from 'react';

const Example = () => {
  const [editMode, setEditMode] = useState(false); // State to manage edit mode
  const [formData, setFormData] = useState({
    // Example form data state
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890' // Removed trailing comma
  });

  const handleEditClick = () => {
    setEditMode(true); // Enable edit mode
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform form submission logic here (e.g., API call)
    setEditMode(false); // Disable edit mode after submission
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <h1>Customer Details</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            disabled={!editMode} // Disable input if not in edit mode
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!editMode} // Disable input if not in edit mode
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!editMode} // Disable input if not in edit mode
          />
        </div>
        <button type="button" onClick={handleEditClick} disabled={editMode}>
          {editMode ? 'Editing...' : 'Edit'}
        </button>
        <button type="submit" disabled={!editMode}>
          Save
        </button>
      </form>
    </div>
  );
};

export default Example;
