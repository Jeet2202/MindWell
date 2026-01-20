import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import StudentDashboard from './pages/StudentDashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import LearnPage from './pages/LearnPage'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/doctor" element={<DoctorDashboard />} />
        <Route path="/learn" element={<LearnPage />} />
      </Routes>
    </Router>
  )
}

export default App
