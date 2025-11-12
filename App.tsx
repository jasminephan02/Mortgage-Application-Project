import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { ApplicationStepper } from "./components/ApplicationStepper";
import { PersonalInfoStep } from "./components/PersonalInfoStep";
import { PropertyLoanStep } from "./components/PropertyLoanStep";
import { FinancialInfoStep } from "./components/FinancialInfoStep";
import { EmploymentInfoStep } from "./components/EmploymentInfoStep";
import { ReviewStep } from "./components/ReviewStep";
import { DocumentUpload } from "./components/DocumentUpload";
import { AutoSave, loadSavedApplication, clearSavedApplication } from "./components/AutoSave";
import { Home, AlertCircle, UserCog, FileText } from "lucide-react";
import { Alert, AlertDescription } from "./components/ui/alert";
import AdminApp from "./AdminApp";
import { saveApplication } from "./utils/applicationStorage";

const steps = [
  { id: 1, name: 'Personal Info', description: 'Basic information' },
  { id: 2, name: 'Property & Loan', description: 'Property and loan details' },
  { id: 3, name: 'Financial Info', description: 'Income and assets' },
  { id: 4, name: 'Employment', description: 'Work details' },
  { id: 5, name: 'Documents', description: 'Upload documents' },
  { id: 6, name: 'Review', description: 'Confirm details' },
];

export default function App() {
  const [viewMode, setViewMode] = useState<"customer" | "admin">("customer");
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [showSavedDataAlert, setShowSavedDataAlert] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const updateFormData = (newData: any) => {
    setFormData(prev => ({ ...prev, ...newData }));
    // Clear any existing errors for updated fields
    const updatedFields = Object.keys(newData);
    setFormErrors(prev => {
      const updated = { ...prev };
      updatedFields.forEach(field => delete updated[field]);
      return updated;
    });
  };

  // Load saved data on component mount
  useEffect(() => {
    const savedData = loadSavedApplication();
    if (savedData && Object.keys(savedData).length > 0) {
      setShowSavedDataAlert(true);
    }
  }, []);

  const handleLoadSavedData = () => {
    const savedData = loadSavedApplication();
    if (savedData) {
      setFormData(savedData);
      setShowSavedDataAlert(false);
    }
  };

  const handleDismissSavedData = () => {
    clearSavedApplication();
    setShowSavedDataAlert(false);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    clearSavedApplication();
    saveApplication(formData);
    setIsSubmitted(true);
  };

  // If admin mode, render the admin app
  if (viewMode === "admin") {
    return <AdminApp />;
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Home className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle>Application Submitted!</CardTitle>
            <CardDescription>
              Thank you for applying. We'll review your application and get back to you within 2-3 business days.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Application Reference: CC-2024-{Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
            <Button 
              onClick={() => {
                setIsSubmitted(false);
                setCurrentStep(1);
                setFormData({});
                setUploadedFiles([]);
                setFormErrors({});
                clearSavedApplication();
              }}
              variant="outline"
              className="w-full"
            >
              Submit Another Application
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <PropertyLoanStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <FinancialInfoStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <EmploymentInfoStep formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <DocumentUpload onFilesChange={setUploadedFiles} />;
      case 6:
        return <ReviewStep formData={formData} uploadedFiles={uploadedFiles} />;
      default:
        return null;
    }
  };

  const validateStep = (step: number): boolean => {
    const errors: Record<string, string> = {};
    
    switch (step) {
      case 1:
        if (!formData.firstName?.trim()) errors.firstName = 'First name is required';
        if (!formData.lastName?.trim()) errors.lastName = 'Last name is required';
        if (!formData.email?.trim()) errors.email = 'Email is required';
        if (!formData.phone?.trim()) errors.phone = 'Phone number is required';
        if (!formData.address?.trim()) errors.address = 'Address is required';
        if (!formData.city?.trim()) errors.city = 'City is required';
        if (!formData.state?.trim()) errors.state = 'State is required';
        if (!formData.zipCode?.trim()) errors.zipCode = 'ZIP code is required';
        if (!formData.dateOfBirth?.trim()) errors.dateOfBirth = 'Date of birth is required';
        if (!formData.ssn?.trim()) errors.ssn = 'SSN is required';
        break;
      case 2:
        if (!formData.propertyAddress?.trim()) errors.propertyAddress = 'Property address is required';
        if (!formData.propertyCity?.trim()) errors.propertyCity = 'Property city is required';
        if (!formData.propertyState?.trim()) errors.propertyState = 'Property state is required';
        if (!formData.propertyZipCode?.trim()) errors.propertyZipCode = 'Property ZIP code is required';
        if (!formData.propertyType?.trim()) errors.propertyType = 'Property type is required';
        if (!formData.occupancy?.trim()) errors.occupancy = 'Occupancy is required';
        if (!formData.loanPurpose?.trim()) errors.loanPurpose = 'Loan purpose is required';
        if (!formData.purchasePrice?.trim()) errors.purchasePrice = 'Purchase price is required';
        if (!formData.downPayment?.trim()) errors.downPayment = 'Down payment is required';
        break;
      case 3:
        if (!formData.annualIncome?.trim()) errors.annualIncome = 'Annual income is required';
        if (!formData.incomeSource?.trim()) errors.incomeSource = 'Income source is required';
        break;
      case 4:
        if (!formData.employmentStatus?.trim()) errors.employmentStatus = 'Employment status is required';
        break;
      case 5:
        // Document upload is optional
        break;
      case 6:
        // Review step - no additional validation needed
        break;
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isStepValid = () => {
    return validateStep(currentStep);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mode Toggle Bar */}
      <div className="bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button
                variant={viewMode === "customer" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("customer")}
              >
                <FileText className="h-4 w-4 mr-2" />
                Customer Application
              </Button>
              <Button
                variant={viewMode === "admin" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("admin")}
              >
                <UserCog className="h-4 w-4 mr-2" />
                Admin Review
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {showSavedDataAlert && (
            <Alert className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center justify-between">
                <span>We found a saved application. Would you like to continue where you left off?</span>
                <div className="flex gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleLoadSavedData}
                  >
                    Load Saved Data
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleDismissSavedData}
                  >
                    Start Fresh
                  </Button>
                </div>
              </AlertDescription>
            </Alert>
          )}
          
          <ApplicationStepper steps={steps} currentStep={currentStep} />
          
          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            <div className="flex gap-2">
              {currentStep < steps.length ? (
                <Button
                  onClick={() => {
                    if (validateStep(currentStep)) {
                      nextStep();
                    }
                  }}
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    if (validateStep(currentStep)) {
                      handleSubmit();
                    }
                  }}
                  className="bg-green-600 hover:bg-green-700"
                >
                  Submit Application
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <AutoSave formData={formData} isEnabled={!isSubmitted} />
    </div>
  );
}