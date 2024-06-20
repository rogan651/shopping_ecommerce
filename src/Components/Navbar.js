// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Navbars.css';

// const Navbar = () => {
//   return (
//     <nav className='navbar'>
//       <div className='left'>
//         <h3 className='logo'>Shopping</h3>
//       </div>

//       <div className='center'>
//         <div className="search-box">
//           <input type="text" placeholder="Search..." />
//           <button type="submit">Search</button>
//         </div>
//       </div>

//       <div className='right'>
//         <ul className='nav-links'>
//           <li><Link to='/' className='nav-link'>Home</Link></li>
//           <li><Link to='/cart' className='nav-link'>Cart</Link></li>
//           <li><Link to='/Myorder' className='nav-link'>Myorder</Link></li>
//           <li><Link to='/signup' className='nav-link'>Signup</Link></li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;











// import React, { useContext, useState } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { UserContext } from '../Context/UserContext';
// import { CartContext } from '../Context/CartContext'; // Correct import
// import logo from '../Components/Assets/Copy of logo.png';
// import './Navbars.css';

// const Navbar = () => {
//   const { user } = useContext(UserContext);
//   const { cart } = useContext(CartContext); // Use CartContext
//   const location = useLocation();
//   const [activeLink, setActiveLink] = useState(location.pathname);

//   return (
//     <nav className='navbar'>
//       <div className='left'>
//         <img className='logo' src={logo} alt="shopping" />
//       </div>

//       <div className='right'>
//         <ul className='nav-links'>
//           <li>
//             <Link 
//               to='/' 
//               className={`nav-link ${activeLink === '/' ? 'active' : ''}`} 
//               onClick={() => setActiveLink('/')}
//             >
//               <i className='bx bxs-home icon'></i>
//             </Link>
//           </li>
//           <li>
//             <Link 
//               to='/cart' 
//               className={`nav-link ${activeLink === '/cart' ? 'active' : ''}`} 
//               onClick={() => setActiveLink('/cart')}
//             >
//               <i className='bx bxs-cart-alt icon'></i>
//               {cart.length > 0 && <span className='cart-count'>{cart.length}</span>} 
//             </Link>
//           </li>
//           <li>
//             <Link 
//               to='/myorder' 
//               className={`nav-link ${activeLink === '/myorder' ? 'active' : ''}`} 
//               onClick={() => setActiveLink('/myorder')}
//             >
//               <i className='bx bxl-shopify icon'></i>
//             </Link>
//           </li>
//           {user ? (
//             <li>
//               <Link 
//                 to='/userinfo' 
//                 className={`nav-link ${activeLink === '/userinfo' ? 'active' : ''}`} 
//                 onClick={() => setActiveLink('/userinfo')}
//               >
//                 <i className='bx bxs-user-circle icon'></i>
//               </Link>
//             </li>
//           ) : (
//             <li>
//               <Link 
//                 to='/login' 
//                 className={`nav-link ${activeLink === '/login' ? 'active' : ''}`} 
//                 onClick={() => setActiveLink('/login')}
//               >
//                 <i className='bx bxs-user-plus icon'></i>
//               </Link>
//             </li>
//           )}
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;








import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import { CartContext } from '../Context/CartContext';
import logo from '../Components/Assets/Copy of logo.png';
import './Navbars.css';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const { cart } = useContext(CartContext);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState(location.pathname);

  useEffect(() => {
    // Check if user data exists in local storage
    const userEmail = localStorage.getItem('user');
    const adminEmail = localStorage.getItem('admin');

    if (userEmail) {
      setUser({ email: userEmail, role: 'user' });
    } else if (adminEmail) {
      setUser({ email: adminEmail, role: 'admin' });
    }
  }, [setUser]);

  return (
    <nav className='navbar'>
      <div className='left'>
        <img className='logo' src={logo} alt="shopping" />
      </div>

      <div className='right'>
        <ul className='nav-links'>
          <li>
            <Link
              to='/'
              className={`nav-link ${activeLink === '/' ? 'active' : ''}`}
              onClick={() => setActiveLink('/')}
            >
              <i className='bx bxs-home icon'></i>
            </Link>
          </li>
          <li>
            <Link
              to='/cart'
              className={`nav-link ${activeLink === '/cart' ? 'active' : ''}`}
              onClick={() => setActiveLink('/cart')}
            >
              <i className='bx bxs-cart-alt icon'></i>
              {cart.length > 0 && <span className='cart-count'>{cart.length}</span>}
            </Link>
          </li>
          <li>
            <Link
              to='/myorder'
              className={`nav-link ${activeLink === '/myorder' ? 'active' : ''}`}
              onClick={() => setActiveLink('/myorder')}
            >
              <i className='bx bxl-shopify icon'></i>
            </Link>
          </li>
          {user ? (
            <li className='nav-link user-details'>
              <Link
                to='/userinfo'
                className={`nav-link ${activeLink === '/userinfo' ? 'active' : ''}`}
                onClick={() => setActiveLink('/userinfo')}>
                <i className='bx bxs-user-circle icon'></i>
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to='/login'
                className={`nav-link ${activeLink === '/login' ? 'active' : ''}`}
                onClick={() => setActiveLink('/login')}
              >
                <i className='bx bxs-user-plus icon'></i>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
