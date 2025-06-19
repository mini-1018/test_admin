"use client";
import React, { useState } from "react";
import { Search, Plus, FileText, Trash2, Edit, Newspaper, Tag, Calendar, User, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomDialog, useCustomDialog } from "@/components/custom/CustomDialog";
import Link from "next/link";

export interface NewsPost {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  content: string;
  views: number;
}

const newsPosts: NewsPost[] = [
  {
    id: 1,
    title: "2025 코다 신제품 발표회",
    author: "코다",
    date: "2025-06-15",
    category: "신제품",
    content: "코다의 새로운 제품이 공개됩니다. 혁신적인 기술과 디자인을 만나보세요.",
    views: 2150,
  },
  {
    id: 2,
    title: "코다 국제 전시회 참가 소식",
    author: "코다",
    date: "2025-06-10",
    category: "전시회",
    content: "코다가 올해 최대 규모의 국제 전시회에 참가합니다.",
    views: 1890,
  },
  {
    id: 3,
    title: "코다 파트너십 확대 발표",
    author: "코다",
    date: "2025-06-05",
    category: "파트너십",
    content: "글로벌 기업과의 전략적 파트너십을 통해 더 나은 서비스를 제공합니다.",
    views: 1654,
  },
  {
    id: 4,
    title: "코다 기술 혁신상 수상",
    author: "코다",
    date: "2025-05-30",
    category: "수상",
    content: "코다의 혁신적인 기술이 업계에서 인정받아 기술 혁신상을 수상했습니다.",
    views: 2341,
  },
  {
    id: 5,
    title: "코다 지속가능성 보고서 발간",
    author: "코다",
    date: "2025-05-25",
    category: "보고서",
    content: "환경과 사회적 책임을 다하는 코다의 지속가능성 활동을 소개합니다.",
    views: 987,
  },
];

const categories = ["신제품", "전시회", "파트너십", "수상", "보고서", "채용"];

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [deletingPost, setDeletingPost] = useState<NewsPost | null>(null);

  const deleteDialog = useCustomDialog();

  const filteredPosts = newsPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase()) || post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "전체" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (post: NewsPost) => {
    setDeletingPost(post);
    deleteDialog.openCustomDialog();
  };

  const handleConfirmDelete = () => {
    console.log("Deleted News:", deletingPost);
    setDeletingPost(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 flex items-center justify-center relative">
              <div className="w-full h-full bg-purple-100 rounded-full flex items-center justify-center">
                <Newspaper className="w-6 h-6 text-purple-600" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">소식 관리</h1>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">전체 소식</p>
                  <p className="text-2xl font-bold text-slate-900">{newsPosts.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Newspaper className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 조회수</p>
                  <p className="text-2xl font-bold text-slate-900">{newsPosts.reduce((sum, item) => sum + item.views, 0).toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                  <Eye className="w-6 h-6 text-indigo-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">이번 달</p>
                  <p className="text-2xl font-bold text-green-600">+15%</p>
                </div>
                <div className="w-12 h-12 bg-gray-800 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 검색 및 필터 */}
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="flex-1 max-w-md">
                  <div className="relative group">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-gray-600 transition-colors" />
                    <Input type="text" placeholder="제목, 내용 또는 작성자로 검색..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-12 bg-white/50 border-gray-200 focus:border-purple-400 focus:ring-purple-400" />
                  </div>
                </div>
                <div className="w-full sm:w-48">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-white/50 border-gray-200">
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="전체">전체 카테고리</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-2">
                <Link href="/admin/news/create">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    소식 추가
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 소식 목록 */}
        {filteredPosts.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Newspaper className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-xl font-semibold mb-2 text-slate-700">검색결과가 없습니다</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="bg-white/80 backdrop-blur-sm border-gray-200/60 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* 왼쪽: 메인 정보 */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start gap-3">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 shrink-0">
                          {post.category}
                        </Badge>
                        <h3 className="text-lg font-semibold text-slate-900 leading-tight">{post.title}</h3>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(post.date).toLocaleDateString("ko-KR")}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <FileText className="w-4 h-4" />
                          <span>조회 {post.views.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>

                    {/* 오른쪽: 액션 버튼 */}
                    <div className="flex items-center gap-2 lg:flex-col lg:gap-2">
                      <Link href={`/admin/news/patch/${post.id}`}>
                        <Button size="sm" variant="outline" className="flex-1 lg:flex-none lg:w-20">
                          <Edit className="w-3 h-3 mr-1" />
                          수정
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" className="flex-1 lg:flex-none lg:w-20 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(post)}>
                        <Trash2 className="w-3 h-3 mr-1" />
                        삭제
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 소식 삭제 확인 커스텀 다이얼로그 */}
        <CustomDialog open={deleteDialog.open} onOpenChange={deleteDialog.setOpen} title="소식 삭제" variant="destructive" showIcon={true} showActions={true} confirmText="삭제" onConfirm={handleConfirmDelete}>
          {deletingPost && (
            <div className="text-gray-600">
              <p className="mb-3">다음 소식을 정말로 삭제하시겠습니까?</p>
              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <p className="font-medium text-gray-900">{deletingPost.title}</p>
                <p className="text-sm text-gray-500">카테고리: {deletingPost.category}</p>
                <p className="text-sm text-gray-500">작성자: {deletingPost.author}</p>
                <p className="text-sm text-gray-500">작성일: {new Date(deletingPost.date).toLocaleDateString("ko-KR")}</p>
                <p className="text-sm text-gray-500">조회수: {deletingPost.views.toLocaleString()}회</p>
              </div>
              <p className="text-red-600 text-sm font-medium">⚠️ 삭제하면 복구할 수 없습니다.</p>
            </div>
          )}
        </CustomDialog>
      </div>
    </div>
  );
}
