import React, { useState } from 'react';
import { MOCK_PATIENTS } from '../constants';
import { Search, Filter, User, Phone, Calendar, FileText, MoreHorizontal } from 'lucide-react';

const PatientList: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = MOCK_PATIENTS.filter(patient => 
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.mrn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search MRN or Patient Name..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
           </div>
           <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50">
               <Filter size={18} />
               <span>Filter List</span>
           </button>
       </div>

       <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
           <table className="w-full text-left border-collapse">
               <thead>
                   <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                       <th className="px-6 py-4">Patient Identity</th>
                       <th className="px-6 py-4">Contact & Insurance</th>
                       <th className="px-6 py-4">Status</th>
                       <th className="px-6 py-4">Last Visit</th>
                       <th className="px-6 py-4 text-center">Actions</th>
                   </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                   {filteredPatients.map((patient) => (
                       <tr key={patient.mrn} className="hover:bg-slate-50 transition-colors group">
                           <td className="px-6 py-4">
                               <div className="flex items-center">
                                   <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mr-3 group-hover:bg-blue-100 group-hover:text-blue-500 transition-colors">
                                       <User size={18} />
                                   </div>
                                   <div>
                                       <div className="font-medium text-slate-900">{patient.name}</div>
                                       <div className="text-xs text-slate-500 flex items-center gap-1">
                                           <FileText size={10} />
                                           {patient.mrn} • {patient.age}y / {patient.gender === 'Male' ? 'M' : 'F'}
                                       </div>
                                   </div>
                               </div>
                           </td>
                           <td className="px-6 py-4">
                               <div className="flex flex-col space-y-1">
                                    <div className="flex items-center text-sm text-slate-600">
                                        <Phone size={12} className="mr-1.5 text-slate-400" />
                                        {patient.phone}
                                    </div>
                                    <div className="text-xs text-slate-500 px-2 py-0.5 bg-slate-100 rounded-md w-fit">
                                        {patient.insuranceProvider}
                                    </div>
                               </div>
                           </td>
                           <td className="px-6 py-4">
                               <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                   ${patient.status === 'Admitted' ? 'bg-green-100 text-green-800' : ''}
                                   ${patient.status === 'Outpatient' ? 'bg-blue-100 text-blue-800' : ''}
                                   ${patient.status === 'Discharged' ? 'bg-slate-100 text-slate-600' : ''}
                               `}>
                                   <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                                      ${patient.status === 'Admitted' ? 'bg-green-500' : ''}
                                      ${patient.status === 'Outpatient' ? 'bg-blue-500' : ''}
                                      ${patient.status === 'Discharged' ? 'bg-slate-400' : ''}
                                   `}></span>
                                   {patient.status}
                               </span>
                           </td>
                           <td className="px-6 py-4 text-sm text-slate-600">
                                <div className="flex items-center">
                                    <Calendar size={14} className="mr-2 text-slate-400" />
                                    {patient.lastVisit}
                                </div>
                           </td>
                           <td className="px-6 py-4 text-center">
                               <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                                   <MoreHorizontal size={18} />
                               </button>
                           </td>
                       </tr>
                   ))}
               </tbody>
           </table>
       </div>
    </div>
  );
};

export default PatientList;
