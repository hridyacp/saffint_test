import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Result from './pages/Result/Result';

function App() {
  return (
    <Routes>
    <Route path="/" element={ <Home />} />
    <Route path="/result" element={ <Result />} />
 </Routes>
  );
}

export default App;
