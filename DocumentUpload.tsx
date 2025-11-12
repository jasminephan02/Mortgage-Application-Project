import { useState, useRef } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Upload, File, X, CheckCircle2, AlertCircle } from "lucide-react";
import { Badge } from "./ui/badge";

interface DocumentUploadProps {
  onFilesChange: (files: File[]) => void;
  acceptedTypes?: string[];
  maxFiles?: number;
  maxSizePerFile?: number; // in MB
}

interface UploadedFile {
  file: File;
  id: string;
  status: 'uploading' | 'success' | 'error';
  progress: number;
}

export function DocumentUpload({ 
  onFilesChange, 
  acceptedTypes = ['.pdf', '.jpg', '.jpeg', '.png'],
  maxFiles = 5,
  maxSizePerFile = 10
}: DocumentUploadProps) {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (files: FileList) => {
    const newFiles: UploadedFile[] = [];
    
    Array.from(files).forEach((file) => {
      // Check file size
      if (file.size > maxSizePerFile * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is ${maxSizePerFile}MB.`);
        return;
      }

      // Check file type
      const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
      if (!acceptedTypes.includes(fileExtension)) {
        alert(`File type ${fileExtension} is not supported. Accepted types: ${acceptedTypes.join(', ')}`);
        return;
      }

      const uploadedFile: UploadedFile = {
        file,
        id: Math.random().toString(36).substr(2, 9),
        status: 'uploading',
        progress: 0
      };

      newFiles.push(uploadedFile);
    });

    if (uploadedFiles.length + newFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed.`);
      return;
    }

    setUploadedFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((uploadedFile) => {
      const interval = setInterval(() => {
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === uploadedFile.id 
              ? { ...f, progress: Math.min(f.progress + 10, 100) }
              : f
          )
        );
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setUploadedFiles(prev => 
          prev.map(f => 
            f.id === uploadedFile.id 
              ? { ...f, status: 'success', progress: 100 }
              : f
          )
        );
      }, 1000);
    });

    // Update parent component
    const allFiles = [...uploadedFiles.map(f => f.file), ...newFiles.map(f => f.file)];
    onFilesChange(allFiles);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const updated = prev.filter(f => f.id !== id);
      onFilesChange(updated.map(f => f.file));
      return updated;
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supporting Documents</CardTitle>
        <CardDescription>
          Upload documents to verify your income and identity (optional but recommended for faster processing)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${dragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <h4 className="mb-2">Upload Documents</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Drag and drop files here, or click to browse
          </p>
          <Button variant="outline" type="button">
            Choose Files
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Accepted formats: {acceptedTypes.join(', ')} • Max {maxSizePerFile}MB per file • Up to {maxFiles} files
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedTypes.join(',')}
          onChange={handleFileInput}
          className="hidden"
        />

        {uploadedFiles.length > 0 && (
          <div className="space-y-3">
            <h4>Uploaded Files</h4>
            {uploadedFiles.map((uploadedFile) => (
              <div key={uploadedFile.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <File className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="text-sm">{uploadedFile.file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(uploadedFile.file.size)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {uploadedFile.status === 'uploading' && (
                    <div className="w-20 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadedFile.progress}%` }}
                      />
                    </div>
                  )}
                  
                  {uploadedFile.status === 'success' && (
                    <Badge variant="secondary" className="text-green-600">
                      <CheckCircle2 className="h-3 w-3 mr-1" />
                      Uploaded
                    </Badge>
                  )}
                  
                  {uploadedFile.status === 'error' && (
                    <Badge variant="destructive">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Error
                    </Badge>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(uploadedFile.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bg-muted/50 p-4 rounded-lg">
          <h4 className="mb-2">Recommended Documents:</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Recent pay stubs (last 2-3 months)</li>
            <li>• Tax returns (previous year)</li>
            <li>• Bank statements (last 2 months)</li>
            <li>• Government-issued photo ID</li>
            <li>• Proof of address (utility bill, lease agreement)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}