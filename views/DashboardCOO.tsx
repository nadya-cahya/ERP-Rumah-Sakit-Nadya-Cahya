import React, { useState, useEffect } from 'react';
import { MOCK_PATIENT_QUEUE, MOCK_INVENTORY } from '../constants';
import { Clock, AlertTriangle, Activity, BedDouble, CheckCircle } from 'lucide-react';
import { generateForecastingInsight } from '../services/geminiService';

const DashboardCOO: React.FC = () => {
    const [aiInsight, setAiInsight] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    // Simulate real-time updates for bed utilization
    const [bedUtilization, setBedUtilization] = useState(78);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setBedUtilization(prev => {
                const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
                return Math.min(Math.max(prev + change, 60), 98);
            });
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    const runAiOptimization = async () => {
        setIsAnalyzing(true);
        const context = {
            queue: MOCK_PATIENT_QUEUE,
            currentBedUtilization: bedUtilization,
            criticalInventory: MOCK_INVENTORY.filter(i => i.status === 'Critical' || i.status === 'Low Stock')
        };
        const insight = await generateForecastingInsight(context, 'COO');
        setAiInsight(insight);
        setIsAnalyzing(false);
    };

    const criticalItems = MOCK_INVENTORY.filter(i => i.status === 'Critical' || i.status === 'Expired');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-lg font-semibold text-slate-700">Operational Real-time Status</h2>
                    <p className="text-sm text-slate-500">Live view of hospital capacity and throughput</p>
                </div>
                <button 
                    onClick={runAiOptimization}
                    disabled={isAnalyzing}
                    className="flex items-center gap-2 text-sm font-medium text-blue-600 bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                    <Activity size={16} className={isAnalyzing ? "animate-spin" : ""} />
                    {isAnalyzing ? "Optimizing..." : "Analyze Efficiency with AI"}
                </button>
            </div>

            {aiInsight && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg animate-fade-in">
                    <div className="flex items-start">
                        <div className="flex-shrink-0">
                            <Activity className="h-5 w-5 text-blue-500" />
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-blue-700">{aiInsight}</p>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Bed Utilization Gauge Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 via-yellow-500 to-red-500"></div>
                    <BedDouble size={40} className="text-slate-300 mb-4" />
                    <h3 className="text-4xl font-bold text-slate-800">{bedUtilization}%</h3>
                    <p className="text-slate-500 font-medium">Bed Utilization Rate</p>
                    <span className="text-xs text-slate-400 mt-2">Target: &lt; 85%</span>
                    
                    {bedUtilization > 85 && (
                        <div className="mt-4 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold animate-pulse">
                            Capacity Warning
                        </div>
                    )}
                </div>

                {/* Patient Wait Times */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm col-span-2">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Clock size={18} className="text-slate-400" />
                            Current Wait Times
                        </h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-slate-500 uppercase bg-slate-50/50">
                                <tr>
                                    <th className="px-4 py-3">Patient ID</th>
                                    <th className="px-4 py-3">Department</th>
                                    <th className="px-4 py-3">Triage</th>
                                    <th className="px-4 py-3 text-right">Wait Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_PATIENT_QUEUE.map((patient) => (
                                    <tr key={patient.id} className="border-b border-slate-50 hover:bg-slate-50">
                                        <td className="px-4 py-3 font-medium text-slate-700">{patient.id}</td>
                                        <td className="px-4 py-3 text-slate-600">{patient.department}</td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold
                                                ${patient.triageLevel === 'Red' ? 'bg-red-100 text-red-700' : 
                                                  patient.triageLevel === 'Yellow' ? 'bg-yellow-100 text-yellow-700' : 
                                                  'bg-green-100 text-green-700'}`}>
                                                {patient.triageLevel}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-right font-mono text-slate-700">{patient.waitTimeMinutes} min</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Operational Alerts */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm col-span-1 lg:col-span-3">
                     <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <AlertTriangle size={18} className="text-slate-400" />
                            Critical Inventory Alerts
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {criticalItems.map((item) => (
                            <div key={item.id} className="border border-red-100 bg-red-50/50 rounded-lg p-4 flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-red-900">{item.name}</p>
                                    <p className="text-xs text-red-700 mt-1">Batch: {item.batchNumber}</p>
                                    <p className="text-xs text-red-600 mt-1">Expires: {item.expiryDate}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-red-800">{item.stockLevel}</p>
                                    <p className="text-xs text-red-600 uppercase">{item.unit}</p>
                                </div>
                            </div>
                        ))}
                         {criticalItems.length === 0 && (
                             <div className="col-span-3 py-8 text-center text-slate-400 flex flex-col items-center">
                                 <CheckCircle size={32} className="mb-2 text-green-500" />
                                 <p>All operational inventory levels within safety margins.</p>
                             </div>
                         )}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default DashboardCOO;
