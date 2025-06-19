"use client";
import React, { useState } from "react";
import { Search, FileText, MessageCircle, Calendar, CheckCircle, Clock, Mail, Phone, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export interface SupportPost {
  id: number;
  title: string;
  date: string;
  answer: number; // 0: 답변없음, 1: 답변있음
  content: string;
  email?: string;
  phone: string;
}

const SupportPosts: SupportPost[] = [
  {
    id: 1,
    email: "test@test.com",
    phone: "010-1234-5678",
    title: "무인회수기 이용 문의",
    date: "2025-05-27",
    content: "무인회수기 이용 방법에 대해 자세히 알고 싶습니다.",
    answer: 1,
  },
  {
    id: 2,
    title: "무인회수기 기능건의",
    phone: "010-9876-5432",
    date: "2025-05-26",
    content: "더 나은 기능을 위한 건의사항입니다.",
    answer: 1,
  },
  {
    id: 3,
    title: "차량용RFID 이용 문의",
    phone: "010-5555-7777",
    email: "user@example.com",
    date: "2025-05-25",
    content: "차량용 RFID 설치 및 이용 방법이 궁금합니다.",
    answer: 0,
  },
  {
    id: 4,
    title: "음식물 종량기 고장문의",
    phone: "010-1111-2222",
    date: "2025-05-24",
    content: "음식물 종량기가 작동하지 않습니다.",
    answer: 0,
  },
  {
    id: 5,
    title: "종량기 사용법 문의",
    phone: "010-3333-4444",
    email: "help@example.com",
    date: "2025-05-23",
    content: "종량기 사용법을 알려주세요.",
    answer: 1,
  },
];

type TabType = "unanswered" | "answered";

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<TabType>("unanswered");

  const filteredPosts = SupportPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const getPostsByTab = (tab: TabType) => {
    switch (tab) {
      case "answered":
        return filteredPosts.filter((post) => post.answer === 1);
      case "unanswered":
        return filteredPosts.filter((post) => post.answer === 0);
      default:
        return filteredPosts.filter((post) => post.answer === 0);
    }
  };

  const currentPosts = getPostsByTab(activeTab);

  const answeredPosts = SupportPosts.filter((post) => post.answer === 1);
  const unansweredPosts = SupportPosts.filter((post) => post.answer === 0);

  const toggleAnswerStatus = () => {
    console.log("토글");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 flex items-center justify-center relative">
              <div className="w-full h-full bg-blue-100 rounded-full flex items-center justify-center">
                <Headphones className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">고객 문의 관리</h1>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">전체 문의</p>
                  <p className="text-2xl font-bold text-slate-900">{SupportPosts.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">답변 대기</p>
                  <p className="text-2xl font-bold text-orange-600">{unansweredPosts.length}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">답변 완료</p>
                  <p className="text-2xl font-bold text-blue-600">{answeredPosts.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">답변률</p>
                  <p className="text-2xl font-bold text-green-600">{SupportPosts.length > 0 ? Math.round((answeredPosts.length / SupportPosts.length) * 100) : 0}%</p>
                </div>
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 검색 및 탭 */}
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-6">
              <div className="flex-1 max-w-md">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-gray-600 transition-colors" />
                  <Input type="text" placeholder="제목 또는 내용으로 검색..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-12 bg-white/50 border-gray-200 focus:border-green-400 focus:ring-green-400" />
                </div>
              </div>
            </div>

            {/* 탭 메뉴 */}
            <div className="flex gap-2">
              <Button variant={activeTab === "unanswered" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("unanswered")} className={activeTab === "unanswered" ? "bg-orange-600 hover:bg-orange-700" : ""}>
                <Clock className="w-4 h-4 mr-2" />
                답변 대기 ({filteredPosts.filter((p) => p.answer === 0).length})
              </Button>
              <Button variant={activeTab === "answered" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("answered")} className={activeTab === "answered" ? "bg-blue-600 hover:bg-blue-700" : ""}>
                <CheckCircle className="w-4 h-4 mr-2" />
                답변 완료 ({filteredPosts.filter((p) => p.answer === 1).length})
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 문의 목록 */}
        {currentPosts.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">{activeTab === "unanswered" ? <Clock className="w-8 h-8 text-orange-400" /> : <CheckCircle className="w-8 h-8 text-blue-400" />}</div>
              <p className="text-xl font-semibold mb-2 text-slate-700">{activeTab === "unanswered" ? "답변 대기 중인 문의가 없습니다" : "답변이 완료된 문의가 없습니다"}</p>
              <p className="text-gray-500">{activeTab === "unanswered" ? "모든 문의에 답변이 완료되었습니다! 🎉" : "아직 답변된 문의가 없습니다."}</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* 현재 탭 정보 */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                {activeTab === "unanswered" ? (
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    답변 대기 중인 문의
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    답변 완료된 문의
                  </span>
                )}
                <span className="font-semibold ml-1">({currentPosts.length}건)</span>
              </p>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {currentPosts.map((post) => (
                <AccordionItem key={post.id} value={`item-${post.id}`} className="border-none">
                  <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-0">
                      {/* 메인 헤더 영역 - 답변 상태 버튼과 분리 */}
                      <div className="p-6 flex flex-col lg:flex-row lg:items-center gap-4 border-b border-gray-100">
                        {/* 왼쪽: 메인 정보 */}
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start gap-3">
                            {post.answer === 1 ? (
                              <Badge variant="secondary" className="bg-blue-100 text-blue-700 shrink-0">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                답변완료
                              </Badge>
                            ) : (
                              <Badge variant="secondary" className="bg-orange-100 text-orange-700 shrink-0">
                                <Clock className="w-3 h-3 mr-1" />
                                답변대기
                              </Badge>
                            )}
                            <h3 className="text-lg font-semibold text-slate-900 leading-tight">{post.title}</h3>
                          </div>

                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(post.date).toLocaleDateString("ko-KR")}</span>
                            </div>
                          </div>
                        </div>

                        {/* 오른쪽: 답변 상태 토글 버튼 */}
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant={post.answer === 1 ? "default" : "secondary"} className={post.answer === 1 ? "bg-blue-600 hover:bg-blue-700" : "bg-orange-500 hover:bg-orange-600 text-white"} onClick={() => toggleAnswerStatus()}>
                            {post.answer === 1 ? (
                              <>
                                <CheckCircle className="w-4 h-4 mr-1" />
                                답변완료
                              </>
                            ) : (
                              <>
                                <Clock className="w-4 h-4 mr-1" />
                                답변대기
                              </>
                            )}
                          </Button>
                        </div>
                      </div>

                      {/* 아코디언 트리거 */}
                      <AccordionTrigger className="px-6 py-3 hover:no-underline">
                        <span className="text-sm text-gray-600 flex items-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          상세 정보 보기
                        </span>
                      </AccordionTrigger>

                      {/* 아코디언 콘텐츠 */}
                      <AccordionContent className="px-6 pb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                          {/* 연락처 정보 */}
                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-900 flex items-center gap-2">
                              <MessageCircle className="w-4 h-4" />
                              연락처 정보
                            </h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="w-4 h-4" />
                                <span className="font-medium">전화번호:</span>
                                <span>{post.phone}</span>
                              </div>
                              {post.email && (
                                <div className="flex items-center gap-2 text-gray-600">
                                  <Mail className="w-4 h-4" />
                                  <span className="font-medium">이메일:</span>
                                  <span>{post.email}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* 문의 내용 */}
                          <div className="space-y-3">
                            <h4 className="font-medium text-gray-900 flex items-center gap-2">
                              <FileText className="w-4 h-4" />
                              문의 내용
                            </h4>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <p className="text-sm text-gray-700 leading-relaxed">{post.content}</p>
                            </div>
                          </div>
                        </div>
                      </AccordionContent>
                    </CardContent>
                  </Card>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
}
