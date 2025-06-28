
import UserHomePage from './pages/user/userHomePage'
import AdminLogin from './pages/Admin/AdminLogin'

import AddNewBlog from './pages/user/AddNewBlog'
import AdminDashboard from './pages/Admin/AdminDashboard'
import { Route,Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>

        <Route path='/login' element={<AdminLogin />} />
        <Route path='/' element={<UserHomePage />} />
        <Route path='/add-new-blog' element={<AddNewBlog />} />
        <Route path='/admindashboard' element={<AdminDashboard />} />

        {/* Catch-all route for 404 */}
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App


