import React, { useState, useCallback } from 'react';

const Login = ({
    username,
    handleUsernameChange,
    password,
    handlePasswordChange,
    prompt,
    handlePromptChange,
    handleSubmit,
    handleRegister
}) => {
    return (
        <div>
        <button onClick={handleRegister}> Register </button>
        <form onSubmit={handleSubmit}>
          <h2 id="loginprompt">{prompt}</h2>
          <div>
            <label htmlFor="name">Username:</label>
            <input
              type="text"
              id="field"
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

export default Login;