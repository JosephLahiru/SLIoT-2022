import {Routes, Route} from 'react-router-dom';
import { About } from './components/about';
import { AuthProvider } from './components/auth';
import Home from './components/home';
import LogIn from './components/login';
import { NoMatch } from './components/nomatch';
import { RequireAuth } from './components/requireAuth';
import SignUp from './components/signin';

function App(){
  return(
    <AuthProvider>
      <Routes>
        <Route path='/' element={<RequireAuth><Home/></RequireAuth>}></Route>
        <Route path='about' element={<About/>}></Route>
        <Route path='signup' element={<SignUp/>}></Route>
        <Route path='login' element={<LogIn/>}></Route>
        <Route path='*' element={<NoMatch/>}></Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;