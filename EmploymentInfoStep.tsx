import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface EmploymentInfoStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export function EmploymentInfoStep({ formData, updateFormData }: EmploymentInfoStepProps) {
  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Employment Information</CardTitle>
        <CardDescription>
          Please provide details about your current employment or income source.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Employment Status *</Label>
            <Select
              value={formData.employmentStatus || ''}
              onValueChange={(value) => handleInputChange('employmentStatus', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select employment status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full-time">Full-time Employee</SelectItem>
                <SelectItem value="part-time">Part-time Employee</SelectItem>
                <SelectItem value="self-employed">Self-employed</SelectItem>
                <SelectItem value="unemployed">Unemployed</SelectItem>
                <SelectItem value="retired">Retired</SelectItem>
                <SelectItem value="student">Student</SelectItem>
                <SelectItem value="homemaker">Homemaker</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobTitle">Job Title</Label>
            <Input
              id="jobTitle"
              value={formData.jobTitle || ''}
              onChange={(e) => handleInputChange('jobTitle', e.target.value)}
              placeholder="Software Engineer"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="employer">Employer Name</Label>
          <Input
            id="employer"
            value={formData.employer || ''}
            onChange={(e) => handleInputChange('employer', e.target.value)}
            placeholder="Company name"
          />
        </div>

        <div className="space-y-4">
          <h4>Employer Address</h4>
          <div className="space-y-2">
            <Label htmlFor="employerAddress">Street Address</Label>
            <Input
              id="employerAddress"
              value={formData.employerAddress || ''}
              onChange={(e) => handleInputChange('employerAddress', e.target.value)}
              placeholder="123 Business St"
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="employerCity">City</Label>
              <Input
                id="employerCity"
                value={formData.employerCity || ''}
                onChange={(e) => handleInputChange('employerCity', e.target.value)}
                placeholder="City"
              />
            </div>
            <div className="space-y-2">
              <Label>State</Label>
              <Select
                value={formData.employerState || ''}
                onValueChange={(value) => handleInputChange('employerState', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select state" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="CA">California</SelectItem>
                  <SelectItem value="NY">New York</SelectItem>
                  <SelectItem value="TX">Texas</SelectItem>
                  <SelectItem value="FL">Florida</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="employerZip">ZIP Code</Label>
              <Input
                id="employerZip"
                value={formData.employerZip || ''}
                onChange={(e) => handleInputChange('employerZip', e.target.value)}
                placeholder="XXXXX"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="employerPhone">Employer Phone</Label>
            <Input
              id="employerPhone"
              type="tel"
              value={formData.employerPhone || ''}
              onChange={(e) => handleInputChange('employerPhone', e.target.value)}
              placeholder="(XXX) XXX-XXXX"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="yearsEmployed">Years with Current Employer</Label>
            <Select
              value={formData.yearsEmployed || ''}
              onValueChange={(value) => handleInputChange('yearsEmployed', value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                <SelectItem value="1-2">1-2 years</SelectItem>
                <SelectItem value="3-5">3-5 years</SelectItem>
                <SelectItem value="6-10">6-10 years</SelectItem>
                <SelectItem value="more-than-10">More than 10 years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h4>Previous Employment (if less than 2 years at current job)</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="previousEmployer">Previous Employer</Label>
              <Input
                id="previousEmployer"
                value={formData.previousEmployer || ''}
                onChange={(e) => handleInputChange('previousEmployer', e.target.value)}
                placeholder="Previous company name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="previousJobTitle">Previous Job Title</Label>
              <Input
                id="previousJobTitle"
                value={formData.previousJobTitle || ''}
                onChange={(e) => handleInputChange('previousJobTitle', e.target.value)}
                placeholder="Previous job title"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}