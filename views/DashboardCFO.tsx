import React, { useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { MOCK_CASH_FLOW, MOCK_REVENUE_BY_SERVICE } from '../constants';
import { TrendingUp, TrendingDown, DollarSign, Wallet, BrainCircuit } from 'lucide-react';
import { generateForecastingInsight } from '../services/geminiService';

const COLORS = ['#0ea5e9', '#22c55e', '#eab308', '#f97316', '#ef4444', '#8b5cf6'];

const DashboardCFO: React.FC = () => {
  const [aiInsight, setAiInsight] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  const handleAiAnalysis = async () => {
    setIsLoadingAi(true);
    const context = {
        cashFlow: MOCK_CASH_FLOW,
        revenue: MOCK_REVENUE_BY_SERVICE
    };
    const insight = await generateForecastingInsight(context, 'CFO');
    setAiInsight(insight);
    setIsLoadingAi(false);
  };

  const MetricCard = ({ title, value, subtext, trend, isPositive }: any) => (
    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900 mt-2">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${isPositive ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
           {isPositive ? <TrendingUp size={20} /> : <TrendingDown size={20} />}
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className={`font-medium ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend}%
        </span>
        <span className="text-slate-400 ml-2">{subtext}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard title="Total Revenue (YTD)" value="$4.2M" subtext="vs last year" trend={+12.5} isPositive={true} />
        <MetricCard title="Net Profit Margin" value="18.2%" subtext="vs last month" trend={-1.2} isPositive={false} />
        <MetricCard title="Aged Receivables" value="$850k" subtext="> 90 days" trend={+5.3} isPositive={false} />
      </div>

      {/* AI Forecasting Section */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-6 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-500/20 rounded-lg border border-indigo-500/30">
                <BrainCircuit className="text-indigo-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">AI Financial Forecasting</h3>
                <p className="text-slate-400 text-sm">Powered by Gemini 2.5 Flash</p>
              </div>
            </div>
            <button 
              onClick={handleAiAnalysis}
              disabled={isLoadingAi}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {isLoadingAi ? 'Analyzing...' : 'Generate Forecast'}
            </button>
          </div>
          
          {aiInsight && (
            <div className="mt-6 p-4 bg-white/10 rounded-lg border border-white/10 backdrop-blur-sm animate-fade-in">
              <p className="text-indigo-100 leading-relaxed">{aiInsight}</p>
            </div>
          )}
        </div>
        {/* Abstract Background Decoration */}
        <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Charts Grid - Mimicking Google Studio / Looker Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Cash Flow Area Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <Wallet size={18} className="text-slate-400" />
              Cash Flow Analysis
            </h3>
            <select className="bg-slate-50 border-none text-sm text-slate-500 rounded-md focus:ring-0">
              <option>Last 6 Months</option>
            </select>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_CASH_FLOW}>
                <defs>
                  <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Area type="monotone" dataKey="inflow" stroke="#22c55e" strokeWidth={2} fillOpacity={1} fill="url(#colorInflow)" />
                <Area type="monotone" dataKey="outflow" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorOutflow)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Breakdown Bar Chart */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
           <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
              <DollarSign size={18} className="text-slate-400" />
              Revenue per Service Line
            </h3>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_REVENUE_BY_SERVICE} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f1f5f9" />
                <XAxis type="number" hide />
                <YAxis dataKey="service" type="category" width={100} axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '8px'}} />
                <Bar dataKey="revenue" radius={[0, 4, 4, 0]} barSize={24}>
                  {MOCK_REVENUE_BY_SERVICE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCFO;
