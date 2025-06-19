"use client";
import React from "react";
import Link from "next/link";
import { Download, HelpCircle, Newspaper, Bell, ArrowRight, Headphones, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const AdminPage: React.FC = () => {
  const adminMenus = [
    {
      id: "support",
      title: "고객문의 관리",
      description: "1:1 고객문의 답변",
      icon: Headphones,
      href: "/admin/support",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "faq",
      title: "FAQ 관리",
      description: "자주 묻는 질문 등록, 수정, 삭제",
      icon: HelpCircle,
      href: "/admin/faq",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      id: "news",
      title: "소식 관리",
      description: "최신 소식 및 뉴스 관리",
      icon: Newspaper,
      href: "/admin/news",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "notice",
      title: "공지사항 관리",
      description: "중요 공지사항 작성 및 관리",
      icon: Bell,
      href: "/admin/notice",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
    {
      id: "downloads",
      title: "다운로드 관리",
      description: "카탈로그, 매뉴얼 등 다운로드 파일 관리",
      icon: Download,
      href: "/admin/downloads",
      bgColor: "bg-gray-100",
      iconColor: "text-gray-600",
    },
    {
      id: "settings",
      title: "설정",
      description: "카테고리 등",
      icon: Settings,
      href: "/admin/settings",
      bgColor: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* 헤더 섹션 */}
      <div className="relative overflow-hidden">
        {/* 배경 이미지 */}
        <div className="absolute inset-0">
          <Image src="/images/CODA_thumbnail.webp" alt="관리자 센터 배경" fill className="object-cover opacity-90" priority />
        </div>

        {/* 그라데이션 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-blue-700/80 to-indigo-800/80"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">CODA 관리자</h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">코다 커뮤니티 편집</p>
          </div>
        </div>

        {/* 장식 요소 */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* 관리 메뉴 섹션 */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* 관리 메뉴 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {adminMenus.map((menu) => (
            <Link key={menu.id} href={menu.href}>
              <Card className="group bg-white/90 backdrop-blur-sm border-gray-200/60 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 cursor-pointer overflow-hidden">
                <CardContent className="p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`w-16 h-16 ${menu.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <menu.icon className={`w-8 h-8 ${menu.iconColor}`} />
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        <ArrowRight className="w-5 h-5 text-gray-600" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">{menu.title}</h3>
                      <p className="text-gray-600 text-base leading-relaxed">{menu.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
