export enum ViewState {
  DASHBOARD_CFO = 'DASHBOARD_CFO',
  DASHBOARD_COO = 'DASHBOARD_COO',
  PATIENT_REGISTRATION = 'PATIENT_REGISTRATION',
  PATIENT_LIST = 'PATIENT_LIST',
  PHARMACY_INVENTORY = 'PHARMACY_INVENTORY'
}

export interface FinancialMetric {
  name: string;
  value: number;
  trend: number; // Percentage change
  isPositive: boolean;
}

export interface ServiceRevenue {
  service: string;
  revenue: number;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  batchNumber: string;
  stockLevel: number;
  unit: string;
  expiryDate: string;
  status: 'In Stock' | 'Low Stock' | 'Critical' | 'Expired';
}

export interface PatientQueueItem {
  id: string;
  name: string;
  triageLevel: 'Green' | 'Yellow' | 'Red';
  waitTimeMinutes: number;
  department: string;
}

export interface Patient {
  mrn: string; // Medical Record Number
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  phone: string;
  lastVisit: string;
  status: 'Admitted' | 'Outpatient' | 'Discharged';
  insuranceProvider: string;
}

export interface CashFlowData {
  month: string;
  inflow: number;
  outflow: number;
}
