// npm i @tanstack/react-query
// npm i @tanstack/react-query-devtools
//  npx json-server --watch db.json --port 4000
import './App.css';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Query Components
import BasicQueryAndMutate from './Components/BasicQueryAndMutate';
import HomePage from './Components/HomePage';
import Heros from './Components/QueryFetch&Config';
import UseQueryCallback from './Components/UseQueryCallback';
import DataTransformation from './Components/DataTransformation';
import UsingCustomHook from './Components/UsingCustomHook';
import ClickToFetchData from './Components/ClickToFetchData';
import QueringByIdList from './Components/QueryById/QueringById_List';
import QueryingByIdSingle from './Components/QueryById/QueryingById_Single';
import ParallelQueries from './Components/ParallelQueries';
import DependentQueries from './Components/DependentQueries';

// Mutation Components
import Mutations from './Components/Mutations/Mutations';

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
              <Link to="/configure">Querying and Configurations</Link>
            </li>
            <li>
              <Link to="/callbacks">Callbacks on Query</Link>
            </li>
            <li>
              <Link to="/transformation">Data Transformation</Link>
            </li>
            <li>
              <Link to="/customhook">Using Custom Hooks</Link>
            </li>
            <li>
              <Link to="/customhookonclick">Using Custom Hooks on Click</Link>
            </li>
            <li>
              <Link to="/querybyid">Query by id</Link>
            </li>
            <li>
              <Link to="/parallelquery">Parellel Queries</Link>
            </li>
            <li>
              <Link to="/dependent">Dependent Quaries</Link>
            </li>
          </ul>
        </nav>
        <nav>
          <ul>
            <li>
              <Link to="/multation">Mutations</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          {/* QUERY */}
          <Route path="/" element={<HomePage />} />
          <Route path="/basics" element={<BasicQueryAndMutate />} />
          <Route path="/configure" element={<Heros />} />
          <Route path="/callbacks" element={<UseQueryCallback />} />
          <Route path="/transformation" element={<DataTransformation />} />
          <Route path="/customhook" element={<UsingCustomHook />} />
          <Route path="/customhookonclick" element={<ClickToFetchData />} />
          <Route path="/querybyid" element={<QueringByIdList />} />
          <Route path="/querybyid/:heroId" element={<QueryingByIdSingle />} />
          <Route path="/parallelquery" element={<ParallelQueries />} />
          <Route
            path="/dependent"
            element={<DependentQueries email={'jonathan@gmail.com'} />}
          />
          {/* MULTATION */}
          <Route path="/multation" element={<Mutations />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
