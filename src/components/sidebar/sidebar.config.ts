import { Settings, Tag, Users, Bell, Shield, Database, Palette, Globe } from "lucide-react";

export type UserRole = "normal" | "super";

export interface NavigationItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  description: string;
  href: string;
  requiresPermission?: boolean;
  permission?: UserRole;
  badge?: string;
}

export const adminNavigation: NavigationItem[] = [
  {
    id: "categories",
    label: "카테고리 관리",
    icon: Tag,
    description: "뉴스, 공지사항, FAQ, 다운로드 카테고리 설정",
    href: "/admin/categories",
  },
  {
    id: "users",
    label: "사용자 관리",
    icon: Users,
    description: "관리자 계정 및 권한 설정",
    href: "/admin/users",
    requiresPermission: true,
    permission: "super",
  },
  {
    id: "notifications",
    label: "알림 설정",
    icon: Bell,
    description: "시스템 알림 및 이메일 설정",
    href: "/admin/notifications",
    requiresPermission: true,
    permission: "super",
  },
  {
    id: "database",
    label: "데이터베이스",
    icon: Database,
    description: "백업 및 데이터 관리 설정",
    href: "/admin/database",
    requiresPermission: true,
    permission: "super",
  },
  {
    id: "system",
    label: "시스템 설정",
    icon: Globe,
    description: "일반적인 시스템 환경 설정",
    href: "/admin/system",
    requiresPermission: true,
    permission: "super",
  },
];

export const hasPermission = (item: NavigationItem, userRole: UserRole): boolean => {
  if (!item.requiresPermission) return true;
  if (userRole === "normal") return false;
  if (userRole === "super") return true;
  return item.permission === userRole;
};
