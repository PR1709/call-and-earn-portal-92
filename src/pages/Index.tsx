
import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { Dashboard } from '../components/sections/Dashboard';
import { Users } from '../components/sections/Users';
import { Creators } from '../components/sections/Creators';
import { VideoAds } from '../components/sections/VideoAds';
import { AnalyticsReports } from '../components/sections/AnalyticsReports';
import { PayLudo } from '../components/sections/PayLudo';
import { Wallet } from '../components/sections/Wallet';
import { Withdrawals } from '../components/sections/Withdrawals';
import { TipCall } from '../components/sections/TipCall';
import { Sellers } from '../components/sections/Sellers';
import { Support } from '../components/sections/Support';
import { Settings } from '../components/sections/Settings';
import { AdminRoles } from '../components/sections/AdminRoles';
import { Profile } from '../components/sections/Profile';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleProfileClick = () => {
    setActiveSection('profile');
  };

  const handleBackToDashboard = () => {
    setActiveSection('dashboard');
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <Users />;
      case 'creators':
        return <Creators />;
      case 'video-ads':
        return <VideoAds />;
      case 'analytics':
        return <AnalyticsReports />;
      case 'pay-ludo':
        return <PayLudo />;
      case 'sellers':
        return <Sellers />;
      case 'wallet':
        return <Wallet />;
      case 'withdrawals':
        return <Withdrawals />;
      case 'tipcall':
        return <TipCall />;
      case 'support':
        return <Support />;
      case 'admin-roles':
        return <AdminRoles />;
      case 'settings':
        return <Settings />;
      case 'profile':
        return <Profile onBack={handleBackToDashboard} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex w-screen overflow-hidden">
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header onProfileClick={handleProfileClick} />
        
        <main className="flex-1 overflow-auto">
          {renderSection()}
        </main>
      </div>
    </div>
  );
};

export default Index;
