"use client";
import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import MCEditor from "@/components/editor/MCEditor";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export interface NewsPost {
  id: number;
  title: string;
  author: string;
  date: string;
  category: string;
  content: string;
  views: number;
}

const categories = ["신제품", "전시회", "파트너십", "수상", "보고서", "채용"];

const getCurrentDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};

export default function NewsPatchPage() {
  const [newPost, setNewPost] = useState<Partial<NewsPost>>({
    title: "",
    category: "",
    content: "",
    author: "",
    date: getCurrentDate(),
  });

  return (
    <div className="flex flex-col h-full w-full p-10">
      <div className="flex items-center gap-4 mb-8">
        <Image src="/images/favicon.webp" alt="CODA Logo" width={80} height={80} className="object-contain rounded-[50px] mb-4" />
        <h1 className="text-[40px] font-bold mb-4 text-blue-900">소식 수정</h1>
      </div>
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
          <Input id="add-title" value={newPost.title} onChange={(e) => setNewPost({ ...newPost, title: e.target.value })} placeholder="소식 제목을 입력하세요" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="add-author">작성자</Label>
          <Input id="add-author" value={newPost.author} onChange={(e) => setNewPost({ ...newPost, author: e.target.value })} placeholder="작성자를 입력하세요" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="add-date">작성일</Label>
          <Input id="add-date" type="date" value={newPost.date} onChange={(e) => setNewPost({ ...newPost, date: e.target.value })} className="bg-white/50 border-gray-200 focus:border-purple-400 focus:ring-purple-400" />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="add-date">내용</Label>
            <div className="flex justify-end gap-4">
              <Button className="bg-red-400 hover:bg-red-600 w-[150px] h-[40px]">취소</Button>
              <Button className="bg-blue-400 hover:bg-blue-600 w-[150px] h-[40px]">수정</Button>
            </div>
          </div>
          <MCEditor content={newPost.content} onChange={(value) => setNewPost({ ...newPost, content: value })} />
        </div>
      </div>
    </div>
  );
}
