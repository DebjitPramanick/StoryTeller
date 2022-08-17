import { Login } from '@mui/icons-material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Editor from './pages/Editor';
import Feeds from './pages/Feeds';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Story from './pages/Story';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/feeds' element={<Feeds />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/story/:id' element={<Story />}/>
          <Route path='/editor' element={<Editor />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
