"use client";
import React, { useState, ReactElement } from "react";

// 타입 정의
interface Product {
  title: string;
  link: string;
  image: string;
}

interface WebsiteData {
  mainVisual: { image: string; alt: string };
  section2: { logo: { image: string; alt: string }; heading: string };
  section3: {
    block1: { number: string; heading: string; text: string; image: string; alt: string };
    block2: { number: string; heading: string; text: string; image: string; alt: string };
  };
  section4: {
    heading: { subtitle: string; title: string };
    products: Product[];
  };
}

// 초기 데이터
const initialData: WebsiteData = {
  mainVisual: {
    image: "https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s1.webp",
    alt: "코다(CODA) 메인 이미지",
  },
  section2: {
    logo: {
      image: "https://do40f6yw4fd7i.cloudfront.net/img13/common/logo.webp",
      alt: "코다(CODA) 로고",
    },
    heading: "바다 속 향유고래 지킴이\n자원순환 CAN+PET 무인회수기",
  },
  section3: {
    block1: {
      number: "01",
      heading: "지구를 지키는 작은 시작\nCODA의 순환 이야기",
      text: "매일 버려지는 페트병과 캔을 깨끗한 자원으로 만드는 선별/수집 시스템과 물류 인프라를 구축하여 여러분의 작은 습관으로 지구를 지키는데 함께 합니다.",
      image: "https://do40f6yw4fd7i.cloudfront.net/img13/main/main_sec02_1.webp",
      alt: "코다(CODA) 지구를 지키는 작은 시작",
    },
    block2: {
      number: "02",
      heading: "건강한 지구를 위한 활동\nCODA와 함께 해주세요.",
      text: "버려지는 페트병에 바다생물이 아프지 않도록 나아가 다음 세대들의 건강한 삶을 지킬 수 있도록 CODA와 함께 해주세요.",
      image: "https://do40f6yw4fd7i.cloudfront.net/img13/main/main_sec02_2.webp",
      alt: "코다(CODA) 건강한 지구를 위한 활동",
    },
  },
  section4: {
    heading: {
      subtitle: "제품소개",
      title: "CODA와 함께\n환경을 지켜주세요.",
    },
    products: [
      {
        title: "무인회수기",
        link: "item_list_coda",
        image: "https://do40f6yw4fd7i.cloudfront.net/img13/main/main_sec03_1.webp",
      },
      {
        title: "차량용RFID",
        link: "item_rfid",
        image: "https://do40f6yw4fd7i.cloudfront.net/img13/main/main_sec03_2.webp",
      },
      {
        title: "음식물종량기",
        link: "item_food",
        image: "https://do40f6yw4fd7i.cloudfront.net/img13/main/main_sec03_4.webp",
      },
      {
        title: "CODA 더 알아보기",
        link: "brand",
        image: "https://do40f6yw4fd7i.cloudfront.net/img13/main/main_sec03_5.webp",
      },
    ],
  },
};

// 레이블 정의
const fieldLabels: { [key: string]: string } = {
  "mainVisual.image": "메인 비주얼 이미지 URL",
  "mainVisual.alt": "메인 비주얼 이미지 설명",
  "section2.logo.image": "로고 이미지 URL",
  "section2.logo.alt": "로고 이미지 설명",
  "section2.heading": "메인 제목",
  "section3.block1.number": "첫 번째 블록 번호",
  "section3.block1.heading": "첫 번째 블록 제목",
  "section3.block1.text": "첫 번째 블록 텍스트",
  "section3.block1.image": "첫 번째 블록 이미지 URL",
  "section3.block1.alt": "첫 번째 블록 이미지 설명",
  "section3.block2.number": "두 번째 블록 번호",
  "section3.block2.heading": "두 번째 블록 제목",
  "section3.block2.text": "두 번째 블록 텍스트",
  "section3.block2.image": "두 번째 블록 이미지 URL",
  "section3.block2.alt": "두 번째 블록 이미지 설명",
  "section4.heading.subtitle": "제품 소개 부제목",
  "section4.heading.title": "제품 소개 제목",
};

const productLabels: { [key: string]: string } = {
  title: "제품 제목",
  link: "제품 링크",
  image: "제품 이미지 URL",
};

type TabType = "edit" | "preview";

const getNestedValue = (obj: any, path: string): any =>
  path.split(".").reduce((prev, curr) => prev && prev[curr], obj);

const setNestedValue = (obj: any, path: string, value: any): any => {
  const newObj = { ...obj };
  const keys = path.split(".");
  let current = newObj;
  for (let i = 0; i < keys.length - 1; i++) {
    current[keys[i]] = { ...current[keys[i]] };
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
  return newObj;
};

const CodaEditor: React.FC = () => {
  const [websiteData, setWebsiteData] = useState<WebsiteData>(initialData);
  const [activeTab, setActiveTab] = useState<TabType>("edit");
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 필드 변경 핸들러
  const handleChange = (path: string, value: string) => {
    setWebsiteData((prev) => setNestedValue(prev, path, value));
  };

  // 제품 정보 변경 핸들러
  const handleProductChange = (index: number, field: keyof Product, value: string) => {
    setWebsiteData((prev) => {
      const products = prev.section4.products.map((p, i) =>
        i === index ? { ...p, [field]: value } : p
      );
      return {
        ...prev,
        section4: {
          ...prev.section4,
          products,
        },
      };
    });
  };

  // 이미지 미리보기
  const handleImagePreview = (url: string) => setPreviewImage(url);

  // 텍스트 필드 렌더링
  const renderTextField = (path: string, multiline = false): ReactElement => {
    const value = getNestedValue(websiteData, path);
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {fieldLabels[path]}
        </label>
        {multiline ? (
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={value}
            onChange={(e) => handleChange(path, e.target.value)}
            rows={4}
          />
        ) : (
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={value}
            onChange={(e) => handleChange(path, e.target.value)}
          />
        )}
      </div>
    );
  };

  // 이미지 필드 렌더링
  const renderImageField = (path: string): ReactElement => {
    const value = getNestedValue(websiteData, path);
    return (
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          {fieldLabels[path]}
        </label>
        <div className="flex space-x-2">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={value}
            onChange={(e) => handleChange(path, e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-1 rounded focus:outline-none focus:shadow-outline w-[120px] text-center"
            onClick={() => handleImagePreview(value)}
            type="button"
          >
            미리보기
          </button>
        </div>
      </div>
    );
  };

  // 제품 필드 렌더링
  const renderProductFields = (): ReactElement[] =>
    websiteData.section4.products.map((product, index) => (
      <div key={index} className="mb-8 p-4 border border-gray-200 rounded bg-gray-50">
        <h3 className="font-bold text-lg mb-4">제품 {index + 1}</h3>
        {/* 제품 제목 */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {productLabels.title}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={product.title}
            onChange={(e) => handleProductChange(index, "title", e.target.value)}
          />
        </div>
        {/* 제품 링크 */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {productLabels.link}
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            value={product.link}
            onChange={(e) => handleProductChange(index, "link", e.target.value)}
          />
        </div>
        {/* 제품 이미지 */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            {productLabels.image}
          </label>
          <div className="flex space-x-2">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              value={product.image}
              onChange={(e) => handleProductChange(index, "image", e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[120px] text-center"
              onClick={() => handleImagePreview(product.image)}
              type="button"
            >
              미리보기
            </button>
          </div>
        </div>
      </div>
    ));

  // 미리보기 렌더링
  const renderPreview = (): ReactElement => {
    const d = websiteData;
    return (
      <div className="bg-white text-black">
        {/* 메인 비주얼 */}
        <section className="w-full">
          <div className="relative">
            <img src={d.mainVisual.image} className="w-[50%] h-auto" alt={d.mainVisual.alt} />
          </div>
        </section>
        {/* 섹션 2 */}
        <section className="py-12 text-center">
          <div className="w-full max-w-[95%] mx-auto">
            <img src={d.section2.logo.image} alt={d.section2.logo.alt} className="mx-auto mb-6 h-16" />
            <h2 className="text-3xl leading-tight mb-8 whitespace-pre-line">{d.section2.heading}</h2>
          </div>
        </section>
        {/* 섹션 3 */}
        <section className="pb-12 bg-gradient-to-b from-transparent to-gray-100">
          <div className="w-full max-w-[95%] mx-auto">
            {/* 첫 번째 블록 */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
              <div className="w-full md:w-[40%] order-2 md:order-1">
                <h3 className="text-xl text-blue-500 bg-gradient-to-r from-blue-500 to-white text-white pl-2 mr-24 font-light">
                  {d.section3.block1.number}
                </h3>
                <h4 className="text-3xl leading-tight my-4 whitespace-pre-line">{d.section3.block1.heading}</h4>
                <p className="text-lg leading-relaxed">{d.section3.block1.text}</p>
              </div>
              <div className="w-full md:w-[47%] overflow-hidden rounded-2xl order-1 md:order-2">
                <img
                  src={d.section3.block1.image}
                  alt={d.section3.block1.alt}
                  className="w-full h-auto transition-transform hover:scale-105"
                />
              </div>
            </div>
            {/* 두 번째 블록 */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0 mt-12">
              <div className="w-full md:w-[47%] overflow-hidden rounded-2xl">
                <img
                  src={d.section3.block2.image}
                  alt={d.section3.block2.alt}
                  className="w-full h-auto transition-transform hover:scale-105"
                />
              </div>
              <div className="w-full md:w-[40%]">
                <h3 className="text-xl text-blue-500 bg-gradient-to-r from-blue-500 to-white text-white pl-2 mr-24 font-light">
                  {d.section3.block2.number}
                </h3>
                <h4 className="text-3xl leading-tight my-4 whitespace-pre-line">{d.section3.block2.heading}</h4>
                <p className="text-lg leading-relaxed">{d.section3.block2.text}</p>
              </div>
            </div>
          </div>
        </section>
        {/* 섹션 4 - 제품 */}
        <section className="pt-12 pb-12">
          <div className="w-full max-w-[95%] mx-auto">
            <div className="mb-8">
              <h3 className="text-lg text-blue-500">{d.section4.heading.subtitle}</h3>
              <h4 className="text-3xl leading-tight mt-4 whitespace-pre-line">{d.section4.heading.title}</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {d.section4.products.map((item, idx) => (
                <div key={idx} className="relative overflow-hidden rounded-xl group">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-auto transition-transform group-hover:scale-105"
                  />
                  <h5 className="absolute bottom-6 left-6 text-2xl text-gray-600 font-light">
                    {item.title}
                  </h5>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-2xl font-bold mb-6 text-center">
          페이지 URL : www.coda230.com
        </h1>
        {/* 탭 */}
        <div className="flex mb-4">
          <button
            className={`py-2 px-4 mr-2 ${activeTab === "edit" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            onClick={() => setActiveTab("edit")}
            type="button"
          >
            콘텐츠 편집
          </button>
          <button
            className={`py-2 px-4 mr-2 ${activeTab === "preview" ? "bg-blue-500 text-white" : "bg-gray-300"}`}
            onClick={() => setActiveTab("preview")}
            type="button"
          >
            웹사이트 미리보기
          </button>
        </div>
        {/* 이미지 미리보기 모달 */}
        {previewImage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-4 rounded-lg max-w-3xl max-h-[90vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">이미지 미리보기</h3>
                <button
                  className="text-gray-700 hover:text-gray-900"
                  onClick={() => setPreviewImage(null)}
                  type="button"
                >
                  ✕
                </button>
              </div>
              <img src={previewImage} alt="이미지 미리보기" className="max-w-full" />
            </div>
          </div>
        )}
        {/* 콘텐츠 편집 폼 */}
        {activeTab === "edit" && (
          <div className="bg-white shadow-md rounded p-6">
            <h2 className="text-xl font-bold mb-6">콘텐츠 편집</h2>
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">메인 비주얼</h3>
              {renderImageField("mainVisual.image")}
              {renderTextField("mainVisual.alt")}
            </div>
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">섹션 2</h3>
              {renderImageField("section2.logo.image")}
              {renderTextField("section2.logo.alt")}
              {renderTextField("section2.heading", true)}
            </div>
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">섹션 3 - 첫 번째 블록</h3>
              {renderTextField("section3.block1.number")}
              {renderTextField("section3.block1.heading", true)}
              {renderTextField("section3.block1.text", true)}
              {renderImageField("section3.block1.image")}
              {renderTextField("section3.block1.alt")}
            </div>
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">섹션 3 - 두 번째 블록</h3>
              {renderTextField("section3.block2.number")}
              {renderTextField("section3.block2.heading", true)}
              {renderTextField("section3.block2.text", true)}
              {renderImageField("section3.block2.image")}
              {renderTextField("section3.block2.alt")}
            </div>
            <div className="mb-8">
              <h3 className="font-bold text-lg mb-4 border-b pb-2">섹션 4 - 제품 소개</h3>
              {renderTextField("section4.heading.subtitle")}
              {renderTextField("section4.heading.title", true)}
              <h4 className="font-bold text-md mt-6 mb-4">제품 목록</h4>
              {renderProductFields()}
            </div>
          </div>
        )}
        {/* 웹사이트 미리보기 */}
        {activeTab === "preview" && (
          <div className="bg-white shadow-md rounded overflow-hidden">
            {renderPreview()}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodaEditor;
