import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Activity, Users, Pill, Settings, LogOut, Hexagon, ClipboardList } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentView, onNavigate }) => {
  
  const NavItem = ({ view, icon: Icon, label }: { view: ViewState; icon: any; label: string }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => onNavigate(view)}
        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
          isActive 
            ? 'bg-blue-600/10 text-blue-700 font-medium border-r-2 border-blue-600' 
            : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
        }`}
      >
        <Icon size={20} className={isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'} />
        <span>{label}</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex-shrink-0 z-10 flex flex-col h-screen">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <div className="bg-blue-600 p-1.5 rounded-lg mr-3">
            <Hexagon className="text-white" size={20} fill="currentColor" />
          </div>
          <span className="text-lg font-bold text-slate-800 tracking-tight">NexusHealth</span>
        </div>

        <div className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
          <div className="px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Dashboards</div>
          <NavItem view={ViewState.DASHBOARD_CFO} icon={LayoutDashboard} label="Financial (CFO)" />
          <NavItem view={ViewState.DASHBOARD_COO} icon={Activity} label="Operations (COO)" />

          <div className="mt-8 px-4 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Modules</div>
          <NavItem view={ViewState.PATIENT_REGISTRATION} icon={Users} label="Patient Registration" />
          <NavItem view={ViewState.PATIENT_LIST} icon={ClipboardList} label="Patient List" />
          <NavItem view={ViewState.PHARMACY_INVENTORY} icon={Pill} label="Pharmacy & Inventory" />
        </div>

        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center space-x-3 px-4 py-2 text-slate-500 hover:text-slate-900 w-full transition-colors">
            <Settings size={18} />
            <span className="text-sm">System Config</span>
          </button>
          <button className="flex items-center space-x-3 px-4 py-2 text-slate-500 hover:text-slate-900 w-full transition-colors mt-1">
            <LogOut size={18} />
            <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-20 border-b border-slate-200 px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-slate-800">
            {currentView === ViewState.DASHBOARD_CFO && "Financial Overview"}
            {currentView === ViewState.DASHBOARD_COO && "Hospital Operations Center"}
            {currentView === ViewState.PATIENT_REGISTRATION && "Patient Admission"}
            {currentView === ViewState.PATIENT_LIST && "Medical Records (Master)"}
            {currentView === ViewState.PHARMACY_INVENTORY && "Inventory Management"}
          </h1>
          <div className="flex items-center space-x-4">
             <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-600">
               JD
             </div>
             <div className="text-sm text-right hidden md:block">
               <p className="font-medium text-slate-900">John Doe</p>
               <p className="text-xs text-slate-500">Administrator</p>
             </div>
          </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
