import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { FormField } from "./FormField";
import { validationRules, formatters } from "./ValidationUtils";

interface PersonalInfoStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function PersonalInfoStep({ formData, updateFormData }: PersonalInfoStepProps) {
  const handleInputChange = (field: string, value: string) => {
    // Apply formatting for specific fields
    let formattedValue = value;
    if (field === 'phone') {
      formattedValue = formatters.phone(value);
    } else if (field === 'ssn') {
      formattedValue = formatters.ssn(value);
    }
    
    updateFormData({ [field]: formattedValue });
  };

  const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
  ];

  const contactMethodOptions = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone' },
    { value: 'text', label: 'Text Message' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Please provide your personal details as they appear on your government-issued ID.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id="firstName"
            label="First Name"
            value={formData.firstName || ''}
            onChange={(value) => handleInputChange('firstName', value)}
            placeholder="Enter your first name"
            required
            validation={(value) => validationRules.required(value, 'First Name')}
          />
          <FormField
            id="lastName"
            label="Last Name"
            value={formData.lastName || ''}
            onChange={(value) => handleInputChange('lastName', value)}
            placeholder="Enter your last name"
            required
            validation={(value) => validationRules.required(value, 'Last Name')}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id="dateOfBirth"
            label="Date of Birth"
            type="date"
            value={formData.dateOfBirth || ''}
            onChange={(value) => handleInputChange('dateOfBirth', value)}
            required
            validation={validationRules.dateOfBirth}
          />
          <FormField
            id="ssn"
            label="Social Security Number"
            value={formData.ssn || ''}
            onChange={(value) => handleInputChange('ssn', value)}
            placeholder="XXX-XX-XXXX"
            required
            validation={validationRules.ssn}
          />
        </div>

        <FormField
          id="email"
          label="Email Address"
          type="email"
          value={formData.email || ''}
          onChange={(value) => handleInputChange('email', value)}
          placeholder="Enter your email address"
          required
          validation={validationRules.email}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            id="phone"
            label="Phone Number"
            type="tel"
            value={formData.phone || ''}
            onChange={(value) => handleInputChange('phone', value)}
            placeholder="(XXX) XXX-XXXX"
            required
            validation={validationRules.phone}
          />
          <FormField
            id="contactMethod"
            label="Preferred Contact Method"
            value={formData.contactMethod || ''}
            onChange={(value) => handleInputChange('contactMethod', value)}
            placeholder="Select contact method"
            options={contactMethodOptions}
          />
        </div>

        <div className="space-y-4">
          <h4>Address Information</h4>
          <FormField
            id="address"
            label="Street Address"
            value={formData.address || ''}
            onChange={(value) => handleInputChange('address', value)}
            placeholder="Enter your street address"
            required
            validation={(value) => validationRules.required(value, 'Street Address')}
          />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              id="city"
              label="City"
              value={formData.city || ''}
              onChange={(value) => handleInputChange('city', value)}
              placeholder="Enter city"
              required
              validation={(value) => validationRules.required(value, 'City')}
            />
            <FormField
              id="state"
              label="State"
              value={formData.state || ''}
              onChange={(value) => handleInputChange('state', value)}
              placeholder="Select state"
              required
              options={stateOptions}
              validation={(value) => validationRules.required(value, 'State')}
            />
            <FormField
              id="zipCode"
              label="ZIP Code"
              value={formData.zipCode || ''}
              onChange={(value) => handleInputChange('zipCode', value)}
              placeholder="XXXXX"
              required
              validation={validationRules.zipCode}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}