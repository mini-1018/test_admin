"use client";
import React, { useState, useEffect } from "react";
import { Plus, Save, Trash2, Tag, Loader2, Edit3, X, Check } from "lucide-react";
import { Download, HelpCircle, Newspaper, Bell } from "lucide-react";
import { Categories } from "@/types/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { CustomDialog, useCustomDialog } from "@/components/custom/CustomDialog";

export default function CategoriesTap() {
  const [categories, setCategories] = useState<Categories>({
    news: [],
    notice: [],
    faq: [],
    downloads: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<{ categoryKey: keyof Categories; index: number; value: string } | null>(null);
  const [newItemCategory, setNewItemCategory] = useState<keyof Categories | null>(null);
  const [newItemValue, setNewItemValue] = useState("");

  const addDialog = useCustomDialog();
  const deleteDialog = useCustomDialog();

  const categoryConfig = {
    news: {
      label: "뉴스",
      icon: Newspaper,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
    },
    notice: {
      label: "공지사항",
      icon: Bell,
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
      iconColor: "text-teal-600",
    },
    faq: {
      label: "FAQ",
      icon: HelpCircle,
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
    },
    downloads: {
      label: "다운로드",
      icon: Download,
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      iconColor: "text-gray-600",
    },
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      if (response.ok) {
        const data = await response.json();
        setCategories(data);
      } else {
        toast.error("카테고리 로딩에 실패했습니다");
      }
    } catch (error) {
      toast.error("카테고리 로딩에 실패했습니다");
    } finally {
      setLoading(false);
    }
  };

  const saveCategories = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/categories", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categories),
      });

      if (response.ok) {
        toast.success("카테고리가 성공적으로 저장되었습니다");
      } else {
        toast.error("카테고리 저장에 실패했습니다");
      }
    } catch (error) {
      toast.error("카테고리 저장에 실패했습니다");
    } finally {
      setSaving(false);
    }
  };

  const handleAddItem = (categoryKey: keyof Categories) => {
    setNewItemCategory(categoryKey);
    setNewItemValue("");
    addDialog.openCustomDialog();
  };

  const confirmAddItem = () => {
    if (newItemCategory && newItemValue.trim()) {
      setCategories((prev) => ({
        ...prev,
        [newItemCategory]: [...prev[newItemCategory], newItemValue.trim()],
      }));
      setNewItemCategory(null);
      setNewItemValue("");
      toast.success("새 항목이 추가되었습니다");
    }
  };

  const handleDeleteItem = (categoryKey: keyof Categories, index: number) => {
    setEditingItem({ categoryKey, index, value: categories[categoryKey][index] });
    deleteDialog.openCustomDialog();
  };

  const confirmDeleteItem = () => {
    if (editingItem) {
      setCategories((prev) => ({
        ...prev,
        [editingItem.categoryKey]: prev[editingItem.categoryKey].filter((_, i) => i !== editingItem.index),
      }));
      setEditingItem(null);
      toast.success("항목이 삭제되었습니다");
      deleteDialog.closeCustomDialog();
    }
  };

  const startEditing = (categoryKey: keyof Categories, index: number) => {
    setEditingItem({ categoryKey, index, value: categories[categoryKey][index] });
  };

  const saveEdit = () => {
    if (editingItem) {
      setCategories((prev) => ({
        ...prev,
        [editingItem.categoryKey]: prev[editingItem.categoryKey].map((item, i) => (i === editingItem.index ? editingItem.value : item)),
      }));
      setEditingItem(null);
      toast.success("항목이 수정되었습니다");
    }
  };

  const cancelEdit = () => {
    setEditingItem(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-lg text-slate-700">카테고리를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 p-6">
      <div className="max-w-6xl mx-auto">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <Button onClick={saveCategories} disabled={saving} className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl">
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  저장 중...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  변경사항 저장
                </>
              )}
            </Button>
          </div>
        </div>

        {/* 카테고리 그리드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Object.entries(categories).map(([categoryKey, items]) => {
            const config = categoryConfig[categoryKey as keyof Categories];
            const IconComponent = config.icon;

            return (
              <Card key={categoryKey} className="bg-white/80 backdrop-blur-sm border-gray-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 ${config.bgColor} ${config.borderColor} border rounded-xl flex items-center justify-center`}>
                        <IconComponent className={`w-5 h-5 ${config.iconColor}`} />
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-slate-900">{config.label}</CardTitle>
                        <p className="text-sm text-gray-500 mt-1">{items.length}개 항목</p>
                      </div>
                    </div>
                    <Button onClick={() => handleAddItem(categoryKey as keyof Categories)} size="sm" className="bg-gray-900 hover:bg-gray-800 text-white rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-200">
                      <Plus className="w-4 h-4 mr-1" />
                      추가
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {items.length === 0 ? (
                      <div className="text-center py-12">
                        <div className={`w-16 h-16 ${config.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                          <IconComponent className={`w-8 h-8 ${config.iconColor} opacity-50`} />
                        </div>
                        <p className="text-gray-500 text-sm">항목이 없습니다</p>
                      </div>
                    ) : (
                      items.map((item: string, index: number) => (
                        <div key={index} className="group flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-100 transition-all duration-200 hover:shadow-sm">
                          {editingItem?.categoryKey === categoryKey && editingItem?.index === index ? (
                            // 편집 모드
                            <>
                              <Tag className="w-4 h-4 text-gray-600 flex-shrink-0" />
                              <Input
                                value={editingItem.value}
                                onChange={(e) => setEditingItem({ ...editingItem, value: e.target.value })}
                                className="flex-1 border-none bg-transparent focus:ring-0 focus:outline-none px-0 text-sm"
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") saveEdit();
                                  if (e.key === "Escape") cancelEdit();
                                }}
                                autoFocus
                              />
                              <div className="flex items-center gap-1">
                                <Button size="sm" variant="ghost" onClick={saveEdit} className="w-6 h-6 p-0 text-green-600 hover:bg-green-100">
                                  <Check className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={cancelEdit} className="w-6 h-6 p-0 text-gray-500 hover:bg-gray-100">
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </>
                          ) : (
                            // 일반 모드
                            <>
                              <Tag className="w-4 h-4 text-gray-600 flex-shrink-0" />
                              <span className="flex-1 text-sm text-slate-700 font-medium">{item}</span>
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Button size="sm" variant="ghost" onClick={() => startEditing(categoryKey as keyof Categories, index)} className="w-6 h-6 p-0 text-gray-500 hover:bg-gray-100 hover:text-blue-600">
                                  <Edit3 className="w-3 h-3" />
                                </Button>
                                <Button size="sm" variant="ghost" onClick={() => handleDeleteItem(categoryKey as keyof Categories, index)} className="w-6 h-6 p-0 text-gray-500 hover:bg-red-100 hover:text-red-600">
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            </>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 추가 다이얼로그 */}
        <CustomDialog
          open={addDialog.open}
          onOpenChange={addDialog.setOpen}
          title={`새 ${newItemCategory ? categoryConfig[newItemCategory].label : ""} 항목 추가`}
          onConfirm={() => {
            confirmAddItem();
            addDialog.closeCustomDialog();
          }}
          onCancel={addDialog.closeCustomDialog}
          confirmText="추가"
          cancelText="취소"
          showActions={true}
          showIcon={true}
          variant="default"
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">새로운 {newItemCategory ? categoryConfig[newItemCategory].label : ""} 항목을 입력하세요.</p>
            <Input
              placeholder="항목 이름을 입력하세요"
              value={newItemValue}
              onChange={(e) => setNewItemValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  confirmAddItem();
                  addDialog.closeCustomDialog();
                }
                if (e.key === "Escape") {
                  addDialog.closeCustomDialog();
                }
              }}
              autoFocus
            />
          </div>
        </CustomDialog>

        {/* 삭제 다이얼로그 */}
        <CustomDialog
          open={deleteDialog.open}
          onOpenChange={deleteDialog.setOpen}
          title="항목 삭제"
          onConfirm={() => {
            confirmDeleteItem();
          }}
          onCancel={deleteDialog.closeCustomDialog}
          confirmText="삭제"
          cancelText="취소"
          variant="destructive"
          showActions={true}
          showIcon={true}
        >
          <div className="space-y-4">
            <p className="text-sm text-gray-600">다음 항목을 삭제하시겠습니까?</p>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="font-medium text-gray-900">"{editingItem?.value}"</p>
            </div>
            <p className="text-xs text-red-600">이 작업은 되돌릴 수 없습니다.</p>
          </div>
        </CustomDialog>
      </div>
    </div>
  );
}
