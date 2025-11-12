import { useEffect, useState } from "react";
import { Save, CheckCircle2 } from "lucide-react";

interface AutoSaveProps {
  formData: any;
  isEnabled?: boolean;
}

export function AutoSave({ formData, isEnabled = true }: AutoSaveProps) {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  useEffect(() => {
    if (!isEnabled) return;

    const timeoutId = setTimeout(() => {
      setSaveStatus('saving');
      
      // Simulate auto-save to localStorage
      localStorage.setItem('creditCardApplication', JSON.stringify({
        data: formData,
        timestamp: new Date().toISOString()
      }));
      
      setTimeout(() => {
        setSaveStatus('saved');
        setLastSaved(new Date());
        
        setTimeout(() => {
          setSaveStatus('idle');
        }, 2000);
      }, 500);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [formData, isEnabled]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isEnabled || saveStatus === 'idle') return null;

  return (
    <div className="fixed bottom-4 right-4 bg-card border rounded-lg shadow-lg p-3 flex items-center gap-2 text-sm">
      {saveStatus === 'saving' && (
        <>
          <Save className="h-4 w-4 animate-spin" />
          <span>Saving progress...</span>
        </>
      )}
      {saveStatus === 'saved' && (
        <>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>
            Progress saved {lastSaved && `at ${formatTime(lastSaved)}`}
          </span>
        </>
      )}
    </div>
  );
}

export function loadSavedApplication() {
  try {
    const saved = localStorage.getItem('creditCardApplication');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.data;
    }
  } catch (error) {
    console.error('Failed to load saved application:', error);
  }
  return null;
}

export function clearSavedApplication() {
  localStorage.removeItem('creditCardApplication');
}