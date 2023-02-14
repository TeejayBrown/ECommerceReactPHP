import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

function Register(){
  let navigate = useNavigate();
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    password:"",
    error_list: [],
  });

  const handleChange=(e)=>{
    setRegData({ ...regData, [e.target.name]: e.target.value });
    //console.log(regData);
  }

  const handleSubmit=(e)=>{
    e.preventDefault();
    const registrationData = {
      name: regData.name,
      email: regData.email,
      password: regData.password
    }

    //console.log(registrationData);

    axios.get('/sanctum/csrf-cookie').then(response => {
      axios.post('/api/register', registrationData)
      .then((res) => {
        if (res.data.status === 200){
          localStorage.setItem('auth_token', res.data.token);
          localStorage.setItem('auth_name', res.data.username);
          swal("Success", res.data.message, "success");
          navigate(`/`);
        } else {
          setRegData({...regData, error_list: res.data.validation_errors});
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
              <h4 className='row justify-content-center'>Register</h4>
            </div>
            <div className='card-body'>
              <form onSubmit={handleSubmit}>
                <div className='form-group mb-3'>
                  <label>Full Name</label>
                  <input type="" name="name" className="form-control" value={regData.firstName} onChange={handleChange} />
                  <span>{regData.error_list.name}</span>
                </div>
                <div className='form-group mb-3'>
                  <label>Email</label>
                  <input type="email" name="email" className="form-control" value={regData.email} onChange={handleChange}/>
                  <span>{regData.error_list.email}</span>
                </div>
                <div className='form-group mb-3'>
                  <label>Password</label>
                  <input type="password" name="password" className="form-control" value={regData.password} onChange={handleChange}/>
                  <span>{regData.error_list.password}</span>
                </div>
                <div className='row justify-content-center'>
                  <button type="" className='btn btn-success'>Register</button>
                </div>
              </form>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Register;