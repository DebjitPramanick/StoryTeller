import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PageLayout from './layouts/PageLayout';
import Editor from './pages/Editor';
import Feeds from './pages/Feeds';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Story from './pages/Story';

function App() {

  const curPath = window.location.pathname;
  const isAuthPage = curPath.includes('register') || curPath.includes('login')

  return (
    <div className="App">
      <Router>
        <Header />
        <PageLayout isAuthPage={isAuthPage}>
          <Sidebar hide={isAuthPage}/>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/' element={<Feeds />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/story/:id' element={<Story />} />
            <Route path='/editor' element={<Editor />} />
          </Routes>
        </PageLayout>
      </Router>
    </div >
  );
}

export default App;
