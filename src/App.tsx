// npm i @tanstack/react-query
// npm i @tanstack/react-query-devtools
//  npx json-server --watch db.json --port 4000
import './App.css';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import BasicQueryAndMutate from './Components/BasicQueryAndMutate';
import HomePage from './Components/HomePage';
import Heros from './Components/Heros';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/basics">Basic of React Query</Link>
            </li>
            <li>
              <Link to="/heros">Querying of Heros Data</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/basics" element={<BasicQueryAndMutate />} />
          <Route path="/heros" element={<Heros />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
