import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import MaintenanceForm from './pages/MaintenanceForm';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './contexts/AuthContext';
import AdminRegister from './pages/AdminRegister';

function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/maintenance" element={<MaintenanceForm />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/register" element={<AdminRegister />} />
      </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App;
