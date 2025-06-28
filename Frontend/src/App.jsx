
import UserHomePage from './pages/user/userHomePage'
import UserLogin from './pages/user/userLogin'
import UserRegister from './pages/user/userRegister'
import AddNewBlog from './pages/user/AddNewBlog'
import { Route,Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path = '/register' element = {<UserRegister />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/' element={<UserHomePage />} />
        <Route path='/add-new-blog' element={<AddNewBlog />} />
        <Route path='*' element={<h1>Page Not Found</h1>} />
      </Routes>
    </div>
  )
}

export default App


