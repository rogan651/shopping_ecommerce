// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Sidersbar.css'


// const Sidebar = () => {
//   return (
//     <>
    
    
//     <div className="admin-page">
    
//     <div className="sidebar">
//       <h2>Admin Sidebar</h2>
//       <ul>
//       <li><Link to='/admin'>Adminpage</Link></li>
//       <li><Link to='/admin/Productupload' >Productupload</Link></li>
//       <li><Link to='/admin/Productdetails' >Productdetails</Link></li>
//       <li><Link to='/admin/signup' >Signup</Link></li>
//       </ul>
//     </div>
//     </div>
//     </>
//   );
// }

// export default Sidebar;




















import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import './Sidersbar.css';

const Sidebar = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`admin-page ${isOpen ? 'open' : 'closed'}`}>
      <div className={`sidebar ${isOpen ? 'expanded' : 'collapsed'}`}>
        <button className="toggle-button" onClick={toggleSidebar}>
          {isOpen ? 'Close' : 'Open'}
        </button>
        <h2>Admin Sidebar</h2>
        <ul>
          <li><Link to='/admin'>Adminpage</Link></li>
          <li><Link to='/admin/productupload'>Productupload</Link></li>
          <li><Link to='/admin/productdetails'>Productdetails</Link></li>
          <li><Link to='/admin/Admincontrolhomepage'>Controlling Userpage</Link></li>
          {localStorage.getItem('admin') ? (
            <li><Link to='/admin/admininfo'>Admin Info</Link></li>
          ) : (
            <li><Link to='/admin/login'>Login</Link></li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
