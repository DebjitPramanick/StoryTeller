import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import ProtectedRoutes from './components/ProtectedRoutes';
import PageLayout from './layouts/PageLayout';
import Editor from './pages/Editor';
import Feeds from './pages/Feeds';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Story from './pages/Story';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Header />
        <PageLayout>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />

            <Route path='/' element={
              <ProtectedRoutes>
                <Feeds />
              </ProtectedRoutes>
            } />

            <Route path='/profile' element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            } />

            <Route path='/story/:id' element={
              <ProtectedRoutes>
                <Story />
              </ProtectedRoutes>
            } />

            <Route path='/editor' element={
              <ProtectedRoutes>
                <Editor />
              </ProtectedRoutes>
            } />
          </Routes>
        </PageLayout>
      </Router>
    </div >
  );
}

export default App;
