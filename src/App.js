import './App.css';
import Login from './pages/login/index.js';
import Main from './pages/main/index.js';
import { useState } from 'react';

function App() {
  const [page, setPage] = useState(0);
  const [userMail, setUserMail] = useState('');
  return (
    <div className='App'>
      {page === 0 && <Login sp={setPage} sum={setUserMail} />}
      {page === 1 && <Main um={userMail} sum={setUserMail} sp={setPage} />}
    </div>
  );
}

export default App;
