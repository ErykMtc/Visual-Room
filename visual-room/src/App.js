import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './navigation/Navbar';
import Footer from './navigation/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import History from './pages/History';
import Home from './pages/Home';
import Admin from './pages/AdminSection';
import Plan from './pages/Plan';
import ProtectedRoutes from './hooks/ProtectedRoutes';
import PersistLogin from './component/PersistLogin';
import Unauthorized from './pages/Unauthorized';
import './style.css';
import './App.css';

const ROLES = {
  "Admin": 9999,
  "Editor": 2002,
  "Worker": 2000,
  "User": 2001
}

function App() {
  return (
    <>
      {/* <Router> */}
      {/* <AdminNav /> */}
      <Navbar />
      <Routes>
        <Route element={<PersistLogin />}>
          <Route element={<ProtectedRoutes allowedRoles={[ROLES.User]} />}>
            <Route path='/' element={<Home />} />
            <Route path='/plan' element={<Plan />} />
          </Route>


          <Route element={<ProtectedRoutes allowedRoles={[ROLES.Admin, ROLES.Editor]} />}>
            <Route path='/admin' element={<Admin />} />
          </Route>

          <Route element={<ProtectedRoutes allowedRoles={[ROLES.Admin, ROLES.Editor, ROLES.Worker]} />}>
            <Route path='/history' element={<History />} />
          </Route>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/unauthorized' element={<Unauthorized />} />

      </Routes>
      <Footer />
      {/* </Router> */}
    </>
  );
}

export default App;
