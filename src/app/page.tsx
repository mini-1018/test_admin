"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function Home() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (formData.username === "admin" && formData.password === "1234") {
        // 로그인 성공
        localStorage.setItem("isAdminLoggedIn", "true");
        router.push("/admin");
      } else {
        setError("아이디 또는 비밀번호가 올바르지 않습니다.");
      }
    } catch (error) {
      setError("로그인 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20 flex items-center justify-center p-6">
      <div className="relative w-full max-w-md">
        <Card className="bg-white/90 backdrop-blur-sm border-gray-200/60 shadow-2xl">
          <CardHeader className="text-center">
            <div className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Image src="/images/favicon.webp" alt="CODA Logo" width={80} height={80} className="object-contain rounded-[50px]" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900 mb-2">CODA 관리자</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* 아이디 입력 */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                  아이디
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input id="username" name="username" type="text" required value={formData.username} onChange={handleInputChange} placeholder="관리자 아이디를 입력하세요" className="pl-10 bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-blue-400" />
                </div>
              </div>

              {/* 비밀번호 입력 */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  비밀번호
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input id="password" name="password" type={showPassword ? "text" : "password"} required value={formData.password} onChange={handleInputChange} placeholder="비밀번호를 입력하세요" className="pl-10 pr-12 bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-blue-400" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* 에러 메시지 */}
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                  <p className="text-sm text-red-600 text-center">{error}</p>
                </div>
              )}

              {/* 로그인 버튼 */}
              <Button type="submit" disabled={isLoading} className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 transition-all duration-200 cursor-pointer">
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                    로그인 중...
                  </div>
                ) : (
                  "로그인"
                )}
              </Button>
            </form>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-xs text-blue-600 text-center">계정문의 : support@coda.ai.kr</p>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">© 2025 CODA Admin Center</p>
        </div>
      </div>
    </div>
  );
}
