export const validationRules = {
  email: (value: string): string | null => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : "Please enter a valid email address";
  },

  phone: (value: string): string | null => {
    if (!value) return null;
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return phoneRegex.test(value.replace(/\D/g, '')) ? null : "Please enter a valid phone number";
  },

  ssn: (value: string): string | null => {
    if (!value) return null;
    const ssnRegex = /^\d{3}-?\d{2}-?\d{4}$/;
    return ssnRegex.test(value) ? null : "Please enter a valid SSN (XXX-XX-XXXX)";
  },

  zipCode: (value: string): string | null => {
    if (!value) return null;
    const zipRegex = /^\d{5}(-\d{4})?$/;
    return zipRegex.test(value) ? null : "Please enter a valid ZIP code";
  },

  annualIncome: (value: string): string | null => {
    if (!value) return null;
    // Remove commas and non-digit characters except decimal point
    const cleanValue = value.replace(/[^\d.]/g, '');
    const income = parseFloat(cleanValue);
    if (isNaN(income)) return "Please enter a valid income amount";
    if (income < 1000) return "Annual income must be at least $1,000";
    if (income > 10000000) return "Please enter a realistic income amount";
    return null;
  },

  monthlyPayment: (value: string): string | null => {
    if (!value) return null;
    // Remove commas and non-digit characters except decimal point
    const cleanValue = value.replace(/[^\d.]/g, '');
    const payment = parseFloat(cleanValue);
    if (isNaN(payment)) return "Please enter a valid amount";
    if (payment < 0) return "Amount cannot be negative";
    if (payment > 50000) return "Please enter a realistic amount";
    return null;
  },

  required: (value: string, fieldName: string): string | null => {
    return value.trim() ? null : `${fieldName} is required`;
  },

  dateOfBirth: (value: string): string | null => {
    if (!value) return null;
    const birthDate = new Date(value);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      // age--;
    }
    
    if (age < 18) return "You must be at least 18 years old";
    if (age > 120) return "Please enter a valid date of birth";
    return null;
  }
};

export const formatters = {
  phone: (value: string): string => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 6) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    } else if (digits.length >= 3) {
      return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }
    return digits;
  },

  ssn: (value: string): string => {
    const digits = value.replace(/\D/g, '');
    if (digits.length >= 5) {
      return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 9)}`;
    } else if (digits.length >= 3) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    }
    return digits;
  },

  currency: (value: string): string => {
    const digits = value.replace(/\D/g, '');
    return digits ? parseInt(digits).toLocaleString() : '';
  }
};