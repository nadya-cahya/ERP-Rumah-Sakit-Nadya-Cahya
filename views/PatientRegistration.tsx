import React, { useState } from 'react';
import { UserPlus, Save, Loader2, Check } from 'lucide-react';

const PatientRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dob: '',
    insuranceId: '',
    triageLevel: 'Green',
    symptoms: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Simulate "Edge Function" cold start or processing latency
    // In a real Headless architecture, this would hit an API endpoint defined in OpenAPI
    await new Promise(resolve => setTimeout(resolve, 800)); 
    
    setStatus('success');
    // Reset after 2 seconds
    setTimeout(() => {
        setStatus('idle');
        setFormData({ firstName: '', lastName: '', dob: '', insuranceId: '', triageLevel: 'Green', symptoms: '' });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="bg-slate-50 px-8 py-6 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <UserPlus size={24} className="text-blue-600" />
            New Patient Admission
          </h2>
          <p className="text-slate-500 text-sm mt-1">Enter patient demographics and triage details. Data syncs to GCP instantly.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">First Name</label>
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="e.g. Jane"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Last Name</label>
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="e.g. Doe"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Date of Birth</label>
              <input 
                type="date" 
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Insurance ID</label>
              <input 
                type="text" 
                name="insuranceId"
                value={formData.insuranceId}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Triage Priority</label>
              <select 
                name="triageLevel"
                value={formData.triageLevel}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              >
                <option value="Green">Green (Standard)</option>
                <option value="Yellow">Yellow (Urgent)</option>
                <option value="Red">Red (Critical)</option>
              </select>
            </div>
            <div className="space-y-2">
                 <label className="text-sm font-semibold text-slate-700">Presenting Symptoms</label>
                 <textarea 
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleChange}
                    rows={1}
                    className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Brief description..."
                 />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button 
              type="submit"
              disabled={status !== 'idle'}
              className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold text-white transition-all
                ${status === 'success' ? 'bg-green-500 hover:bg-green-600' : 'bg-blue-600 hover:bg-blue-700'}
                ${status === 'submitting' ? 'opacity-80 cursor-wait' : ''}
              `}
            >
               {status === 'submitting' && <Loader2 size={20} className="animate-spin" />}
               {status === 'success' && <Check size={20} />}
               <span>{status === 'submitting' ? 'Registering...' : status === 'success' ? 'Registered' : 'Register Patient'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientRegistration;
