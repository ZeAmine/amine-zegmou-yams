import React, { useState } from 'react';

function Profile() {
  const [formData, setFormData] = useState({
    firstname: 'John',
    lastname: 'Doe',
    email: 'john.doe@example.com',
  });

  function updateField(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function saveUser(event) {
    event.preventDefault();
    console.log('User is', formData);
    // ...
  }

  return (
    <div>
      <h2>Hi John!</h2>
      <h3>Customize your profile here</h3>

      <form onSubmit={saveUser}>
        <p>
          Your firstname :{' '}
          <input
            type="text"
            name="firstname"
            placeholder="John"
            onInput={updateField}
            defaultValue={formData.firstname}
          />
        </p>
        <p>
          Your lastname :{' '}
          <input type="text" name="lastname" placeholder="Doe" onInput={updateField} defaultValue={formData.lastname} />
        </p>
        <p>
          Your email:{' '}
          <input
            type="email"
            name="email"
            placeholder="john.doa@email.com"
            onInput={updateField}
            defaultValue={formData.email}
          />
        </p>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default Profile;
