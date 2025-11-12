import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";
import { Alert, AlertDescription } from "./components/ui/alert";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Briefcase, 
  DollarSign,
  FileText,
  Calendar,
  Filter,
  Search,
  UserCog
} from "lucide-react";
import { Input } from "./components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Textarea } from "./components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./components/ui/dialog";
import { getApplications, updateApplicationStatus, type SubmittedApplication } from "./utils/applicationStorage";

// Mock application data - these will be merged with real submitted applications
const mockApplications: SubmittedApplication[] = [
  {
    id: "APP-001",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    dateOfBirth: "1985-03-15",
    ssn: "***-**-1234",
    address: "123 Main St",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    propertyAddress: "456 Oak Avenue",
    propertyCity: "Brooklyn",
    propertyState: "NY",
    propertyZipCode: "11201",
    propertyType: "Single Family Home",
    loanPurpose: "Purchase",
    purchasePrice: "$450,000",
    downPayment: "$90,000",
    loanAmount: "$360,000",
    loanTerm: "30 years",
    annualIncome: "$95,000",
    incomeSource: "Employment",
    liquidAssets: "$120,000",
    employmentStatus: "Full-time",
    employer: "Tech Corp",
    jobTitle: "Software Engineer",
    yearsEmployed: "5",
    monthlyDebt: "$800",
    status: "pending",
    submittedDate: "2024-11-10",
    creditScore: 750,
    dti: "28%"
  },
  {
    id: "APP-002",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.j@email.com",
    phone: "(555) 234-5678",
    dateOfBirth: "1990-07-22",
    ssn: "***-**-5678",
    address: "456 Oak Ave",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    propertyAddress: "789 Sunset Blvd",
    propertyCity: "Los Angeles",
    propertyState: "CA",
    propertyZipCode: "90028",
    propertyType: "Condominium",
    loanPurpose: "Purchase",
    purchasePrice: "$625,000",
    downPayment: "$125,000",
    loanAmount: "$500,000",
    loanTerm: "30 years",
    annualIncome: "$145,000",
    incomeSource: "Employment",
    liquidAssets: "$180,000",
    employmentStatus: "Full-time",
    employer: "Finance Inc",
    jobTitle: "Financial Analyst",
    yearsEmployed: "4",
    monthlyDebt: "$1,200",
    status: "pending",
    submittedDate: "2024-11-09",
    creditScore: 800,
    dti: "25%"
  },
  {
    id: "APP-003",
    firstName: "Michael",
    lastName: "Chen",
    email: "m.chen@email.com",
    phone: "(555) 345-6789",
    dateOfBirth: "1988-12-05",
    ssn: "***-**-9012",
    address: "789 Pine St",
    city: "Chicago",
    state: "IL",
    zipCode: "60601",
    propertyAddress: "321 Lake Shore Dr",
    propertyCity: "Chicago",
    propertyState: "IL",
    propertyZipCode: "60611",
    propertyType: "Townhouse",
    loanPurpose: "Purchase",
    purchasePrice: "$385,000",
    downPayment: "$77,000",
    loanAmount: "$308,000",
    loanTerm: "30 years",
    annualIncome: "$110,000",
    incomeSource: "Self-employed",
    liquidAssets: "$95,000",
    employmentStatus: "Self-employed",
    employer: "Chen Consulting",
    jobTitle: "Consultant",
    yearsEmployed: "3",
    monthlyDebt: "$600",
    status: "approved",
    submittedDate: "2024-11-08",
    approvedDate: "2024-11-09",
    creditScore: 775,
    dti: "22%",
    approvedAmount: "$308,000",
    interestRate: "6.375%"
  },
  {
    id: "APP-004",
    firstName: "Emily",
    lastName: "Williams",
    email: "e.williams@email.com",
    phone: "(555) 456-7890",
    dateOfBirth: "1995-04-18",
    ssn: "***-**-3456",
    address: "321 Elm St",
    city: "Austin",
    state: "TX",
    zipCode: "73301",
    propertyAddress: "555 Congress Ave",
    propertyCity: "Austin",
    propertyState: "TX",
    propertyZipCode: "78701",
    propertyType: "Single Family Home",
    loanPurpose: "Purchase",
    purchasePrice: "$295,000",
    downPayment: "$14,750",
    loanAmount: "$280,250",
    loanTerm: "30 years",
    annualIncome: "$62,000",
    incomeSource: "Employment",
    liquidAssets: "$22,000",
    employmentStatus: "Full-time",
    employer: "Retail Store",
    jobTitle: "Store Manager",
    yearsEmployed: "1",
    monthlyDebt: "$450",
    status: "rejected",
    submittedDate: "2024-11-07",
    rejectedDate: "2024-11-08",
    creditScore: 640,
    dti: "42%",
    rejectionReason: "Debt-to-income ratio exceeds guidelines (42% > 43% max). Insufficient down payment (5% vs recommended 10% minimum)."
  }
];

export default function AdminApp() {
  const [applications, setApplications] = useState<SubmittedApplication[]>(getApplications());
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [approvedAmount, setApprovedAmount] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  const filteredApplications = applications.filter(app => {
    const matchesStatus = filterStatus === "all" || app.status === filterStatus;
    const matchesSearch = searchQuery === "" || 
      app.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = applications.filter(app => app.status === "pending").length;
  const approvedCount = applications.filter(app => app.status === "approved").length;
  const rejectedCount = applications.filter(app => app.status === "rejected").length;

  const handleApprove = () => {
    if (selectedApp && approvedAmount) {
      setApplications(apps => 
        apps.map(app => 
          app.id === selectedApp.id 
            ? { ...app, status: "approved", approvedDate: new Date().toISOString().split('T')[0], approvedAmount, interestRate: "6.5%" }
            : app
        )
      );
      updateApplicationStatus(selectedApp.id, "approved", { approvedAmount, interestRate: "6.5%" });
      setShowApproveDialog(false);
      setApprovedAmount("");
      setSelectedApp(null);
    }
  };

  const handleReject = () => {
    if (selectedApp && rejectionReason) {
      setApplications(apps => 
        apps.map(app => 
          app.id === selectedApp.id 
            ? { ...app, status: "rejected", rejectedDate: new Date().toISOString().split('T')[0], rejectionReason }
            : app
        )
      );
      updateApplicationStatus(selectedApp.id, "rejected", { rejectionReason });
      setShowRejectDialog(false);
      setRejectionReason("");
      setSelectedApp(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="h-3 w-3 mr-1" />Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle className="h-3 w-3 mr-1" />Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><XCircle className="h-3 w-3 mr-1" />Rejected</Badge>;
      default:
        return null;
    }
  };

  const getCreditScoreColor = (score: number) => {
    if (score >= 750) return "text-green-600";
    if (score >= 670) return "text-blue-600";
    if (score >= 580) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1>Mortgage Application Review</h1>
              <p className="text-sm text-muted-foreground">Admin Dashboard - Review and approve mortgage applications</p>
            </div>
            <div className="flex gap-4">
              <Card className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-yellow-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Pending</p>
                    <p className="font-semibold">{pendingCount}</p>
                  </div>
                </div>
              </Card>
              <Card className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Approved</p>
                    <p className="font-semibold">{approvedCount}</p>
                  </div>
                </div>
              </Card>
              <Card className="px-4 py-2">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <div>
                    <p className="text-xs text-muted-foreground">Rejected</p>
                    <p className="font-semibold">{rejectedCount}</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Applications List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Applications</CardTitle>
                <CardDescription>Click to view details</CardDescription>
                
                {/* Filters */}
                <div className="space-y-3 pt-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search applications..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <div className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <SelectValue placeholder="Filter by status" />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Applications</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y max-h-[600px] overflow-y-auto">
                  {filteredApplications.map((app) => (
                    <div
                      key={app.id}
                      className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${
                        selectedApp?.id === app.id ? "bg-muted" : ""
                      }`}
                      onClick={() => setSelectedApp(app)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium">{app.firstName} {app.lastName}</p>
                          <p className="text-sm text-muted-foreground">{app.id}</p>
                        </div>
                        {getStatusBadge(app.status)}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {app.submittedDate}
                        </span>
                        <span className={`flex items-center gap-1 ${getCreditScoreColor(app.creditScore)}`}>
                          <FileText className="h-3 w-3" />
                          {app.creditScore}
                        </span>
                      </div>
                    </div>
                  ))}
                  {filteredApplications.length === 0 && (
                    <div className="p-8 text-center text-muted-foreground">
                      No applications found
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Application Details */}
          <div className="lg:col-span-2">
            {selectedApp ? (
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{selectedApp.firstName} {selectedApp.lastName}</CardTitle>
                      <CardDescription>Application ID: {selectedApp.id}</CardDescription>
                    </div>
                    {getStatusBadge(selectedApp.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="personal" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="personal">Personal</TabsTrigger>
                      <TabsTrigger value="financial">Financial</TabsTrigger>
                      <TabsTrigger value="employment">Employment</TabsTrigger>
                      <TabsTrigger value="assessment">Assessment</TabsTrigger>
                    </TabsList>

                    <TabsContent value="personal" className="space-y-4 mt-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>Full Name</span>
                          </div>
                          <p>{selectedApp.firstName} {selectedApp.lastName}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Date of Birth</span>
                          </div>
                          <p>{selectedApp.dateOfBirth}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-4 w-4" />
                            <span>Email</span>
                          </div>
                          <p>{selectedApp.email}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-4 w-4" />
                            <span>Phone</span>
                          </div>
                          <p>{selectedApp.phone}</p>
                        </div>
                        <div className="space-y-2 col-span-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4" />
                            <span>Address</span>
                          </div>
                          <p>{selectedApp.address}, {selectedApp.city}, {selectedApp.state} {selectedApp.zipCode}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            <span>SSN</span>
                          </div>
                          <p>{selectedApp.ssn}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="financial" className="space-y-4 mt-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <DollarSign className="h-4 w-4" />
                            <span>Annual Income</span>
                          </div>
                          <p>{selectedApp.annualIncome}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            <span>Income Source</span>
                          </div>
                          <p>{selectedApp.incomeSource}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <DollarSign className="h-4 w-4" />
                            <span>Monthly Debt</span>
                          </div>
                          <p>{selectedApp.monthlyDebt}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            <span>Credit Score</span>
                          </div>
                          <p className={getCreditScoreColor(selectedApp.creditScore)}>{selectedApp.creditScore}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <DollarSign className="h-4 w-4" />
                            <span>Requested Limit</span>
                          </div>
                          <p>{selectedApp.requestedLimit}</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="employment" className="space-y-4 mt-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Briefcase className="h-4 w-4" />
                            <span>Employment Status</span>
                          </div>
                          <p>{selectedApp.employmentStatus}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Briefcase className="h-4 w-4" />
                            <span>Employer</span>
                          </div>
                          <p>{selectedApp.employer}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <User className="h-4 w-4" />
                            <span>Job Title</span>
                          </div>
                          <p>{selectedApp.jobTitle}</p>
                        </div>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <span>Years Employed</span>
                          </div>
                          <p>{selectedApp.yearsEmployed} years</p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="assessment" className="space-y-4 mt-6">
                      <div className="space-y-4">
                        <Card className="bg-muted/50">
                          <CardHeader>
                            <CardTitle className="text-base">Risk Assessment</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-3">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Credit Score</span>
                              <span className={`font-medium ${getCreditScoreColor(selectedApp.creditScore)}`}>
                                {selectedApp.creditScore >= 750 ? "Excellent" : 
                                 selectedApp.creditScore >= 670 ? "Good" : 
                                 selectedApp.creditScore >= 580 ? "Fair" : "Poor"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Income Level</span>
                              <span className="font-medium">
                                {parseInt(selectedApp.annualIncome.replace(/\D/g, '')) >= 100000 ? "High" :
                                 parseInt(selectedApp.annualIncome.replace(/\D/g, '')) >= 60000 ? "Medium" : "Low"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Employment Stability</span>
                              <span className="font-medium">
                                {parseInt(selectedApp.yearsEmployed) >= 3 ? "Stable" : "Developing"}
                              </span>
                            </div>
                          </CardContent>
                        </Card>

                        {selectedApp.status === "approved" && (
                          <Alert className="bg-green-50 border-green-200">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription>
                              <div className="space-y-1">
                                <p><strong>Approved on:</strong> {selectedApp.approvedDate}</p>
                                <p><strong>Approved Limit:</strong> {selectedApp.approvedLimit}</p>
                              </div>
                            </AlertDescription>
                          </Alert>
                        )}

                        {selectedApp.status === "rejected" && (
                          <Alert className="bg-red-50 border-red-200">
                            <XCircle className="h-4 w-4 text-red-600" />
                            <AlertDescription>
                              <div className="space-y-1">
                                <p><strong>Rejected on:</strong> {selectedApp.rejectedDate}</p>
                                <p><strong>Reason:</strong> {selectedApp.rejectionReason}</p>
                              </div>
                            </AlertDescription>
                          </Alert>
                        )}

                        {selectedApp.status === "pending" && (
                          <div className="flex gap-3 pt-4">
                            <Button 
                              className="flex-1 bg-green-600 hover:bg-green-700"
                              onClick={() => {
                                setApprovedAmount(selectedApp.requestedLimit);
                                setShowApproveDialog(true);
                              }}
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve Application
                            </Button>
                            <Button 
                              className="flex-1" 
                              variant="destructive"
                              onClick={() => setShowRejectDialog(true)}
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject Application
                            </Button>
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center min-h-[600px]">
                <CardContent className="text-center text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Select an application to view details</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approve Mortgage Application</DialogTitle>
            <DialogDescription>
              Confirm approval for {selectedApp?.firstName} {selectedApp?.lastName} ({selectedApp?.id})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm">Approved Loan Amount</label>
              <Input
                placeholder="e.g., $350,000"
                value={approvedAmount}
                onChange={(e) => setApprovedAmount(e.target.value)}
              />
            </div>
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                The applicant will be notified via email at {selectedApp?.email}
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700" 
              onClick={handleApprove}
              disabled={!approvedAmount}
            >
              Confirm Approval
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Mortgage Application</DialogTitle>
            <DialogDescription>
              Provide a reason for rejecting {selectedApp?.firstName} {selectedApp?.lastName} ({selectedApp?.id})
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm">Rejection Reason</label>
              <Textarea
                placeholder="Enter the reason for rejection..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                rows={4}
              />
            </div>
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertDescription>
                The applicant will be notified of this decision via email.
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReject}
              disabled={!rejectionReason}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}