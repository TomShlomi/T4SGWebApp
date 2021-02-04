import React, { useState, useCallback } from 'react';
import './App.css';
import Render from './Render.js'

const App = ()      => {
    return (
      <div className="app">
      <header>
        <h1>WHO Vaccine Tracker</h1>
      </header>
      <main>
            <Render />
      </main>
    </div>
  );
};

export default App;