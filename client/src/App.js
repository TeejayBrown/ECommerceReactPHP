import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './Component/Header';
import Login from './auth/Login';
import Register from './auth/Register';
import Home from './Component/Home';
import axios from 'axios';

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function(config){
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
})

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} /> */}
              <Route path="login" element=
                {localStorage.getItem('auth_token') ? <Navigate replace to="/" /> : <Login />}
              />
              <Route path="register" element=
                {localStorage.getItem('auth_token') ? <Navigate replace to="/" />: <Register />}/>
              <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
