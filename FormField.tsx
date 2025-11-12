import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useState, useEffect } from "react";

interface FormFieldProps {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  validation?: (value: string) => string | null;
  options?: { value: string; label: string }[];
  className?: string;
}

export function FormField({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
  validation,
  options,
  className = ""
}: FormFieldProps) {
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (validation && touched) {
      const validationError = validation(value);
      setError(validationError);
      setIsValid(!validationError && value.length > 0);
    } else if (required && touched) {
      const hasError = !value.trim();
      setError(hasError ? `${label} is required` : null);
      setIsValid(!hasError);
    }
  }, [value, validation, touched, required, label]);

  const handleBlur = () => {
    setTouched(true);
  };

  const handleChange = (newValue: string) => {
    onChange(newValue);
    if (!touched) setTouched(true);
  };

  const fieldClassName = `${className} ${
    error ? 'border-destructive focus:border-destructive' : 
    isValid ? 'border-green-500 focus:border-green-500' : ''
  }`;

  if (options) {
    return (
      <div className="space-y-2">
        <Label htmlFor={id} className="flex items-center gap-1">
          {label}
          {required && <span className="text-destructive">*</span>}
          {isValid && <CheckCircle2 className="h-4 w-4 text-green-500" />}
        </Label>
        <Select value={value} onValueChange={handleChange}>
          <SelectTrigger 
            className={fieldClassName}
            onBlur={handleBlur}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <div className="flex items-center gap-1 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="flex items-center gap-1">
        {label}
        {required && <span className="text-destructive">*</span>}
        {isValid && <CheckCircle2 className="h-4 w-4 text-green-500" />}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => handleChange(e.target.value)}
        onBlur={handleBlur}
        placeholder={placeholder}
        className={fieldClassName}
        required={required}
      />
      {error && (
        <div className="flex items-center gap-1 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
    </div>
  );
}