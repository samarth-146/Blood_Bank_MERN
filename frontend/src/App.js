// import React from 'react';
// // import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
// // import { jwtDecode } from 'jwt-decode';

// // import SignUp from './Components/SignUp'; // User signup page
// // import UserSignUp from './Components/UserSignUp'; // User sign-up component
// // import AdminSignUp from './Components/AdminSignUp'; // Admin sign-up component
// // import DonorHome from './Components/DonorHome';
// // import BloodBankHome from './Components/BloodBankHome';
// import Home from './Components/Home';
// // import SignIn from './Components/SignIn';
// // import './App.css';

// // function App() {
// //   const token = localStorage.getItem('token');
// //   let userRole = null;
// //   let isTokenExpired = false;

// //   if (token && token.split('.').length === 3) {
// //     try {
// //       const decodedToken = jwtDecode(token);
// //       userRole = decodedToken.role; // Assuming the role is still being encoded in the token

// //       // Check if the token is expired
// //       const currentTime = Date.now() / 1000; // In seconds
// //       if (decodedToken.exp < currentTime) {
// //         localStorage.removeItem('token'); // Remove expired token
// //         userRole = null; // Set role to null
// //         isTokenExpired = true;
// //       }
// //     } catch (error) {
// //       console.error('Invalid token', error);
// //     }
// //   }

// //   return (
// //     <Router>
// //       <Routes>
// //         <Route path="/signin" element={<SignIn />} />
// //         <Route path="/signup/user" element={<UserSignUp />} />
// //         <Route path="/signup/admin" element={<AdminSignUp />} />

// //         {/* Home route */}
// //         <Route
// //           path="/"
// //           element={
// //             token && !isTokenExpired ? (
// //               userRole === 'donor' ? (
// //                 <Navigate to="/donor-home" />
// //               ) : (
// //                 <Navigate to="/bloodbank-home" />
// //               )
// //             ) : (
// //               <Home />
// //             )
// //           }
// //         />

// //         {/* Donor Home route */}
// //         <Route
// //           path="/donor-home"
// //           element={
// //             token && !isTokenExpired && userRole === 'donor' ? (
// //               <DonorHome />
// //             ) : (
// //               <Navigate to="/signin" /> // Redirect to SignIn if token is invalid or expired or role is not donor
// //             )
// //           }
// //         />

// //         {/* Blood Bank Home route */}
// //         <Route
// //           path="/bloodbank-home"
// //           element={
// //             token && !isTokenExpired && userRole === 'bloodBank' ? (
// //               <BloodBankHome />
// //             ) : (
// //               <Navigate to="/signin" /> // Redirect to SignIn if token is invalid or expired or role is not blood bank
// //             )
// //           }
// //         />
// //       </Routes>
// //     </Router>
// //   );
// // }


// function App()
// {
//   <>
//   <Home/>
//   </>
// }
// export default App;



import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/Home';
import UserSignUp from './Components/SignUpUser';
import SignInUser from './Components/SignInUser';
import BloodBankListPage from './Components/UserHomePage';
import BloodBankHomePage from './Components/BloodBankHome';
import BloodCampForm from './Components/BloodCampForm';
// import SomeOtherPage from './SomeOtherPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path='/user/signup' element={<UserSignUp/>}/>
        <Route exact path='/user/signin' element={<SignInUser/>}/>
        <Route exact path='/user/home' element={<BloodBankListPage/>}/>
        <Route exact path='/admin/home' element={<BloodBankHomePage/>}/>
        <Route exact path='/admin/camp_form' element={<BloodCampForm/>}/>
      </Routes>
    </Router>
  );
}

export default App;

