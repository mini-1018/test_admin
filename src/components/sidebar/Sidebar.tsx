"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Settings, Lock, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { adminNavigation, hasPermission, type UserRole } from "@/components/sidebar/sidebar.config";

interface AdminSidebarProps {
  userRole: UserRole;
  onClose?: () => void;
  showCloseButton?: boolean;
}

export default function Sidebar({ userRole, onClose, showCloseButton = false }: AdminSidebarProps) {
  const pathname = usePathname();

  return (
    <div className="h-full flex flex-col">
      <div className="p-6 flex-1">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-gray-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">관리자</h1>
            </div>
          </div>
          {/* 모바일 닫기 버튼 */}
          {showCloseButton && (
            <Button variant="ghost" size="sm" onClick={onClose} className="w-8 h-8 p-0">
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* 네비게이션 */}
        <nav className="space-y-2">
          {adminNavigation.map((item) => {
            const IconComponent = item.icon;
            const isActive = pathname.startsWith(item.href);
            const hasAccess = hasPermission(item, userRole);

            return (
              <Link
                key={item.id}
                href={hasAccess ? item.href : "#"}
                onClick={onClose}
                className={`
                  block w-full p-4 rounded-xl relative group transition-all duration-200
                  ${isActive ? "bg-blue-50 text-blue-700 shadow-sm" : !hasAccess ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}
                  ${!hasAccess ? "pointer-events-none" : ""}
                `}
              >
                <div className="flex items-center gap-3 w-full">
                  <div
                    className={`
                      w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200
                      ${isActive ? "bg-blue-100 text-blue-600" : !hasAccess ? "bg-gray-100 text-gray-400" : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"}
                    `}
                  >
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{item.label}</span>
                      {!hasAccess && (
                        <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          권한필요
                        </Badge>
                      )}
                      {item.badge && (
                        <Badge variant="default" className="text-xs px-2 py-0.5">
                          {item.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-tight">{item.description}</p>
                  </div>
                </div>

                {/* 활성 탭 표시 */}
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* 하단 정보 */}
      <div className="p-6 border-t border-gray-200">
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="font-semibold text-sm text-slate-900">권한 요청</h3>
                <p className="text-sm text-gray-600 mt-1">coda@coda.ai.kr</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
