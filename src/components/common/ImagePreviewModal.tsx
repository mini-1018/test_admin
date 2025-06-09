import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

// 공통 컴포넌트: 이미지 미리보기 모달
interface ImagePreviewModalProps {
    imageUrl: string | null;
    onClose: () => void;
  }
  
export default function ImagePreviewModal ({ imageUrl, onClose } : ImagePreviewModalProps) {
    return (
    <Dialog open={!!imageUrl} onOpenChange={() => onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>이미지 미리보기</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center overflow-auto">
          {imageUrl && (
            <img 
              src={imageUrl} 
              alt="이미지 미리보기" 
              className="max-w-full h-auto rounded-lg"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>)
  };