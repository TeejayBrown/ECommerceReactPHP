import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

function Login(){
  let navigate = useNavigate();
  const [loginData, setloginData] = useState({
    email: "",
    password:"",
    error_list: [],
  });

  const handleChange=(e)=>{
    setloginData({ ...loginData, [e.target.name]: e.target.value });
    //console.log(logData);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const logData = {
      email: loginData.email,
      password: loginData.password
    }

    //console.log(logData);

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('/api/login', logData)
      .then((res) => {
        if (res.data.status === 200){
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          swal("Success", res.data.message, "success");
          navigate(`/`);
        } else if (res.data.status ===401){
          swal("Warning", res.data.message, "warning");
        } else {
          setloginData({...logData, error_list: res.data.validation_errors});
        }
      });
    });

  }

  return(
    <div className='container py-5'>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='row justify-content-center'>Login</h4>
            </div>
            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                <div className='form-group mb-3'>
                  <label>Email</label>
                  <input type="email" name="email" className="form-control" value={loginData.email} onChange={handleChange}/>
                  <span>{loginData.error_list.email}</span>
                </div>
                <div className='form-group mb-3'>
                  <label>Password</label>
                  <input type="password" name="password" className="form-control" value={loginData.password} onChange={handleChange}/>
                  <span>{loginData.error_list.password}</span>
                </div>
                <div className='row justify-content-center'>
                  <button type="" className='btn btn-success'>Login</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;