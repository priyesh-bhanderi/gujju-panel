import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import { UserState } from './Context/Usercontext'
import Login from './pages/Login';
import Loader from './Utilis/Loader';
import ProtectedRoute from './protectedRoutes/ProtectedRoute';
import Admin from './Panels/Admin/Admin';

function App() {

  const { user, loading,setCustdata } = UserState();

  return (
    <>
      {loading && <Loader />}
      <Routes>
        <Route path='/' element={user?.role ? <Navigate to={`/${user?.role}`} /> : <Login />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Admin role='admin' />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
