// import React, { useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';
// import axios from 'axios';
// import './Logins.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoggedIn, setLoggedIn] = useState(false);
//   const history = useHistory();

//   async function handleLogin(event) {
//     event.preventDefault();

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/login/", {
//         email: email,
//         password: password,
//       });

//       setLoggedIn(true);
//       alert("Login Successfully");

//       // Redirect based on role
//       if (response.data.role === 'admin') {
//         history.push('/admindetails');  // Adjust the path as necessary
//       } else {
//         history.push('/userdetails');  // Adjust the path as necessary
//       }
//     } catch (err) {
//       if (err.response && err.response.status === 404 && err.response.data.error === 'Email not found. Please sign up.') {
//         alert("Email not found. Please sign up.");
//         history.push('/signup');
//       } else {
//         alert(err.response?.data?.error || "An error occurred");
//       }
//     }
//   }

//   return (
//     <div className="login-container">
//       {isLoggedIn ? (
//         <div>
//           <p>Welcome, {email}!</p>
//         </div>
//       ) : (
//         <div>
//           <h2>Login</h2>
//           <form className="login-form" onSubmit={handleLogin}>
//             <div className="form-group">
//               <label htmlFor="email">Email</label>
//               <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="password">Password</label>
//               <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//             </div>
//             <button type="submit" className="btn">Login</button>
//           </form>
//           <div className="signup-link">
//             <p>Don't have an account? <Link to="/signup">Signup</Link></p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Login;































import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Context/UserContext'; 
import './Logins.css';


const Login = () => {
  const [email, setEmail] = useState('Enter your email id');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  async function handleLogin(event) {
    event.preventDefault();

    axios.post("http://127.0.0.1:8000/api/users/", {
        email,
        password,
      }).then(response=>{
        console.log('====================================');
        console.log(response.data);
        console.log('====================================');
        setLoggedIn(true);
        alert("Login Successfully");
        const userData = {
          email: response.data.email,
          role: response.data.role,
        };
        setUser(userData);

        if (response.data.role === 'admin') {
          localStorage.setItem('admin',response.data.email)
          window.location.href='/admin';
        } else {
          localStorage.setItem('user',response.data.email);
          window.location.href='/';
        }
      })
      .catch (err=> {
        if (err.response && err.response.status === 404 && err.response.data.error === 'Email not found. Please sign up.') {
          alert("Email not found. Please sign up.");
          window.location.href='/signup';
        } else {
          alert(err.response?.data?.error || "An error occurred");
        }
      });
  }

  return (
    <div className="login-container">
      {isLoggedIn ? (
        <div>
          <p>Welcome, {email}!</p>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn">Login</button>
          </form>
          <div className="signup-link">
            <p>Don't have an account? <Link to="/signup">Signup</Link></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
