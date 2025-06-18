"use client";
import React, { useState } from "react";
import { Search, Upload, Calendar, User, FileText, Trash2, Edit, Download } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { CustomDialog, useCustomDialog } from "@/components/custom/CustomDialog";

export interface DownloadPost {
  id: number;
  title: string;
  author: string;
  date: string;
  fileSize: string;
  downloadCount: number;
  imageUrl: string;
}

const downloads: DownloadPost[] = [
  {
    id: 1,
    title: "무인회수기(압축) 카탈로그.pdf",
    author: "코다",
    date: "2025-05-25",
    fileSize: "2.4MB",
    downloadCount: 89,
    imageUrl: "https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s1.webp",
  },
  {
    id: 2,
    title: "무인회수기(파쇄) 카탈로그.pdf",
    author: "코다",
    date: "2025-05-24",
    fileSize: "15.7MB",
    downloadCount: 67,
    imageUrl: "https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s1.webp",
  },
  {
    id: 3,
    title: "무인회수기(압축) 카탈로그.pdf",
    author: "코다",
    date: "2025-05-22",
    fileSize: "1.8MB",
    downloadCount: 124,
    imageUrl: "https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s1.webp",
  },
  {
    id: 4,
    title: "차량용 RFID 매뉴얼.pdf",
    author: "코다",
    date: "2025-05-20",
    fileSize: "8.3MB",
    downloadCount: 45,
    imageUrl: "https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s1.webp",
  },
  {
    id: 5,
    title: "음식물 종량기 매뉴얼.pdf",
    author: "코다",
    date: "2025-05-18",
    fileSize: "856KB",
    downloadCount: 78,
    imageUrl: "https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s1.webp",
  },
  {
    id: 6,
    title: "음식물 종량기 매뉴얼.pdf",
    author: "코다",
    date: "2025-05-18",
    fileSize: "856KB",
    downloadCount: 78,
    imageUrl: "https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s1.webp",
  },
  {
    id: 7,
    title: "음식물 종량기 매뉴얼.pdf",
    author: "코다",
    date: "2025-05-18",
    fileSize: "856KB",
    downloadCount: 78,
    imageUrl: "https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s1.webp",
  },
  {
    id: 8,
    title: "음식물 종량기 매뉴얼.pdf",
    author: "코다",
    date: "2025-05-18",
    fileSize: "856KB",
    downloadCount: 78,
    imageUrl: "https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s1.webp",
  },
  {
    id: 9,
    title: "음식물 종량기 매뉴얼.pdf",
    author: "코다",
    date: "2025-05-18",
    fileSize: "856KB",
    downloadCount: 78,
    imageUrl: "https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s1.webp",
  },
];

const DownloadsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingPost, setEditingPost] = useState<DownloadPost | null>(null);
  const [deletingPost, setDeletingPost] = useState<DownloadPost | null>(null);

  // 모달 상태 관리
  const uploadDialog = useCustomDialog();
  const editDialog = useCustomDialog();
  const deleteDialog = useCustomDialog();

  const filteredPosts = downloads.filter((post) => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleEdit = (post: DownloadPost) => {
    setEditingPost(post);
    editDialog.openCustomDialog();
  };

  const handleSaveEdit = () => {
    console.log("Updated post:", editingPost);
    setEditingPost(null);
  };

  const handleDelete = (post: DownloadPost) => {
    setDeletingPost(post);
    deleteDialog.openCustomDialog();
  };

  const handleConfirmDelete = () => {
    console.log("Deleted post:", deletingPost);
    setDeletingPost(null);
  };

  const handleUpload = () => {
    console.log("File uploaded");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-6">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 flex items-center justify-center relative">
              <div className="w-full h-full bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <Download className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">다운로드 관리</h1>
            </div>
          </div>
        </div>

        {/* 통계 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 파일</p>
                  <p className="text-2xl font-bold text-slate-900">{downloads.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">총 다운로드</p>
                  <p className="text-2xl font-bold text-slate-900">{downloads.reduce((sum, item) => sum + item.downloadCount, 0).toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">이번 달</p>
                  <p className="text-2xl font-bold text-green-600">+12%</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 검색 및 액션 버튼 */}
        <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60 mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex-1 max-w-2xl">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 group-focus-within:text-gray-600 transition-colors" />
                  <Input type="text" placeholder="파일명으로 검색..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-12 bg-white/50 border-gray-200 focus:!border-blue-400 focus:!ring-blue-400" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={uploadDialog.openCustomDialog}>
                  <Upload className="w-4 h-4 mr-2" />
                  파일 업로드
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 게시글 목록 */}
        {filteredPosts.length === 0 ? (
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200/60">
            <CardContent className="p-20 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-xl font-semibold mb-2 text-slate-700">검색결과가 없습니다</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="group bg-white/80 backdrop-blur-sm border-gray-200/60 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"></div>
                  <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute bottom-4 left-4 z-20">
                    <Badge variant="secondary" className="bg-black/60 backdrop-blur-sm text-white hover:bg-black/70">
                      {post.fileSize}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 space-y-4">
                  <h3 className="text-slate-900 font-semibold text-lg leading-tight group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">{post.title}</h3>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-gray-600" />
                      </div>
                      <span className="font-medium">{post.author}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>{new Date(post.date).toLocaleDateString("ko-KR")}</span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-500 text-sm">다운로드 {post.downloadCount.toLocaleString()}회</span>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline" className="h-7 px-2" onClick={() => handleEdit(post)}>
                            <Edit className="w-3 h-3 mr-1" />
                            수정
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(post)}>
                            <Trash2 className="w-3 h-3 mr-1" />
                            삭제
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* 업로드 모달 */}
        <CustomDialog open={uploadDialog.open} onOpenChange={uploadDialog.setOpen} title="새 파일 업로드" size="lg" showActions={true} confirmText="업로드" onConfirm={handleUpload}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">파일 제목</Label>
              <Input id="title" placeholder="파일 제목을 입력하세요" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">작성자</Label>
              <Input id="author" placeholder="작성자를 입력하세요" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image">이미지 URL</Label>
              <Input id="image" placeholder="이미지 URL을 입력하세요" />
            </div>
            <div className="space-y-2">
              <Label>파일 업로드</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="w-8 h-8 mx-auto text-gray-400" />
                <p className="text-gray-600">파일을 드래그하거나 클릭하여 업로드</p>
              </div>
            </div>
          </div>
        </CustomDialog>

        {/* 수정 모달 */}
        <CustomDialog open={editDialog.open} onOpenChange={editDialog.setOpen} title="파일 정보 수정" size="lg" showActions={true} confirmText="저장" onConfirm={handleSaveEdit}>
          {editingPost && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">파일 제목</Label>
                <Input id="edit-title" value={editingPost.title} onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })} placeholder="파일 제목을 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-author">작성자</Label>
                <Input id="edit-author" value={editingPost.author} onChange={(e) => setEditingPost({ ...editingPost, author: e.target.value })} placeholder="작성자를 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-image">이미지 URL</Label>
                <Input id="edit-image" value={editingPost.imageUrl} onChange={(e) => setEditingPost({ ...editingPost, imageUrl: e.target.value })} placeholder="이미지 URL을 입력하세요" />
              </div>
              <div className="space-y-2">
                <Label>파일 변경</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-6 h-6 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">새 파일을 드래그하거나 클릭하여 업로드</p>
                  <p className="text-xs text-gray-500 mt-1">현재: {editingPost.fileSize}</p>
                </div>
              </div>
            </div>
          )}
        </CustomDialog>

        {/* 삭제 확인 모달 */}
        <CustomDialog open={deleteDialog.open} onOpenChange={deleteDialog.setOpen} title="파일 삭제" variant="destructive" showIcon={true} showActions={true} confirmText="삭제" onConfirm={handleConfirmDelete}>
          {deletingPost && (
            <div className="text-gray-600">
              <p className="mb-3">다음 파일을 정말로 삭제하시겠습니까?</p>
              <div className="bg-gray-50 p-3 rounded-lg mb-3">
                <p className="font-medium text-gray-900">{deletingPost.title}</p>
                <p className="text-sm text-gray-500">작성자: {deletingPost.author}</p>
                <p className="text-sm text-gray-500">파일 크기: {deletingPost.fileSize}</p>
              </div>
              <p className="text-red-600 text-sm font-medium">⚠️ 삭제하면 복구할 수 없습니다.</p>
            </div>
          )}
        </CustomDialog>
      </div>
    </div>
  );
};

export default DownloadsPage;
