"use client";
import React from "react";
import { AlertTriangle, Info, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export type CustomDialogVariant = "default" | "destructive" | "warning" | "success";
export type CustomDialogSize = "default" | "sm" | "md" | "lg" | "xl";

interface CustomDialogProps {
  // 기본 제어
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: React.ReactNode;

  // 콘텐츠
  title: string;
  children: React.ReactNode;

  // 스타일링
  variant?: CustomDialogVariant;
  size?: CustomDialogSize;
  showIcon?: boolean;

  // 액션 버튼
  showActions?: boolean;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmDisabled?: boolean;
  hideCancel?: boolean;
}

const variantConfig = {
  default: {
    icon: Info,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    confirmVariant: "default" as const,
  },
  destructive: {
    icon: AlertTriangle,
    iconBg: "bg-red-100",
    iconColor: "text-red-600",
    confirmVariant: "destructive" as const,
  },
  warning: {
    icon: AlertTriangle,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
    confirmVariant: "default" as const,
  },
  success: {
    icon: CheckCircle,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
    confirmVariant: "default" as const,
  },
};

const sizeClasses = {
  default: "!max-w-[96%] !overflow-y-scroll !max-h-[90%]",
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export const CustomDialog: React.FC<CustomDialogProps> = ({ open, onOpenChange, trigger, title, children, variant = "default", size = "lg", showIcon = false, showActions = false, confirmText = "확인", cancelText = "취소", onConfirm, onCancel, confirmDisabled = false, hideCancel = false }) => {
  const config = variantConfig[variant];
  const IconComponent = config.icon;

  const handleCancel = (e: any) => {
    onCancel?.();
    onOpenChange?.(false);
    e.stopPropagation();
  };

  const handleConfirm = (e: any) => {
    onConfirm?.();
    onOpenChange?.(false);
    e.stopPropagation();
  };

  const dialogContent = (
    <DialogContent className={sizeClasses[size]}>
      <DialogHeader>
        <div className="flex items-center gap-3">
          {showIcon && (
            <div className={`w-10 h-10 ${config.iconBg} rounded-full flex items-center justify-center`}>
              <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
            </div>
          )}
          <DialogTitle className="text-lg">{title}</DialogTitle>
        </div>
      </DialogHeader>

      <div className="space-y-4">
        <div>{children}</div>

        {showActions && (
          <div className="flex gap-2 pt-4">
            {!hideCancel && (
              <Button variant="outline" onClick={handleCancel} className="flex-1">
                {cancelText}
              </Button>
            )}
            <Button variant={config.confirmVariant} onClick={handleConfirm} disabled={confirmDisabled} className={hideCancel ? "w-full" : "flex-1"}>
              {confirmText}
            </Button>
          </div>
        )}
      </div>
    </DialogContent>
  );

  if (trigger) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        {dialogContent}
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {dialogContent}
    </Dialog>
  );
};

// 편의 훅
export const useCustomDialog = () => {
  const [open, setOpen] = React.useState(false);

  const openCustomDialog = () => setOpen(true);
  const closeCustomDialog = () => setOpen(false);

  return {
    open,
    setOpen,
    openCustomDialog,
    closeCustomDialog,
  };
};
