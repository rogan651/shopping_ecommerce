// import React, { useState } from 'react';
// import { useHistory, Link } from 'react-router-dom';
// import axios from 'axios';
// import './Signups.css';

// const Signup = () => {
//   const [username, setUsername] = useState(''); // Change name to username
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('user'); // default to user
//   const history = useHistory();

//   const axiosInstance = axios.create({
//     baseURL: "http://127.0.0.1:8000/api/",
//   });

//   async function handleRegister(event) {
//     event.preventDefault();

//     try {
//       const response = await axiosInstance.post("create/", {
//         username, // Change name to username
//         email,
//         password,
//         role,
//       });

//       alert("Signup Successfully");

//       if (response.data.role === 'admin') {
//         history.push('/admin');
//       } else {
//         history.push('/');
//       }
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.detail) {
//         alert(err.response.data.detail);
//       } else {
//         alert(err.message || "An error occurred");
//       }
//     }
//   }

//   return (
//     <div className="signup-container">
//       <h2>Create an Account</h2>
//       <form className="signup-form" onSubmit={handleRegister}>
//         <div className="form-group">
//           <label htmlFor="username">Username</label>
//           <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="role">Role</label>
//           <select value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
//         <button className="btn" type="submit">Signup</button>
//       </form>
//       <div className="login-link">
//         <p>Already have an account? <Link to="/login">Login</Link></p>
//       </div>
//     </div>
//   );
// }

// export default Signup;

























// import React, { useState, useContext } from 'react';
// import { useHistory, Link } from 'react-router-dom';
// import axios from 'axios';
// import { UserContext } from '../Context/UserContext';
// import './Signups.css';

// const Signup = () => {
//   const [username, setUsername] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('user');
//   const history = useHistory();
//   const { setUser } = useContext(UserContext);

//   const axiosInstance = axios.create({
//     baseURL: "http://127.0.0.1:8000/api/",
//   });

//   async function handleRegister(event) {
//     event.preventDefault();

//     try {
//       const response = await axiosInstance.post("create/", {
//         username,
//         email,
//         password,
//         role,
//       });

//       alert("Signup Successfully");

//       const userData = {
//         username,
//         email,
//         role,
//       };
//       setUser(userData);

//       if (response.data.role === 'admin') {
//         history.push('/admin');
//       } else {
//         history.push('/');
//       }
//     } catch (err) {
//       if (err.response && err.response.data && err.response.data.detail) {
//         alert(err.response.data.detail);
//       } else {
//         alert(err.message || "An error occurred");
//       }
//     }
//   }

//   return (
//     <div className="signup-container">
//       <h2>Create an Account</h2>
//       <form className="signup-form" onSubmit={handleRegister}>
//         <div className="form-group">
//           <label htmlFor="username">Username</label>
//           <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="email">Email</label>
//           <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//         </div>
//         <div className="form-group">
//           <label htmlFor="role">Role</label>
//           <select value={role} onChange={(e) => setRole(e.target.value)}>
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select>
//         </div>
//         <button className="btn" type="submit">Signup</button>
//       </form>
//       <div className="login-link">
//         <p>Already have an account? <Link to="/login">Login</Link></p>
//       </div>
//     </div>
//   );
// }

// export default Signup;













import React, { useState, useContext } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../Context/UserContext';
import './Signups.css';
import shopping from '../Components/Assets/shopping-cart-with-clothes-vector-24469099.jpg';
const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/api/",
  });

  async function handleRegister(event) {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("new/", {
        username,
        email,
        password,
        role,
      });

      alert("Signup Successfully");

      const userData = {
        username,
        email,
        role,
      };
      setUser(userData);

      if (response.data.role === 'admin') {
        history.push('/admin');
      } else {
        history.push('/');
      }
      // if (response.data.role === 'admin') {
      //   localStorage.setItem('admin',response.data.email)
      //   window.location.href='/admin';
      // } else {
      //   localStorage.setItem('user',response.data.email);
      //   window.location.href='/';
      // }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.detail) {
        alert(err.response.data.detail);
      } else {
        alert(err.message || "An error occurred");
      }
    }
  }

  return (
    <div className="signup-container">
      <div className="left-section">
        <img src={shopping} alt="shopping" />
        <div className="contact-info">
          <p>Need help? Let us know</p>
          <p>+1 234 414 3434 | support@youremail.com</p>
        </div>
      </div>
      <div className="right-section">
        <h2>Create an Account</h2>
        <form className="signup-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button className="btn" type="submit">Signup</button>
        </form>
        <div className="login-link">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
