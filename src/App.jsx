import './App.css';
import Field from './Field/Field';
import { fieldSize } from './Field/Setup';
const size = 'repeat(' + fieldSize + ', 2rem)';

function App() {
  return (
    <div className="App">
      <div className="scores">
        Scores: 0
      </div>
      <div className="container" style={{gridTemplateColumns: `${size}`, gridTemplateRows: `${size}`}}>
        <Field/>
      </div>
      <div className="info">some info</div>
    </div>
  );
}

export default App;
