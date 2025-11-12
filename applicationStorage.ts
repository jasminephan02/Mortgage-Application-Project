// Utility to manage submitted applications in localStorage

export interface SubmittedApplication {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  ssn: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  propertyAddress?: string;
  propertyCity?: string;
  propertyState?: string;
  propertyZipCode?: string;
  propertyType?: string;
  loanPurpose?: string;
  purchasePrice?: string;
  downPayment?: string;
  loanAmount?: string;
  loanTerm?: string;
  occupancy?: string;
  loanType?: string;
  annualIncome?: string;
  incomeSource?: string;
  liquidAssets?: string;
  retirementAssets?: string;
  additionalIncome?: string;
  existingDebt?: string;
  monthlyRent?: string;
  employmentStatus?: string;
  employer?: string;
  jobTitle?: string;
  yearsEmployed?: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  approvedDate?: string;
  rejectedDate?: string;
  approvedAmount?: string;
  interestRate?: string;
  rejectionReason?: string;
  creditScore?: number;
  dti?: string;
}

const STORAGE_KEY = 'mortgage_applications';

export function saveApplication(formData: any): string {
  const applications = getApplications();
  
  // Generate application ID
  const id = `APP-${String(applications.length + 1).padStart(3, '0')}`;
  
  // Create application object
  const application: SubmittedApplication = {
    id,
    firstName: formData.firstName || '',
    lastName: formData.lastName || '',
    email: formData.email || '',
    phone: formData.phone || '',
    dateOfBirth: formData.dateOfBirth || '',
    ssn: formData.ssn || '',
    address: formData.address || '',
    city: formData.city || '',
    state: formData.state || '',
    zipCode: formData.zipCode || '',
    propertyAddress: formData.propertyAddress,
    propertyCity: formData.propertyCity,
    propertyState: formData.propertyState,
    propertyZipCode: formData.propertyZipCode,
    propertyType: formData.propertyType,
    loanPurpose: formData.loanPurpose,
    purchasePrice: formData.purchasePrice,
    downPayment: formData.downPayment,
    loanAmount: formData.loanAmount,
    loanTerm: formData.loanTerm,
    occupancy: formData.occupancy,
    loanType: formData.loanType,
    annualIncome: formData.annualIncome,
    incomeSource: formData.incomeSource,
    liquidAssets: formData.liquidAssets,
    retirementAssets: formData.retirementAssets,
    additionalIncome: formData.additionalIncome,
    existingDebt: formData.existingDebt,
    monthlyRent: formData.monthlyRent,
    employmentStatus: formData.employmentStatus,
    employer: formData.employer,
    jobTitle: formData.jobTitle,
    yearsEmployed: formData.yearsEmployed,
    status: 'pending',
    submittedDate: new Date().toISOString().split('T')[0],
    // Estimate credit score based on data (mock calculation)
    creditScore: estimateCreditScore(formData),
    // Calculate DTI
    dti: calculateDTI(formData),
  };
  
  applications.push(application);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  
  return id;
}

export function getApplications(): SubmittedApplication[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function updateApplicationStatus(
  id: string, 
  status: 'approved' | 'rejected',
  details: { approvedAmount?: string; interestRate?: string; rejectionReason?: string }
): void {
  const applications = getApplications();
  const index = applications.findIndex(app => app.id === id);
  
  if (index !== -1) {
    applications[index].status = status;
    
    if (status === 'approved') {
      applications[index].approvedDate = new Date().toISOString().split('T')[0];
      applications[index].approvedAmount = details.approvedAmount;
      applications[index].interestRate = details.interestRate || '6.5%';
    } else {
      applications[index].rejectedDate = new Date().toISOString().split('T')[0];
      applications[index].rejectionReason = details.rejectionReason;
    }
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  }
}

export function clearAllApplications(): void {
  localStorage.removeItem(STORAGE_KEY);
}

// Helper functions
function estimateCreditScore(formData: any): number {
  // Mock credit score estimation based on form data
  let score = 700; // Base score
  
  const income = parseFloat((formData.annualIncome || '0').replace(/[^\d.]/g, ''));
  if (income > 100000) score += 50;
  else if (income > 75000) score += 30;
  else if (income < 40000) score -= 50;
  
  if (formData.bankruptcyHistory) score -= 100;
  if (formData.foreclosureHistory) score -= 80;
  
  const liquidAssets = parseFloat((formData.liquidAssets || '0').replace(/[^\d.]/g, ''));
  if (liquidAssets > 100000) score += 30;
  else if (liquidAssets > 50000) score += 15;
  
  return Math.min(Math.max(score, 300), 850); // Keep within valid range
}

function calculateDTI(formData: any): string {
  const income = parseFloat((formData.annualIncome || '0').replace(/[^\d.]/g, ''));
  const monthlyIncome = income / 12;
  
  if (monthlyIncome === 0) return 'N/A';
  
  const monthlyDebt = parseFloat((formData.existingDebt || '0').replace(/[^\d.]/g, ''));
  const housingPayment = parseFloat((formData.monthlyRent || '0').replace(/[^\d.]/g, ''));
  
  // Estimate new mortgage payment
  const loanAmount = parseFloat((formData.loanAmount || '0').replace(/[^\d.]/g, ''));
  const years = parseInt(formData.loanTerm || '30');
  const monthlyRate = 0.065 / 12; // 6.5% APR
  const numPayments = years * 12;
  const estimatedMortgage = loanAmount > 0 
    ? loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
    : 0;
  
  const totalMonthlyDebt = monthlyDebt + estimatedMortgage;
  const dti = (totalMonthlyDebt / monthlyIncome) * 100;
  
  return `${Math.round(dti)}%`;
}
