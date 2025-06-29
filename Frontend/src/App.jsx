
import UserHomePage from './pages/user/userHomePage'
import AdminLogin from './pages/Admin/AdminLogin'
import EditBlog from './pages/Admin/updateBlog'
import AllBlogs from './pages/Admin/AllBlogs'
import SingleBlogDetails from './pages/Admin/SingleBlogDetails'
import AdminDashboard from './pages/Admin/AdminDashboard'
import { Route,Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>

        <Route path='/login' element={<AdminLogin />} />
        <Route path='/' element={<UserHomePage />} />

        <Route path='/admindashboard' element={<AdminDashboard />} />
        <Route path='/editblog/:id' element={<EditBlog />} />
        <Route path='/all-blogs' element={<AllBlogs />} />
        <Route path='/blog/:slug' element={<SingleBlogDetails />} />

        {/* Catch-all route for 404 */}
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App


