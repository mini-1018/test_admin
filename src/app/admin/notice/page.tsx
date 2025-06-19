"use client";
import React, { useState } from "react";
import { Search, Plus, FileText, Trash2, Edit, Bell, Tag, Calendar, User, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomDialog, useCustomDialog } from "@/components/custom/CustomDialog";

export interface NoticePost {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  content: string;
  views: number;
}

const noticePosts: NoticePost[] = [
  {
    id: 1,
    title: "이벤트",
    author: "코다",
    date: "2025-05-25",
    category: "이벤트",
    content: "새로운 이벤트가 시작되었습니다. 많은 참여 부탁드립니다.",
    views: 1234,
  },
  {
    id: 2,
    title: "전시회 안내",
    author: "코다",
    date: "2025-05-24",
    category: "전시회",
    content: "2025년 코다 전시회가 개최됩니다. 자세한 일정은 공지사항을 확인해주세요.",
    views: 987,
  },
  {
    id: 3,
    title: "시스템 점검 안내",
    author: "코다",
    date: "2025-05-22",
    category: "시스템 점검",
    content: "시스템 점검으로 인한 서비스 일시 중단 안내드립니다.",
    views: 765,
  },
  {
    id: 4,
    title: "코다 어플리케이션 출시",
    author: "코다",
    date: "2025-05-20",
    category: "출시",
    content: "코다 모바일 어플리케이션이 출시되었습니다.",
    views: 543,
  },
  {
    id: 5,
    title: "고객센터 운영시간 변경 안내",
    author: "코다",
    date: "2025-05-18",
    category: "변경",
    content: "고객센터 운영시간이 변경되었습니다. 자세한 내용을 확인해주세요.",
    views: 321,
  },
];

const categories = ["이벤트", "전시회", "시스템 점검", "출시", "변경", "공지"];

// 현재 날짜를 YYYY-MM-DD 형태로 반환하는 함수
const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

const NoticePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("전체");
  const [editingPost, setEditingPost] = useState<NoticePost | null>(null);
  const [deletingPost, setDeletingPost] = useState<NoticePost | null>(null);
  const [newPost, setNewPost] = useState<Partial<NoticePost>>({
    title: "",
    category: "",
    content: "",
    author: "",
    date: getCurrentDate(),
  });

  // 커스텀 다이얼로그 상태 관리
  const addDialog = useCustomDialog();
  const editDialog = useCustomDialog();
  const deleteDialog = useCustomDialog();

  const filteredPosts = noticePosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.content.toLowerCase().includes(searchTerm.toLowerCase()) || post.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "전체" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAdd = () => {
    console.log("Added Notice:", newPost);
    setNewPost({ title: "", category: "", content: "", author: "", date: getCurrentDate() });
  };

  const handleEdit = (post: NoticePost) => {
    setEditingPost(post);
    editDialog.openCustomDialog();
  };

  const handleSaveEdit = () => {
    console.log("Updated Notice:", editingPost);
    setEditingPost(null);
  };

  const handleDelete = (post: NoticePost) => {
    setDeletingPost(post);
    deleteDialog.openCustomDialog();
  };

  const handleConfirmDelete = () => {
    console.log("Deleted Notice:", deletingPost);
    setDeletingPost(null);
  };

  // 다이얼로그 열 때 초기값 설정
  const handleOpenAddDialog = () => {
    setNewPost({ title: "", category: "", content: "", author: "", date: getCurrentDate() });
    addDialog.openCustomDialog();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 flex items-center justify-center relative">
              <div className="w-full h-full bg-teal-100 rounded-full flex items-center justify-center">
                <Bell className="w-6 h-6 text-teal-600" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">공지사항 관리</h1>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">전체 공지</p>
                  <p className="text-2xl font-bold text-slate-900">{noticePosts.length}</p>
                </div>
                <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-teal-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">카테고리</p>
                  <p className="text-2xl font-bold text-slate-900">{categories.length}</p>
                </div>
                <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Tag className="w-6 h-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 조회수</p>
                  <p className="text-2xl font-bold text-slate-900">{noticePosts.reduce((sum, item) => sum + item.views, 0).toLocaleString()}</p>
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
                  <p className="text-2xl font-bold text-green-600">+18%</p>
                </div>
                <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
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
                    <Input type="text" placeholder="제목, 내용 또는 작성자로 검색..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-12 bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400" />
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
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleOpenAddDialog}>
                  <Plus className="w-4 h-4 mr-2" />
                  공지사항 추가
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 공지사항 목록 */}
        {filteredPosts.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Bell className="w-8 h-8 text-gray-400" />
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

                      <p className="text-gray-600 text-sm line-clamp-2">{post.content}</p>

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
                      <Button size="sm" variant="outline" className="flex-1 lg:flex-none lg:w-20" onClick={() => handleEdit(post)}>
                        <Edit className="w-3 h-3 mr-1" />
                        수정
                      </Button>
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

        {/* 공지사항 추가 커스텀 다이얼로그 */}
        <CustomDialog open={addDialog.open} onOpenChange={addDialog.setOpen} title="새 공지사항 추가" size="lg" showActions={true} confirmText="추가" onConfirm={handleAdd}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="add-category">카테고리</Label>
              <Select value={newPost.category} onValueChange={(value) => setNewPost({ ...newPost, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리를 선택하세요" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-title">제목</Label>
              <Input id="add-title" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} placeholder="공지사항 제목을 입력하세요" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-author">작성자</Label>
              <Input id="add-author" value={newPost.author} onChange={(e) => setNewPost({ ...newPost, author: e.target.value })} placeholder="작성자를 입력하세요" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-date">작성일</Label>
              <Input id="add-date" type="date" value={newPost.date} onChange={(e) => setNewPost({ ...newPost, date: e.target.value })} className="bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="add-content">내용</Label>
              <Textarea id="add-content" value={newPost.content} onChange={(e) => setNewPost({ ...newPost, content: e.target.value })} placeholder="공지사항 내용을 입력하세요" rows={5} />
            </div>
          </div>
        </CustomDialog>

        {/* 공지사항 수정 커스텀 다이얼로그 */}
        <CustomDialog open={editDialog.open} onOpenChange={editDialog.setOpen} title="공지사항 수정" size="lg" showActions={true} confirmText="저장" onConfirm={handleSaveEdit}>
          {editingPost && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-category">카테고리</Label>
                <Select value={editingPost.category} onValueChange={(value) => setEditingPost({ ...editingPost, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-title">제목</Label>
                <Input id="edit-title" value={editingPost.title} onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })} placeholder="공지사항 제목을 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-author">작성자</Label>
                <Input id="edit-author" value={editingPost.author} onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })} placeholder="작성자를 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-date">작성일</Label>
                <Input id="edit-date" type="date" value={editingPost.date} onChange={(e) => setEditingPost({ ...editingPost, date: e.target.value })} className="bg-white/50 border-gray-200 focus:border-blue-400 focus:ring-blue-400" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-content">내용</Label>
                <Textarea id="edit-content" value={editingPost.content} onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })} placeholder="공지사항 내용을 입력하세요" rows={5} />
              </div>
            </div>
          )}
        </CustomDialog>

        {/* 공지사항 삭제 확인 커스텀 다이얼로그 */}
        <CustomDialog open={deleteDialog.open} onOpenChange={deleteDialog.setOpen} title="공지사항 삭제" variant="destructive" showIcon={true} showActions={true} confirmText="삭제" onConfirm={handleConfirmDelete}>
          {deletingPost && (
            <div className="text-gray-600">
              <p className="mb-3">다음 공지사항을 정말로 삭제하시겠습니까?</p>
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
};

export default NoticePage;
