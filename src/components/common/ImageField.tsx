import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye } from "lucide-react";


// 공통 컴포넌트: 이미지 필드
interface ImageFieldProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    onPreview: (url: string) => void;
    placeholder?: string;
  }
  
  export default function ImageField ({ 
    label, 
    value, 
    onChange, 
    onPreview,
    placeholder = "이미지 URL을 입력하세요"
  }: ImageFieldProps) {
    return (
    <div className="space-y-2">
      <Label htmlFor={label}>{label}</Label>
      <div className="flex gap-2">
        <Input
          id={label}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => onPreview(value)}
          disabled={!value}
        >
          <Eye className="w-4 h-4 mr-1" />
          미리보기
        </Button>
      </div>
    </div>)
  };