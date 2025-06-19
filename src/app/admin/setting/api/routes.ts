import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { Categories } from "@/types/categories";

const categoriesPath = path.join(process.cwd(), "src/utils/categories.json");

export async function GET() {
  try {
    const fileContents = fs.readFileSync(categoriesPath, "utf8");
    const categories: Categories = JSON.parse(fileContents);
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Failed to read categories file:", error);
    return NextResponse.json({ error: "Failed to read categories file" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedCategories: Categories = await request.json();

    const requiredKeys = ["news", "notice", "faq", "downloads"];
    for (const key of requiredKeys) {
      if (!updatedCategories[key as keyof Categories] || !Array.isArray(updatedCategories[key as keyof Categories])) {
        return NextResponse.json({ error: `Invalid or missing ${key} array` }, { status: 400 });
      }
    }

    fs.writeFileSync(categoriesPath, JSON.stringify(updatedCategories, null, 2), "utf8");
    return NextResponse.json({ message: "Categories updated successfully" });
  } catch (error) {
    console.error("Failed to update categories file:", error);
    return NextResponse.json({ error: "Failed to update categories file" }, { status: 500 });
  }
}
