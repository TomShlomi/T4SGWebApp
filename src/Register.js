import React from 'react';

const Register = ({
  name, 
  handleNameChange,
  email, 
  handleEmailChange,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange,
  register,
}) => {
  return (
    <div>
    <form onSubmit={register}>
      <h2>Please enter your information</h2>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={handleEmailChange}
          required
        />
      </div>

      <div>
        <label htmlFor="name">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="loginpassword"
          value={password}
          onChange={handlePasswordChange}
          required
        />
      </div>

      <button type="submit">Submit</button>
    </form>
      </div>
  );
};

export default Register;