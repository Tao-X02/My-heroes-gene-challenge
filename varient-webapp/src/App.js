import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import Signup from './pages/signup';
import Summary from './pages/summary';
import Setting from './pages/setting';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/Dashboard" element={<Dashboard />} />
        <Route exact path="/Signup" element={<Signup />} />
        <Route exact path="/Summary" element={<Summary />} />
        <Route exact path="/Setting" element={<Setting />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;