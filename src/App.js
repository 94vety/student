import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/index';
import Home from './components/Home/index';
import Person from './components/Person/index';
import ReturnBook from './components/ReturnBook/index';
import Records from './components/Records';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/person' element={<Person />} />
      <Route path='/return' element={<ReturnBook />} />
      <Route path='/records' element={<Records />} />
    </Routes>
  );
}

export default App;
