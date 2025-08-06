// This is all your dependencies to import in
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from '../src/components/game';
import './App.css';

function App() {
  //Here is where you will define your routes
  return (
    <>
      <Router>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Game />
              </>
            }
          />
        </Routes>
      </Router>
    </>
  );
}
export default App;
