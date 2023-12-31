import './App.css'
import {Route, Routes} from 'react-router-dom'
import LoginPage from './pages/loginPage';
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import { UserContextProvider } from './userContext';
import AccountPage from './pages/AccountPage';
import PostPage from './pages/PostPage';
import PostsPage from './pages/PostsPage';
import EditPost from './pages/EditPost';



axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() { 

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={ <Layout/> }>
          {/* <Route index element={ <IndexPage/> } /> */}
          <Route path='/login' element={ <LoginPage/> } />
          <Route path='/register' element={ <RegisterPage/> } />
          <Route path='/posts' element={ <PostsPage/> } />
          <Route path='/account/:subpage?' element={ <AccountPage/>} />
          <Route path='/account/:subpage/:action' element={ <AccountPage/>} />
          <Route path='/post/:id' element={ <PostPage/>} />
          <Route path='/post/edit/:id' element={<EditPost/>} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App
