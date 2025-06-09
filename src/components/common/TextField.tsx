import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";

// 공통 컴포넌트: 텍스트 필드
interface TextFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    multiline?: boolean;
    rows?: number;
    placeholder?: string;
  }
  
export default function TextField ({ 
  label, 
  value, 
  onChange, 
  multiline = false, 
  rows = 4,
  placeholder = ""
} : TextFieldProps) {
    return (
  <div className="space-y-2">
    <Label htmlFor={label}>{label}</Label>
    {multiline ? (
      <Textarea
        id={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        placeholder={placeholder}
      />
    ) : (
      <Input
        id={label}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    )}
  </div>
)}