import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Components/Home';
import UserSignUp from './Components/SignUpUser';
import SignInUser from './Components/SignInUser';
import BloodBankListPage from './Components/UserHomePage';
import BloodBankHomePage from './Components/BloodBankHome';
import BloodCampForm from './Components/BloodCampForm';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './PrivateRoute';
import UserProfile from './Components/UserProfile';
import AboutPage from './Components/About';
import AdminSignUpPage from './Components/AdminSignUp';
import AdminSignIn from './Components/AdminSignIn';
import AdminProfilePage from './Components/AdminProfile';
import BloodBankDetailPage from './Components/BloodBankDetails';


function App() {
  return (
    <div>
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/user/signup" element={<UserSignUp />} />
          <Route exact path="/user/signin" element={<SignInUser />} />
          <Route exact path="/user/home" element={
            <PrivateRoute requiredRole="user">
              <BloodBankListPage />
            </PrivateRoute>
          } />
          <Route exact path="/admin/home" element={
            <PrivateRoute requiredRole="admin">
              <BloodBankHomePage />
            </PrivateRoute>
          } />
          <Route exact path="/admin/camp_form" element={
            <PrivateRoute requiredRole="admin">
              <BloodCampForm />
            </PrivateRoute>
          } />
          <Route exact path="/user/profile" element={
            <PrivateRoute requiredRole="user">
              <UserProfile />
            </PrivateRoute>
          } />
          <Route exact path="/about" element={<AboutPage />} />
          <Route exact path="/admin/signup" element={<AdminSignUpPage />} />
          <Route exact path="/admin/signin" element={<AdminSignIn />} />
          <Route exact path="/admin/profile" element={
            <PrivateRoute requiredRole="admin">
              <AdminProfilePage />
            </PrivateRoute>
          } />
          <Route exact path='/user/bankdetails/:id' element={
            <PrivateRoute requiredRole="user">
              <BloodBankDetailPage/>
            </PrivateRoute>
          }/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;

