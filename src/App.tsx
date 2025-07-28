
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Dashboard } from './components/sections/Dashboard';
import { Users } from './components/sections/Users';
import { Creators } from './components/sections/Creators';
import { Sellers } from './components/sections/Sellers';
import { VideoAds } from './components/sections/VideoAds';
import { PayLudo } from './components/sections/PayLudo';
import { TipCall } from './components/sections/TipCall';
import { Withdrawals } from './components/sections/Withdrawals';
import { AnalyticsReports } from './components/sections/AnalyticsReports';
import { Wallet } from './components/sections/Wallet';
import { Support } from './components/sections/Support';
import { Settings } from './components/sections/Settings';
import { AdminRoles } from './components/sections/AdminRoles';
import { Profile } from './components/sections/Profile';
import { SearchResultDetail } from './components/sections/SearchResultDetail';
import { UserProfile } from './pages/UserProfile';
import NotFound from './pages/NotFound';
import './App.css';

interface SearchResult {
  id: string;
  type: 'user' | 'transaction' | 'content' | 'withdrawal';
  title: string;
  description: string;
  status?: string;
  amount?: number;
  date?: string;
  category?: string;
}

function App() {
  const [currentSection, setCurrentSection] = useState('dashboard');
  const [showProfile, setShowProfile] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSearchResultClick = (result: SearchResult) => {
    console.log('Global search result click:', result);
    
    // Navigate to appropriate section based on result type
    switch (result.type) {
      case 'user':
        setCurrentSection('users');
        break;
      case 'transaction':
      case 'withdrawal':
        setCurrentSection('withdrawals');
        break;
      case 'content':
        setCurrentSection('video-ads');
        break;
      default:
        break;
    }
  };

  const renderContent = () => {
    if (showProfile) {
      return <Profile onBack={() => setShowProfile(false)} />;
    }

    switch (currentSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      case 'creators':
        return <Creators />;
      case 'sellers':
        return <Sellers />;
      case 'video-ads':
        return <VideoAds />;
      case 'pay-ludo':
        return <PayLudo />;
      case 'tip-call':
        return <TipCall />;
      case 'withdrawals':
        return <Withdrawals />;
      case 'analytics':
        return <AnalyticsReports />;
      case 'wallet':
        return <Wallet />;
      case 'support':
        return <Support />;
      case 'settings':
        return <Settings />;
      case 'admin-roles':
        return <AdminRoles />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/user/:userId" element={<UserProfile />} />
        <Route path="/" element={
          <div className="flex h-screen bg-gray-50 w-screen">
            <Sidebar 
              activeSection={currentSection}
              onSectionChange={setCurrentSection}
              isCollapsed={isCollapsed}
              onToggle={() => setIsCollapsed(!isCollapsed)}
            />
            <div className="flex-1 flex flex-col overflow-hidden min-w-0">
              <Header 
                onProfileClick={() => setShowProfile(true)}
                onSearchResultClick={handleSearchResultClick}
              />
              <main className="flex-1 overflow-y-auto">
                {renderContent()}
              </main>
            </div>
          </div>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
