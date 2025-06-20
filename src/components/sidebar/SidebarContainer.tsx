"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { adminNavigation, hasPermission, type UserRole } from "@/config/admin-navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // 임시 사용자 권한 (실제로는 context나 API에서 가져올 것)
  const userRole: UserRole = "normal";

  const currentPage = adminNavigation.find((item) => pathname.startsWith(item.href));
  const hasCurrentPagePermission = currentPage ? hasPermission(currentPage, userRole) : true;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="flex">
        {/* 데스크톱 사이드바 */}
        <div className="hidden lg:block w-80 bg-white/80 backdrop-blur-sm border-r border-gray-200/60 min-h-screen">
          <Sidebar userRole={userRole} />
        </div>

        {/* 모바일 사이드바 오버레이 */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className="relative w-80 bg-white/90 backdrop-blur-sm border-r border-gray-200/60 min-h-screen shadow-xl">
              <AdminSidebar userRole={userRole} onClose={() => setSidebarOpen(false)} showCloseButton={true} />
            </div>
          </div>
        )}

        {/* 메인 콘텐츠 영역 */}
        <div className="flex-1 min-w-0">
          {/* 모바일 헤더 */}
          <div className="lg:hidden sticky top-0 z-40 bg-white/80 backdrop-blur-sm border-b border-gray-200/60 p-4">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(true)} className="w-10 h-10 p-0">
                <Menu className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>관리자</span>
                <span>/</span>
                <span className="text-blue-600 font-medium">{currentPage?.label || "대시보드"}</span>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-6">
            {/* 데스크톱 브레드크럼 */}
            <div className="hidden lg:block mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>관리자</span>
                <span>/</span>
                <span className="text-blue-600 font-medium">{currentPage?.label || "대시보드"}</span>
              </div>
            </div>

            {/* 페이지 콘텐츠 */}
            <div className="bg-transparent">
              {!hasCurrentPagePermission ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">접근 권한이 필요합니다</h3>
                  <p className="text-gray-600 mb-4">이 페이지에 접근하려면 관리자 권한이 필요합니다.</p>
                </div>
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
