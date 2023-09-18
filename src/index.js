import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/bootstrap.min.css'; 
import './css/all.min.css';
import './css/App.css';
import './css/main.css';
import './css/reyham.css';
import './css/board.css'

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
import Password from './pages/Password';
import ConsultantData from './modules/Consultant/ConsultantData';
import ClientList from './modules/Client/ClientList';
import ConsultantList from './modules/Consultant/ListConsultant';
import RegConsultant from './modules/Consultant/RegConsultant';
import RegClient from './modules/Client/RegClient';
import CreditList from './modules/Credit/ListCredit';
import UpLoad from './pages/upload';

import Cookies from 'universal-cookie';
import RegAgency from './modules/Agency/RegAgency';
import AgencyList from './modules/Agency/ListAgency';
import Profile from './pages/Profile';
import ForgetPass from './pages/ForgetPass';
import errortrans from './translate/error';
import ProfileView from './pages/ProfileView';
import ActiveUser from './pages/ActiveUser';
import ClientDetail from './modules/Client/ClientDetail';
import Steps from './modules/StepsFill/Steps';
import Plans from './modules/Forms/Plans';
import ClientPlan from './modules/Client/ClientPlan';
import Control from './modules/Forms/Control';
import RegisterPartner from './modules/Client/RegisterPartner';
import Configuration from './pages/Configuration';
const cookies = new Cookies();
var lang = JSON.parse(localStorage.getItem('fiin-lang'));

if(!lang){
  localStorage.setItem('fiin-lang',JSON.stringify(
    {lang:errortrans.defaultLang}));
  lang = JSON.parse(localStorage.getItem('fiin-lang'));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    {cookies.get('fiin-login')?
      <Routes>
        <Route path="/" element={<Layout><Dashboard/></Layout>}/>
        <Route path="/dashboard" element={<Layout><Dashboard/></Layout>}/>
        <Route path="/password" element={<Layout><Password/></Layout>}/>
        <Route path="/configuration" element={<Layout><Configuration/></Layout>}/>
        <Route path="/upload/:userId" element={<Layout><UpLoad/></Layout>}/>
        <Route path="/profile" element={<Layout><ProfileView/></Layout>}/>
        <Route path="/profile/:profileId" element={<Layout><Profile/></Layout>}/>
        
        
        {/* Credit Pages */}
        <Route path="/credit/list" element={<Layout><CreditList/></Layout>}/>


        {/* Agency Pages */}
        <Route path="/agency/register" element={<Layout><RegAgency/></Layout>}/>
        <Route path="/agency/list" element={<Layout><AgencyList/></Layout>}/>
        
        {/* Consult Pages */}
        <Route path="/consultant/data" element={<Layout><ConsultantData/></Layout>}/>
        <Route path="/consultant/register" element={<Layout><RegConsultant/></Layout>}/>
        <Route path="/consultant/list" element={<Layout><ConsultantList/></Layout>}/>

        {/* Client Pages */}
        <Route path="/client/list" element={<Layout><ClientList/></Layout>}/>
        <Route path="/client/register" element={<Layout><RegClient/></Layout>}/>
        <Route path="/partner/register" element={<Layout><RegisterPartner/></Layout>}/>
        
        {/* Form Pages */}
        <Route path="/client/steps" element={<Layout><Steps/></Layout>}/>
        <Route path="/client/plans" element={<Layout><ClientPlan/></Layout>}/>
        <Route path="/form/client/:data" element={<Layout><ClientDetail/></Layout>}/>
        <Route path="/form/set-plan/:data" element={<Layout><Plans/></Layout>}/>
        <Route path="/form/set-control/:data" element={<Layout><Control/></Layout>}/>

      </Routes>:
      <Routes>
        <Route path="/" element={<Login lang={lang}/>}/>
        <Route path="/:login" element={<Login lang={lang}/>}/>
        <Route path="/:login/:page" element={<Login lang={lang}/>}/>
        <Route path="/:login/:page/:id" element={<Login lang={lang}/>}/>
        <Route path="/forget-pass/:otp" element={<ForgetPass/>}/>
        <Route path="/active-user/:otp" element={<ActiveUser/>}/>
      </Routes>}
     </Router>
);

serviceWorkerRegistration.unregister();

reportWebVitals();
