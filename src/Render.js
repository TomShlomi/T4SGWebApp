import React, { useState, useCallback } from 'react';
import './App.css';
import Login from './Login.js'
import Register from './Register.js'
import Main from './Main.js'

const Render = ()      => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null);
    const [page, setPage] = useState('login');
    const [country, setCountry] = useState('United States');
    const [info, setInfo] = useState('');
    const [prompt, setPrompt] = useState('Please enter your username and password');

    
const handlePromptChange = useCallback(event => {
    setPrompt(event.target.value);
}, []);
    
  const handleNameChange = useCallback(event => {
    setName(event.target.value);
  }, []);

  const handleEmailChange = useCallback(event => {
    setEmail(event.target.value);
  }, []);

  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handlePasswordChange = useCallback(event => {
    setPassword(event.target.value);
  }, []);
  
  const handleCountryChange = useCallback(event => {
    setCountry(event.target.value);
  }, []);

  const handleInfoChange = useCallback(event => {
    setInfo(event.target.value);
  }, []);

  const handleRegister = useCallback(event => {
    setPage('register');
  }, []);
    
  const handleLogOut = useCallback(event => {
      setPage('login');
      setInfo('');
      setPrompt('Please enter your username and password')
      setToken(null);
  }, []);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      const data = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({
          username: username,
          password: password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
        setToken(data.token);
        if (token) {
            setPage('main');
        }
        else if (data.confirm){
            setPrompt("You entered an incorrect username or password. Please try again or register.")
        }
    },
 //   [password, username]
  );
    
    const register = useCallback(
    async event => {
      event.preventDefault();
      const data = await fetch('/register', {
        method: 'POST',
        body: JSON.stringify({
          name: name,
          email: email,
          username: username,
          password: password
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
        setToken(data.token);
        setPage('main');
    },
 //   [password, username]
  );
    
    const getInfo = useCallback(
    async event => {
      event.preventDefault();
      const data = await fetch('/info', {
        method: 'POST',
        body: JSON.stringify({
          country: country,
          username: username,
          token: token
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json());
        setInfo(data.info);
    },
 //   [password, username]
  );

    
    let render;
    if (page == 'login') {
        render = <Login
        username={username}
        password={password}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        prompt={prompt}
        handlePromptChange={handlePromptChange}
        handleSubmit={handleSubmit}
        handleRegister={handleRegister}
            />   
    }
    else if (page == 'register') {
        render = <Register
        name={name}
        email={email}
        username={username}
        password={password}
        handleNameChange={handleNameChange}
        handleEmailChange={handleEmailChange}
        handleUsernameChange={handleUsernameChange}
        handlePasswordChange={handlePasswordChange}
        register={register}
            />   
    }
    else if (page == 'main' && token) {
        render = <Main 
        handleLogOut={handleLogOut}
        getInfo={getInfo}
        info={info}
        country={country}
        handleCountryChange={handleCountryChange}
        username={username}
        token={token}
        />
    }
    else {
        render = <h2> Oops! You should not be seeing this page. Reload and try again. </h2>;
    }
    return render;
};

export default Render;