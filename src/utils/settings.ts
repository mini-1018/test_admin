import { promises as fs } from "fs";
import path from "path";

const SETTINGS_FILE = path.join(process.cwd(), "src/utils/categories.json");

export interface CategorySettings {
  news: string[];
  notice: string[];
  faq: string[];
  downloads: string[];
}

export type CategoryType = keyof CategorySettings;

const DEFAULT_CATEGORIES: CategorySettings = {
  news: ["신제품", "전시회", "파트너십", "수상", "보고서", "채용"],
  notice: ["이벤트", "전시회", "시스템 점검", "출시", "변경", "공지"],
  faq: ["일반", "기술지원", "주문/결제", "배송", "반품/교환", "회원"],
  downloads: ["카탈로그", "매뉴얼", "소프트웨어", "드라이버", "브로슈어"],
};

export async function getAllCategorySettings(): Promise<CategorySettings> {
  try {
    const content = await fs.readFile(SETTINGS_FILE, "utf-8");
    const categories = JSON.parse(content) as CategorySettings;

    const result = { ...DEFAULT_CATEGORIES };
    Object.keys(categories).forEach((key) => {
      if (key in result) {
        result[key as CategoryType] = categories[key as CategoryType];
      }
    });

    return result;
  } catch (error) {
    console.error("Failed to read categories:", error);
    // 파일이 없거나 오류가 발생하면 기본값 반환 및 파일 생성
    await writeAllCategorySettings(DEFAULT_CATEGORIES);
    return DEFAULT_CATEGORIES;
  }
}

// 특정 타입의 카테고리만 읽기
export async function getCategories(type: CategoryType): Promise<string[]> {
  const allCategories = await getAllCategorySettings();
  return allCategories[type] || [];
}

// 모든 카테고리 설정 저장
export async function writeAllCategorySettings(categories: CategorySettings): Promise<boolean> {
  try {
    const content = JSON.stringify(categories, null, 2);
    await fs.writeFile(SETTINGS_FILE, content, "utf-8");
    return true;
  } catch (error) {
    console.error("Failed to write categories:", error);
    return false;
  }
}

// 특정 타입의 카테고리 업데이트
export async function updateCategories(type: CategoryType, categories: string[]): Promise<boolean> {
  try {
    const allCategories = await getAllCategorySettings();
    allCategories[type] = categories;
    return await writeAllCategorySettings(allCategories);
  } catch (error) {
    console.error(`Failed to update ${type} categories:`, error);
    return false;
  }
}

// 카테고리 추가
export async function addCategory(type: CategoryType, category: string): Promise<boolean> {
  try {
    const categories = await getCategories(type);
    if (!categories.includes(category)) {
      categories.push(category);
      return await updateCategories(type, categories);
    }
    return true;
  } catch (error) {
    console.error(`Failed to add category to ${type}:`, error);
    return false;
  }
}

// 카테고리 삭제
export async function removeCategory(type: CategoryType, category: string): Promise<boolean> {
  try {
    const categories = await getCategories(type);
    const filteredCategories = categories.filter((cat) => cat !== category);
    return await updateCategories(type, filteredCategories);
  } catch (error) {
    console.error(`Failed to remove category from ${type}:`, error);
    return false;
  }
}
