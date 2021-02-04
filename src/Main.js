import React, { useState, useCallback } from 'react';


const Main = ({
    handleLogOut,
    getInfo,
    info,
    country,
    handleCountryChange,
    username,
    token
})      => {
    return (
      <div>
    <button onClick={handleLogOut}> Log Out </button>
    <form id="infoform" onSubmit={getInfo}>
      <h2 id="dataprompt">What country do you want data on?</h2>
      <div>
        <input
          type="text"
          id="country"
          value={country}
          onChange={handleCountryChange}
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>  
        <div id="infobox"> 
        <h4 id="infotext"> {info} </h4>
        </div>
        </div>
  );
};

export default Main;