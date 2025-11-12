import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { FormField } from "./FormField";
import { validationRules, formatters } from "./ValidationUtils";

interface PropertyLoanStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function PropertyLoanStep({ formData, updateFormData }: PropertyLoanStepProps) {
  const handleInputChange = (field: string, value: string) => {
    // Apply formatting for currency fields
    if (field === 'purchasePrice' || field === 'downPayment' || field === 'loanAmount' || field === 'estimatedPropertyValue') {
      const formattedValue = formatters.currency(value);
      updateFormData({ [field]: formattedValue });
      
      // Auto-calculate loan amount
      if (field === 'purchasePrice' || field === 'downPayment') {
        const purchase = parseFloat((field === 'purchasePrice' ? formattedValue : formData.purchasePrice || '0').replace(/[^0-9.]/g, ''));
        const down = parseFloat((field === 'downPayment' ? formattedValue : formData.downPayment || '0').replace(/[^0-9.]/g, ''));
        if (purchase > 0 && down >= 0) {
          const calculated = purchase - down;
          updateFormData({ 
            [field]: formattedValue,
            loanAmount: formatters.currency(calculated.toString())
          });
        }
      }
    } else {
      updateFormData({ [field]: value });
    }
  };

  const propertyTypeOptions = [
    { value: 'single-family', label: 'Single Family Home' },
    { value: 'townhouse', label: 'Townhouse' },
    { value: 'condo', label: 'Condominium' },
    { value: 'multi-family', label: 'Multi-Family' },
    { value: 'manufactured', label: 'Manufactured Home' },
  ];

  const loanPurposeOptions = [
    { value: 'purchase', label: 'Purchase' },
    { value: 'refinance', label: 'Refinance' },
    { value: 'cash-out-refinance', label: 'Cash-Out Refinance' },
  ];

  const occupancyOptions = [
    { value: 'primary', label: 'Primary Residence' },
    { value: 'secondary', label: 'Second Home' },
    { value: 'investment', label: 'Investment Property' },
  ];

  const loanTermOptions = [
    { value: '15', label: '15 Years' },
    { value: '20', label: '20 Years' },
    { value: '30', label: '30 Years' },
  ];

  const loanTypeOptions = [
    { value: 'conventional', label: 'Conventional' },
    { value: 'fha', label: 'FHA' },
    { value: 'va', label: 'VA' },
    { value: 'usda', label: 'USDA' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Property & Loan Details</CardTitle>
        <CardDescription>
          Tell us about the property and your desired loan terms.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4>Property Information</h4>
          <FormField
            id="propertyAddress"
            label="Property Address"
            value={formData.propertyAddress || ''}
            onChange={(value) => handleInputChange('propertyAddress', value)}
            placeholder="Enter property address"
            required
            validation={(value) => validationRules.required(value, 'Property Address')}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              id="propertyCity"
              label="City"
              value={formData.propertyCity || ''}
              onChange={(value) => handleInputChange('propertyCity', value)}
              placeholder="Enter city"
              required
              validation={(value) => validationRules.required(value, 'City')}
            />
            <FormField
              id="propertyState"
              label="State"
              value={formData.propertyState || ''}
              onChange={(value) => handleInputChange('propertyState', value)}
              placeholder="Select state"
              required
              options={[
                { value: 'CA', label: 'California' },
                { value: 'TX', label: 'Texas' },
                { value: 'FL', label: 'Florida' },
                { value: 'NY', label: 'New York' },
                { value: 'IL', label: 'Illinois' },
                // Add more states as needed
              ]}
              validation={(value) => validationRules.required(value, 'State')}
            />
            <FormField
              id="propertyZipCode"
              label="ZIP Code"
              value={formData.propertyZipCode || ''}
              onChange={(value) => handleInputChange('propertyZipCode', value)}
              placeholder="XXXXX"
              required
              validation={validationRules.zipCode}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id="propertyType"
              label="Property Type"
              value={formData.propertyType || ''}
              onChange={(value) => handleInputChange('propertyType', value)}
              placeholder="Select property type"
              required
              options={propertyTypeOptions}
              validation={(value) => validationRules.required(value, 'Property Type')}
            />
            <FormField
              id="occupancy"
              label="Occupancy"
              value={formData.occupancy || ''}
              onChange={(value) => handleInputChange('occupancy', value)}
              placeholder="Select occupancy"
              required
              options={occupancyOptions}
              validation={(value) => validationRules.required(value, 'Occupancy')}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4>Loan Details</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id="loanPurpose"
              label="Loan Purpose"
              value={formData.loanPurpose || ''}
              onChange={(value) => handleInputChange('loanPurpose', value)}
              placeholder="Select loan purpose"
              required
              options={loanPurposeOptions}
              validation={(value) => validationRules.required(value, 'Loan Purpose')}
            />
            <FormField
              id="loanType"
              label="Loan Type"
              value={formData.loanType || ''}
              onChange={(value) => handleInputChange('loanType', value)}
              placeholder="Select loan type"
              options={loanTypeOptions}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id="purchasePrice"
              label="Purchase Price / Property Value"
              value={formData.purchasePrice || ''}
              onChange={(value) => handleInputChange('purchasePrice', value)}
              placeholder="350,000"
              required
              validation={validationRules.annualIncome}
            />
            <FormField
              id="downPayment"
              label="Down Payment"
              value={formData.downPayment || ''}
              onChange={(value) => handleInputChange('downPayment', value)}
              placeholder="70,000"
              required
              validation={validationRules.monthlyPayment}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id="loanAmount"
              label="Loan Amount (Auto-calculated)"
              value={formData.loanAmount || ''}
              onChange={(value) => handleInputChange('loanAmount', value)}
              placeholder="280,000"
              disabled
            />
            <FormField
              id="loanTerm"
              label="Loan Term"
              value={formData.loanTerm || ''}
              onChange={(value) => handleInputChange('loanTerm', value)}
              placeholder="Select loan term"
              options={loanTermOptions}
            />
          </div>
        </div>

        <div className="bg-muted/50 p-4 rounded-lg space-y-2">
          <h4 className="text-sm">Estimated Monthly Payment</h4>
          <p className="text-muted-foreground text-xs">
            This is a rough estimate. Your actual payment may vary based on interest rates, taxes, and insurance.
          </p>
          {formData.loanAmount && formData.loanTerm && (
            <p className="text-2xl">
              ${(() => {
                const principal = parseFloat((formData.loanAmount || '0').replace(/[^0-9.]/g, ''));
                const years = parseInt(formData.loanTerm || '30');
                const monthlyRate = 0.065 / 12; // Assume 6.5% APR
                const numPayments = years * 12;
                const monthly = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
                return monthly.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
              })()}/mo
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
