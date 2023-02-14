import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';

function Header(){
  let navigate = useNavigate();
  const handleLogout = (e) =>{
    e.preventDefault();

    axios.post(`api/logout`).then( res => {
      if (res.data.status === 200){
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_name');
        swal("Success", res.data.message, "success");
        navigate(`/`);
      }
    })
  }

  var authButton = '';
  if(!localStorage.getItem('auth_token')){
    authButton = (
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="login" className="nav-link">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="register" className="nav-link">Register</Link>
        </li>
      </ul>
    );
  } else {
    authButton = (
      <li className="nav-item">
        <button type="button" onClick={handleLogout} className="nav-link btn btn-primary">Logout</button>
      </li>
    );
  }
  return(
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="#">Navbar</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link active">Home</Link>
            </li>
            {authButton}
          </ul>
          {/* <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success" type="submit">Search</button>
          </form> */}
        </div>
      </div>
    </nav>
  )
}

export default Header;