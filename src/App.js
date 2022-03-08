import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/index';
import Home from './components/Home/index';
import Person from './components/Person/index';
import ReturnBook from './components/ReturnBook/index';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/person' element={<Person />} />
      <Route path='/return' element={<ReturnBook />} />
    </Routes>
  );
}

export default App;
