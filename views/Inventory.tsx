import React from 'react';
import { MOCK_INVENTORY } from '../constants';
import { Package, Search, Filter } from 'lucide-react';

const Inventory: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by SKU, Name or Batch..." 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-blue-500 outline-none"
                />
           </div>
           <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50">
               <Filter size={18} />
               <span>Filter Stock</span>
           </button>
       </div>

       <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
           <table className="w-full text-left border-collapse">
               <thead>
                   <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-semibold tracking-wider">
                       <th className="px-6 py-4">Item Name</th>
                       <th className="px-6 py-4">Category</th>
                       <th className="px-6 py-4">Batch #</th>
                       <th className="px-6 py-4">Expiry</th>
                       <th className="px-6 py-4 text-right">Stock Level</th>
                       <th className="px-6 py-4 text-center">Status</th>
                   </tr>
               </thead>
               <tbody className="divide-y divide-slate-100">
                   {MOCK_INVENTORY.map((item) => (
                       <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                           <td className="px-6 py-4">
                               <div className="flex items-center">
                                   <div className="h-8 w-8 rounded bg-slate-100 flex items-center justify-center text-slate-400 mr-3 group-hover:bg-blue-100 group-hover:text-blue-500 transition-colors">
                                       <Package size={16} />
                                   </div>
                                   <div>
                                       <div className="font-medium text-slate-900">{item.name}</div>
                                       <div className="text-xs text-slate-500">{item.id}</div>
                                   </div>
                               </div>
                           </td>
                           <td className="px-6 py-4 text-sm text-slate-600">{item.category}</td>
                           <td className="px-6 py-4 text-sm font-mono text-slate-500">{item.batchNumber}</td>
                           <td className="px-6 py-4 text-sm text-slate-600">{item.expiryDate}</td>
                           <td className="px-6 py-4 text-right font-medium text-slate-800">
                               {item.stockLevel} <span className="text-xs text-slate-400 font-normal ml-1">{item.unit}</span>
                           </td>
                           <td className="px-6 py-4 text-center">
                               <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                   ${item.status === 'In Stock' ? 'bg-green-100 text-green-800' : ''}
                                   ${item.status === 'Low Stock' ? 'bg-yellow-100 text-yellow-800' : ''}
                                   ${item.status === 'Critical' ? 'bg-red-100 text-red-800' : ''}
                                   ${item.status === 'Expired' ? 'bg-slate-100 text-slate-600 line-through' : ''}
                               `}>
                                   {item.status}
                               </span>
                           </td>
                       </tr>
                   ))}
               </tbody>
           </table>
       </div>
    </div>
  );
};

export default Inventory;
