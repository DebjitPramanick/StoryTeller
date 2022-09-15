import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoutes from './components/ProtectedRoutes';
import Editor from './pages/Editor';
import Feeds from './pages/Feeds';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Feed from './pages/Feed';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logout from './pages/Logout';
import SavedItems from './pages/SavedItems';
import Explore from './pages/Explore';

function App() {

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />

          <Route path='/' element={
            <ProtectedRoutes>
              <Feeds />
            </ProtectedRoutes>
          } />

          <Route path='/profile/:id' element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          } />
          <Route path='/profile' element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          } />

          <Route path='/feed/:id' element={
            <ProtectedRoutes>
              <Feed />
            </ProtectedRoutes>
          } />

          <Route path='/editor' element={
            <ProtectedRoutes>
              <Editor />
            </ProtectedRoutes>
          } />

          <Route path='/saved' element={
            <ProtectedRoutes>
              <SavedItems />
            </ProtectedRoutes>
          } />

          <Route path='/explore' element={
            <ProtectedRoutes>
              <Explore />
            </ProtectedRoutes>
          } />

          <Route path='/logout' element={
            <ProtectedRoutes>
              <Logout />
            </ProtectedRoutes>
          } />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
