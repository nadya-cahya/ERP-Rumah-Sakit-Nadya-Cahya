import { InventoryItem, PatientQueueItem, ServiceRevenue, CashFlowData, Patient } from './types';

export const MOCK_REVENUE_BY_SERVICE: ServiceRevenue[] = [
  { service: 'Inpatient Care', revenue: 450000 },
  { service: 'Surgery', revenue: 320000 },
  { service: 'Radiology', revenue: 150000 },
  { service: 'Outpatient', revenue: 120000 },
  { service: 'Pharmacy', revenue: 95000 },
  { service: 'Laboratory', revenue: 80000 },
];

export const MOCK_CASH_FLOW: CashFlowData[] = [
  { month: 'Jan', inflow: 850, outflow: 700 },
  { month: 'Feb', inflow: 900, outflow: 720 },
  { month: 'Mar', inflow: 880, outflow: 750 },
  { month: 'Apr', inflow: 950, outflow: 730 },
  { month: 'May', inflow: 1100, outflow: 800 },
  { month: 'Jun', inflow: 1050, outflow: 790 },
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'RX-001', name: 'Amoxicillin 500mg', category: 'Antibiotics', batchNumber: 'BATCH-992', stockLevel: 4500, unit: 'Capsules', expiryDate: '2025-12-01', status: 'In Stock' },
  { id: 'RX-002', name: 'Insulin Glargine', category: 'Diabetic', batchNumber: 'BATCH-104', stockLevel: 120, unit: 'Vials', expiryDate: '2024-06-15', status: 'Low Stock' },
  { id: 'RX-003', name: 'Propofol 200mg', category: 'Anesthetics', batchNumber: 'BATCH-773', stockLevel: 15, unit: 'Vials', expiryDate: '2024-05-20', status: 'Critical' },
  { id: 'RX-004', name: 'Paracetamol IV', category: 'Analgesics', batchNumber: 'BATCH-882', stockLevel: 200, unit: 'Bags', expiryDate: '2023-12-30', status: 'Expired' },
  { id: 'RX-005', name: 'Atorvastatin 20mg', category: 'Cardio', batchNumber: 'BATCH-331', stockLevel: 3000, unit: 'Tablets', expiryDate: '2026-01-15', status: 'In Stock' },
];

export const MOCK_PATIENT_QUEUE: PatientQueueItem[] = [
  { id: 'P-1029', name: 'Sarah Connor', triageLevel: 'Red', waitTimeMinutes: 2, department: 'Emergency' },
  { id: 'P-1030', name: 'John Doe', triageLevel: 'Yellow', waitTimeMinutes: 45, department: 'Orthopedics' },
  { id: 'P-1031', name: 'Jane Smith', triageLevel: 'Green', waitTimeMinutes: 12, department: 'General Practice' },
  { id: 'P-1032', name: 'Michael Bay', triageLevel: 'Yellow', waitTimeMinutes: 30, department: 'Radiology' },
];

export const MOCK_PATIENTS: Patient[] = [
  { mrn: 'MRN-2024-001', name: 'Sarah Connor', age: 34, gender: 'Female', phone: '+1 (555) 010-9988', lastVisit: '2024-05-20', status: 'Admitted', insuranceProvider: 'BlueCross' },
  { mrn: 'MRN-2024-045', name: 'John Doe', age: 45, gender: 'Male', phone: '+1 (555) 012-3344', lastVisit: '2024-05-18', status: 'Outpatient', insuranceProvider: 'Aetna' },
  { mrn: 'MRN-2023-882', name: 'Emily Blunt', age: 29, gender: 'Female', phone: '+1 (555) 998-2211', lastVisit: '2024-02-10', status: 'Discharged', insuranceProvider: 'Medicare' },
  { mrn: 'MRN-2024-112', name: 'Robert Downey', age: 52, gender: 'Male', phone: '+1 (555) 443-1122', lastVisit: '2024-05-21', status: 'Admitted', insuranceProvider: 'Private Pay' },
  { mrn: 'MRN-2024-099', name: 'Natasha Romanoff', age: 31, gender: 'Female', phone: '+1 (555) 667-8899', lastVisit: '2024-05-15', status: 'Outpatient', insuranceProvider: 'UnitedHealth' },
  { mrn: 'MRN-2023-554', name: 'Bruce Banner', age: 48, gender: 'Male', phone: '+1 (555) 332-1100', lastVisit: '2024-01-05', status: 'Discharged', insuranceProvider: 'BlueCross' },
];
