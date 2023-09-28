import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/bootstrap.min.css'; 
import './css/all.min.css';
import './css/App.css';
import './css/main.css';
import './css/reyham.css';
import './css/board.css'
import Cookies from 'universal-cookie';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'
import Login from './pages/Login';
import UserModels from './modules/userPanel/userModels';
import errortrans from './translate/error';
import NewModelHolder from './modules/userPanel/newModelHolder';
<<<<<<< HEAD
=======
import Profile from './pages/Profile';
import Password from './pages/Password';
>>>>>>> 5127b071387e2c6bd0e131536ad4565967aa3e7d
const cookies = new Cookies();
var lang = JSON.parse(localStorage.getItem('deep-lang'));

if(!lang){
  localStorage.setItem('deep-lang',JSON.stringify(
    {lang:errortrans.defaultLang}));
  lang = JSON.parse(localStorage.getItem('deep-lang'));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    {cookies.get('deep-login')?
      <Routes>
        <Route path="/" element={<Layout><Dashboard/></Layout>}/>
        <Route path="/dashboard" element={<Layout><Dashboard/></Layout>}/>
<<<<<<< HEAD
=======
        <Route path="/profile" element={<Layout><Profile/></Layout>}/>
        <Route path="/password" element={<Layout><Password/></Layout>}/>
>>>>>>> 5127b071387e2c6bd0e131536ad4565967aa3e7d
        
        {/* User Pages */}
        <Route path="/user/models" element={<Layout><UserModels/></Layout>}/>
        <Route path="/user/new-model" element={<Layout><NewModelHolder/></Layout>}/>
        
      </Routes>:
      <Routes>
        <Route path="/" element={<Login lang={lang}/>}/>
        <Route path="/:login" element={<Login lang={lang}/>}/>
        <Route path="/:login/:page" element={<Login lang={lang}/>}/>
      </Routes>}
     </Router>
);

serviceWorkerRegistration.unregister();

reportWebVitals();
