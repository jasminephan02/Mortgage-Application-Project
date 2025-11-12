import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { CheckCircle } from "lucide-react";

interface ReviewStepProps {
  formData: any;
  uploadedFiles?: File[];
}

export function ReviewStep({ formData, uploadedFiles = [] }: ReviewStepProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          Application Review
        </CardTitle>
        <CardDescription>
          Please review your information before submitting your credit card application.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <h4 className="mb-3">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Name:</span> {formData.firstName} {formData.lastName}
              </div>
              <div>
                <span className="text-muted-foreground">Date of Birth:</span> {formData.dateOfBirth}
              </div>
              <div>
                <span className="text-muted-foreground">Email:</span> {formData.email}
              </div>
              <div>
                <span className="text-muted-foreground">Phone:</span> {formData.phone}
              </div>
              <div className="md:col-span-2">
                <span className="text-muted-foreground">Address:</span> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h4 className="mb-3">Financial Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Annual Income:</span> ${formData.annualIncome?.toLocaleString()}
              </div>
              <div>
                <span className="text-muted-foreground">Income Source:</span> {formData.incomeSource}
              </div>
              <div>
                <span className="text-muted-foreground">Monthly Housing Payment:</span> ${formData.monthlyRent || 'Not provided'}
              </div>
              <div>
                <span className="text-muted-foreground">Housing Status:</span> {formData.housingStatus}
              </div>
              <div>
                <span className="text-muted-foreground">Credit Score Range:</span> {formData.creditScore}
              </div>
              <div>
                <span className="text-muted-foreground">Monthly Debt Payments:</span> ${formData.existingDebt || '0'}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div>
            <h4 className="mb-3">Employment Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Employment Status:</span> {formData.employmentStatus}
              </div>
              <div>
                <span className="text-muted-foreground">Job Title:</span> {formData.jobTitle || 'Not provided'}
              </div>
              <div>
                <span className="text-muted-foreground">Employer:</span> {formData.employer || 'Not provided'}
              </div>
              <div>
                <span className="text-muted-foreground">Years Employed:</span> {formData.yearsEmployed}
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h4>Additional Information</h4>
          <div className="flex flex-wrap gap-2">
            {formData.hasOtherCreditCards && (
              <Badge variant="secondary">Has other credit cards</Badge>
            )}
            {formData.bankruptcyHistory && (
              <Badge variant="destructive">Bankruptcy history</Badge>
            )}
            {formData.contactMethod && (
              <Badge variant="outline">Prefers {formData.contactMethod} contact</Badge>
            )}
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <>
            <Separator />
            <div className="space-y-4">
              <h4>Uploaded Documents</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm bg-muted/50 p-2 rounded">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>{file.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        <div className="bg-muted p-4 rounded-lg">
          <h4 className="mb-2">Important Notice</h4>
          <p className="text-sm text-muted-foreground">
            By submitting this application, you authorize us to obtain your credit report and verify the information provided. 
            You understand that this may result in a hard inquiry on your credit report, which may temporarily affect your credit score.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}