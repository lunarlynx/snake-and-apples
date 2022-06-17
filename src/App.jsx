import React, { useState } from 'react';
import './App.css';
import Field from './Field/Field';
import { fieldSize } from './Field/Setup';

const size = 'repeat(' + fieldSize + ', 2rem)';

function App() {

  const [score, setScore] = React.useState(0);
  const updateData = () => {
    setScore(score + 1);
  };


  return (
    <div className="App">
      <div className="scores">
        Scores: {score}
      </div>
      <div className="container" style={{
        gridTemplateColumns: `${size}`,
        gridTemplateRows: `${size}`
      }}>
        <Field updateData={updateData} />
      </div>
      <div className="info">some info</div>
    </div>
  );
}

export default App;
