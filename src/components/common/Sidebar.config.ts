import { Settings, Tag, Users, Bell, Shield, Database, Palette, Globe, Menu, X, Lock } from "lucide-react";

type UserRole = "normal" | "super";

interface TabConfig {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  description: string;
  badge?: string;
  requiresPermission?: boolean;
  permission?: UserRole;
}

const tabsConfig: TabConfig[] = [
  {
    id: "categories",
    label: "카테고리 관리",
    icon: Tag,
    description: "뉴스, 공지사항, FAQ, 다운로드 카테고리 설정",
  },
  {
    id: "users",
    label: "사용자 관리",
    icon: Users,
    description: "관리자 계정 및 권한 설정",
    requiresPermission: true,
    permission: "super",
  },
  {
    id: "notifications",
    label: "알림 설정",
    icon: Bell,
    description: "시스템 알림 및 이메일 설정",
    requiresPermission: true,
    permission: "super",
  },
  // {
  //   id: "security",
  //   label: "보안 설정",
  //   icon: Shield,
  //   description: "비밀번호 정책 및 보안 옵션",
  //   component: () => <div className="text-center py-12 text-gray-500">보안 설정 탭 (개발 예정)</div>,
  //   requiresPermission: true,
  //   permission: "super",
  // },
  {
    id: "database",
    label: "데이터베이스",
    icon: Database,
    description: "백업 및 데이터 관리 설정",
    requiresPermission: true,
    permission: "super",
  },
  // {
  //   id: "appearance",
  //   label: "테마 설정",
  //   icon: Palette,
  //   description: "사이트 테마 및 브랜딩 설정",
  //   component: () => <div className="text-center py-12 text-gray-500">테마 설정 탭 (개발 예정)</div>,
  //   requiresPermission: true,
  //   permission: "super",
  // },
  {
    id: "system",
    label: "시스템 설정",
    icon: Globe,
    description: "일반적인 시스템 환경 설정",
    requiresPermission: true,
    permission: "super",
  },
];

const activeTabConfig = tabsConfig.find((tab) => tab.id === activeTab);
