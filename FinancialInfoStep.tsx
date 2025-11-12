import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { FormField } from "./FormField";
import { validationRules, formatters } from "./ValidationUtils";

interface FinancialInfoStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function FinancialInfoStep({ formData, updateFormData }: FinancialInfoStepProps) {
  const handleInputChange = (field: string, value: string | boolean) => {
    // Apply formatting for currency fields
    if (typeof value === 'string' && (field === 'annualIncome' || field === 'monthlyRent' || field === 'existingDebt' || field === 'liquidAssets' || field === 'retirementAssets')) {
      const formattedValue = formatters.currency(value);
      updateFormData({ [field]: formattedValue });
    } else {
      updateFormData({ [field]: value });
    }
  };

  const incomeSourceOptions = [
    { value: 'employment', label: 'Employment' },
    { value: 'self-employment', label: 'Self-Employment' },
    { value: 'retirement', label: 'Retirement' },
    { value: 'disability', label: 'Disability Benefits' },
    { value: 'investment', label: 'Investment Income' },
    { value: 'rental', label: 'Rental Income' },
    { value: 'other', label: 'Other' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Information</CardTitle>
        <CardDescription>
          This information helps us determine your ability to repay the mortgage.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4>Income Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id="annualIncome"
              label="Annual Gross Income"
              value={formData.annualIncome || ''}
              onChange={(value) => handleInputChange('annualIncome', value)}
              placeholder="75,000"
              required
              validation={validationRules.annualIncome}
            />
            <FormField
              id="incomeSource"
              label="Primary Income Source"
              value={formData.incomeSource || ''}
              onChange={(value) => handleInputChange('incomeSource', value)}
              placeholder="Select income source"
              required
              options={incomeSourceOptions}
              validation={(value) => validationRules.required(value, 'Income Source')}
            />
          </div>
          
          <FormField
            id="additionalIncome"
            label="Additional Monthly Income (Optional)"
            value={formData.additionalIncome || ''}
            onChange={(value) => handleInputChange('additionalIncome', value)}
            placeholder="2,000"
            validation={validationRules.monthlyPayment}
          />
        </div>

        <div className="space-y-4">
          <h4>Assets</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id="liquidAssets"
              label="Liquid Assets (Checking, Savings)"
              value={formData.liquidAssets || ''}
              onChange={(value) => handleInputChange('liquidAssets', value)}
              placeholder="50,000"
              validation={validationRules.monthlyPayment}
            />
            <FormField
              id="retirementAssets"
              label="Retirement Assets (401k, IRA)"
              value={formData.retirementAssets || ''}
              onChange={(value) => handleInputChange('retirementAssets', value)}
              placeholder="100,000"
              validation={validationRules.monthlyPayment}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h4>Monthly Obligations</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              id="existingDebt"
              label="Total Monthly Debt Payments"
              value={formData.existingDebt || ''}
              onChange={(value) => handleInputChange('existingDebt', value)}
              placeholder="500"
              validation={validationRules.monthlyPayment}
            />
            <FormField
              id="monthlyRent"
              label="Current Monthly Housing Payment"
              value={formData.monthlyRent || ''}
              onChange={(value) => handleInputChange('monthlyRent', value)}
              placeholder="1,500"
              validation={validationRules.monthlyPayment}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasOtherProperties"
              checked={formData.hasOtherProperties || false}
              onCheckedChange={(checked) => handleInputChange('hasOtherProperties', checked)}
            />
            <Label htmlFor="hasOtherProperties">
              I currently own other properties
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="bankruptcyHistory"
              checked={formData.bankruptcyHistory || false}
              onCheckedChange={(checked) => handleInputChange('bankruptcyHistory', checked)}
            />
            <Label htmlFor="bankruptcyHistory">
              I have filed for bankruptcy in the past 7 years
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox
              id="foreclosureHistory"
              checked={formData.foreclosureHistory || false}
              onCheckedChange={(checked) => handleInputChange('foreclosureHistory', checked)}
            />
            <Label htmlFor="foreclosureHistory">
              I have had a foreclosure in the past 7 years
            </Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}