import logo from './logo.svg';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Signup from './Pages/Signup';
import Summary from './Pages/Summary';
import Setting from './Pages/Setting';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login/>}/>
        <Route exact path="/Dashboard" element={<Dashboard/>}/>
        <Route exact path="/Signup" element={<Signup/>}/>
        <Route exact path="/Summary" element={<Summary/>}/>
        <Route exact path="/Setting" element={<Setting/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
