import {Routes, Route} from 'react-router-dom';
import { About } from './components/about';
import { AuthProvider } from './components/auth';
import Footer from './components/footer';
import Home from './components/home';
import LogIn from './components/login';
import { Navbar } from './components/navbar';
import { NoMatch } from './components/nomatch';
import { RequireAuth } from './components/requireAuth';
import SignUp from './components/signin';

function App(){
  return(
    <AuthProvider>
      <Navbar/>
      <Routes>
        <Route path='login' element={<LogIn/>}></Route>
        <Route path='/' element={<RequireAuth><Home/></RequireAuth>}></Route>
        <Route path='about' element={<About/>}></Route>
        <Route path='signup' element={<SignUp/>}></Route>
        <Route path='*' element={<NoMatch/>}></Route>
      </Routes>
      <Footer/>
    </AuthProvider>
  );
}

export default App;