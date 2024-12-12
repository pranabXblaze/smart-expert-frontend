import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/sonner';
import HomePage from './components/HomePage/Home';
import Navbar from '@/components/layout/Navbar';
import Dashboard from '@/components/dashboard/Dashboard';
import ExpertManagement from '@/components/experts/ExpertManagement';
import CandidateManagement from '@/components/candidates/CandidateManagement';
import BoardManagement from '@/components/boards/BoardManagement';
import MatchingSystem from '@/components/matching/MatchingSystem';
import Login from '@/components/auth/Login';
import Register from '@/components/auth/Register';
import Footer from './components/layout/Footer';
import AdminDashboard from './components/search/search';
import InterviewMatcher from './components/score/score';


function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="drdo-theme">
      <Router>
        <div className="min-h-screen dark:bg-[#59545bfb] bg-gradient-to-br from-[#96addd] via-[#e5e7eb] to-[#174ebc]">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path='/search' element={<AdminDashboard/>}/>
              <Route path='/score' element= {<InterviewMatcher/>}/>
              <Route path="/" element={<HomePage />} />
              <Route path='/dashboard' element={<Dashboard />} key='dashboard'/>
              <Route path="/experts" element={<ExpertManagement />} />
              <Route path="/candidates" element={<CandidateManagement />} />
              <Route path="/boards" element={<BoardManagement />} />
              <Route path="/matching" element={<MatchingSystem />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer/>
        </div>
        <Toaster />
      </Router>
    </ThemeProvider>
  );
}

export default App;