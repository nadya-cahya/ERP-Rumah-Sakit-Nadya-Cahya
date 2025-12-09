import React, { useState } from 'react';
import Layout from './components/Layout';
import DashboardCFO from './views/DashboardCFO';
import DashboardCOO from './views/DashboardCOO';
import PatientRegistration from './views/PatientRegistration';
import PatientList from './views/PatientList';
import Inventory from './views/Inventory';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD_CFO);

  const renderView = () => {
    switch (currentView) {
      case ViewState.DASHBOARD_CFO:
        return <DashboardCFO />;
      case ViewState.DASHBOARD_COO:
        return <DashboardCOO />;
      case ViewState.PATIENT_REGISTRATION:
        return <PatientRegistration />;
      case ViewState.PATIENT_LIST:
        return <PatientList />;
      case ViewState.PHARMACY_INVENTORY:
        return <Inventory />;
      default:
        return <DashboardCFO />;
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={setCurrentView}>
      {renderView()}
    </Layout>
  );
};

export default App;
