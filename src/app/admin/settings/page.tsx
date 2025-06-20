"use client";
import React, { useState } from "react";
import { Settings, Tag, Users, Bell, Shield, Database, Palette, Globe, Menu, X, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CategoriesTap from "./CategoriesTap";

type UserRole = "admin" | "user" | "moderator";

interface TabConfig {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  description: string;
  component: React.ComponentType<any>;
  badge?: string;
  requiresPermission?: boolean;
  permission?: UserRole;
}

const tabsConfig: TabConfig[] = [
  {
    id: "categories",
    label: "카테고리 관리",
    icon: Tag,
    description: "뉴스, 공지사항, FAQ, 다운로드 카테고리 설정",
    component: CategoriesTap,
  },
  {
    id: "users",
    label: "사용자 관리",
    icon: Users,
    description: "관리자 계정 및 권한 설정",
    component: () => <div className="text-center py-12 text-gray-500">사용자 관리 탭 (개발 예정) - </div>,
  },
  {
    id: "notifications",
    label: "알림 설정",
    icon: Bell,
    description: "시스템 알림 및 이메일 설정",
    component: () => <div className="text-center py-12 text-gray-500">알림 설정 탭 (개발 예정)</div>,
  },
  {
    id: "security",
    label: "보안 설정",
    icon: Shield,
    description: "비밀번호 정책 및 보안 옵션",
    component: () => <div className="text-center py-12 text-gray-500">보안 설정 탭 (개발 예정)</div>,
    requiresPermission: true,
    permission: "admin",
  },
  {
    id: "database",
    label: "데이터베이스",
    icon: Database,
    description: "백업 및 데이터 관리 설정",
    component: () => <div className="text-center py-12 text-gray-500">데이터베이스 탭 (개발 예정)</div>,
    requiresPermission: true,
    permission: "admin",
  },
  {
    id: "appearance",
    label: "테마 설정",
    icon: Palette,
    description: "사이트 테마 및 브랜딩 설정",
    component: () => <div className="text-center py-12 text-gray-500">테마 설정 탭 (개발 예정)</div>,
    requiresPermission: true,
    permission: "admin",
  },
  {
    id: "system",
    label: "시스템 설정",
    icon: Globe,
    description: "일반적인 시스템 환경 설정",
    component: () => <div className="text-center py-12 text-gray-500">시스템 설정 탭 (개발 예정)</div>,
    requiresPermission: true,
    permission: "admin",
  },
];

export default function SettingPage() {
  const [activeTab, setActiveTab] = useState<string>("categories");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // 임시 사용자 권한 (실제로는 context나 props로 받아올 것)
  const userRole: UserRole = "user"; // 타입을 명시적으로 지정

  const hasPermission = (tab: TabConfig): boolean => {
    if (!tab.requiresPermission) return true;
    if (userRole === "admin") return true;
    return tab.permission === userRole;
  };

  const activeTabConfig = tabsConfig.find((tab) => tab.id === activeTab);
  const ActiveComponent = activeTabConfig?.component || CategoriesTap;

  const handleTabClick = (tab: TabConfig) => {
    if (hasPermission(tab)) {
      setActiveTab(tab.id);
      setSidebarOpen(false);
    }
  };

  const Sidebar = () => (
    <div className="h-full flex flex-col">
      <div className="p-6 flex-1">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900">설정</h1>
            </div>
          </div>
          {/* 모바일 닫기 버튼 */}
          <Button variant="ghost" size="sm" onClick={() => setSidebarOpen(false)} className="lg:hidden w-8 h-8 p-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* 탭 네비게이션 */}
        <nav className="space-y-2">
          {tabsConfig.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            const hasAccess = hasPermission(tab);

            return (
              <Button
                key={tab.id}
                variant="ghost"
                onClick={() => handleTabClick(tab)}
                disabled={!hasAccess}
                className={`
                  w-full justify-start p-4 h-auto relative group transition-all duration-200
                  ${isActive ? "bg-blue-50 text-blue-700 border-blue-200 shadow-sm" : !hasAccess ? "text-gray-400 cursor-not-allowed" : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"}
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
                      <span className="font-medium text-sm">{tab.label}</span>
                      {!hasAccess && (
                        <Badge variant="secondary" className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 flex items-center gap-1">
                          <Lock className="w-3 h-3" />
                          권한필요
                        </Badge>
                      )}
                      {tab.badge && (
                        <Badge variant="default" className="text-xs px-2 py-0.5">
                          {tab.badge}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 leading-tight">{tab.description}</p>
                  </div>
                </div>

                {/* 활성 탭 표시 */}
                {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-600 rounded-r-full" />}
              </Button>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      <div className="flex">
        {/* 데스크톱 사이드바 */}
        <div className="hidden lg:block w-80 bg-white/80 backdrop-blur-sm border-r border-gray-200/60 min-h-screen">
          <Sidebar />
        </div>

        {/* 모바일 사이드바 오버레이 */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            {/* 배경 오버레이 */}
            <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            {/* 사이드바 */}
            <div className="relative w-80 bg-white/90 backdrop-blur-sm border-r border-gray-200/60 min-h-screen shadow-xl">
              <Sidebar />
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
                <span>설정</span>
                <span>/</span>
                <span className="text-blue-600 font-medium">{activeTabConfig?.label || "카테고리 관리"}</span>
              </div>
            </div>
          </div>

          <div className="p-4 lg:p-6">
            {/* 데스크톱 브레드크럼 */}
            <div className="hidden lg:block mb-6">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>설정</span>
                <span>/</span>
                <span className="text-blue-600 font-medium">{activeTabConfig?.label || "카테고리 관리"}</span>
              </div>
            </div>

            {/* 활성 탭 콘텐츠 */}
            <div className="bg-transparent">
              {activeTabConfig && hasPermission(activeTabConfig) ? (
                <ActiveComponent />
              ) : (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Lock className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">접근 권한이 필요합니다</h3>
                  <p className="text-gray-600 mb-4">이 설정에 접근하려면 관리자 권한이 필요합니다.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
