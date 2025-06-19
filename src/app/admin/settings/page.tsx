"use client";

import React, { useState, useEffect } from "react";
import { Categories } from "@/types/categories";

const AdminSettingPage: React.FC = () => {
  const [categories, setCategories] = useState<Categories>({
    news: [],
    notice: [],
    faq: [],
    downloads: [],
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const categoryLabels = {
    news: "뉴스",
    notice: "공지사항",
    faq: "FAQ",
    downloads: "다운로드",
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
        showMessage("error", "Failed to load categories");
      }
    } catch (error) {
      showMessage("error", "Failed to load categories");
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
        showMessage("success", "카테고리가 성공적으로 저장되었습니다.");
      } else {
        showMessage("error", "카테고리 저장에 실패했습니다.");
      }
    } catch (error) {
      showMessage("error", "카테고리 저장에 실패했습니다.");
    } finally {
      setSaving(false);
    }
  };

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  const addItem = (categoryKey: keyof Categories) => {
    const newItem = prompt(`새로운 ${categoryLabels[categoryKey]} 항목을 입력하세요:`);
    if (newItem && newItem.trim()) {
      setCategories((prev) => ({
        ...prev,
        [categoryKey]: [...prev[categoryKey], newItem.trim()],
      }));
    }
  };

  const removeItem = (categoryKey: keyof Categories, index: number) => {
    if (confirm("이 항목을 삭제하시겠습니까?")) {
      setCategories((prev) => ({
        ...prev,
        [categoryKey]: prev[categoryKey].filter((_, i) => i !== index),
      }));
    }
  };

  const updateItem = (categoryKey: keyof Categories, index: number, newValue: string) => {
    setCategories((prev) => ({
      ...prev,
      [categoryKey]: prev[categoryKey].map((item, i) => (i === index ? newValue : item)),
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-900">카테고리 관리</h1>
              <button onClick={saveCategories} disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed">
                {saving ? "저장 중..." : "저장"}
              </button>
            </div>

            {message && <div className={`mt-4 p-3 rounded-md ${message.type === "success" ? "bg-green-100 text-green-700 border border-green-200" : "bg-red-100 text-red-700 border border-red-200"}`}>{message.text}</div>}
          </div>

          <div className="p-6">
            <div className="space-y-8">
              {Object.entries(categories).map(([categoryKey, items]) => (
                <div key={categoryKey} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800">{categoryLabels[categoryKey as keyof Categories]}</h2>
                    <button onClick={() => addItem(categoryKey as keyof Categories)} className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700">
                      + 추가
                    </button>
                  </div>

                  <div className="space-y-2">
                    {items.map((item: any, index: any) => (
                      <div key={index} className="flex items-center space-x-2">
                        <input type="text" value={item} onChange={(e) => updateItem(categoryKey as keyof Categories, index, e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button onClick={() => removeItem(categoryKey as keyof Categories, index)} className="px-3 py-2 bg-red-600 text-white text-sm rounded-md hover:bg-red-700">
                          삭제
                        </button>
                      </div>
                    ))}

                    {items.length === 0 && <div className="text-gray-500 text-center py-4">항목이 없습니다. 새 항목을 추가해보세요.</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingPage;
