// import React, { useContext } from 'react';
// import { UserContext } from '../Context/UserContext'; 

// const Userinformation = () => {
//   const { user } = useContext(UserContext);

//   if (!localStorage.getItem('user')) {
//     return (
//       <div className="userinfo-container">
//         <h2>User Info</h2>
//         <p>You are logged in.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="userinfo-container">
//       <h2>User Info</h2>

//       <p>Email: {localStorage.getItem('user')}</p>
     
//       <button onClick={()=>{localStorage.setItem('user','');
//         window.location.href="/";
    
//       }}>Logout</button>
//     </div>
//   );
// };

// export default Userinformation;











import React, { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import { useHistory } from 'react-router-dom';
import './Usersinformations.css';

const Userinformation = () => {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('admin');
    setUser(null);
    window.location.href='/';
  };

  const userEmail = localStorage.getItem('user');
  const isAdmin = localStorage.getItem('admin');
  const userRole = isAdmin ? 'Admin' : 'User';

  if (userEmail==null && isAdmin==null) {
    return (
      <div className="userinfo-container">
        <h2>User Info</h2>
        <p>You are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="userinfo-container">
      <h2><i class='bx bxs-user-pin text-primary'></i></h2>
      <p>Email: {userEmail?userEmail:isAdmin}</p>
      <p>Role: {userRole}</p>
      <button onClick={()=>handleLogout()} className='form-control btn btn-primary'>Logout</button>
    </div>
  );
};

export default Userinformation;
