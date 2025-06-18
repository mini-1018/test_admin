"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TextField from "@/components/common/TextField";
import ImageField from "@/components/common/ImageField";
import ImagePreviewModal from "@/components/common/ImagePreviewModal";

// 공통 컴포넌트: 섹션 카드
interface SectionCardProps {
  title: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, children }) => (
  <Card className="mb-6">
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {children}
    </CardContent>
  </Card>
);

// 공통 컴포넌트: 콘텐츠 블록 카드
interface ContentBlockCardProps {
  title: string;
  children: React.ReactNode;
}

const ContentBlockCard: React.FC<ContentBlockCardProps> = ({ title, children }) => (
  <Card className="bg-gray-50">
    <CardHeader className="pb-3">
      <CardTitle className="text-md">{title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      {children}
    </CardContent>
  </Card>
);

// 브랜드 페이지 데이터 타입 정의
interface ContentBlock {
  number: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

interface BrandData {
  section1: {
    title: string;
    subtitle: string;
    image: string;
    alt: string;
  };
  section2: {
    image: string;
    alt: string;
  };
  section3: {
    title: string;
    blocks: ContentBlock[];
  };
  section4: {
    title: string;
    subtitle: string;
    image: string;
    alt: string;
  };
  section5: {
    image: string;
    alt: string;
  };
}

// 초기 데이터
const initialBrandData: BrandData = {
  section1: {
    title: "자원 선순환 플랫폼",
    subtitle: "바다를 자유롭게 헤엄치며 서로 대화하는 향유고래만의 언어인 코다를 모티브로 삼은 '자원 순환 브랜드'입니다",
    image: "https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s2.webp",
    alt: "코다(CODA) 자원 선순환 플랫폼",
  },
  section2: {
    image: "https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s3_text.webp",
    alt: "코다(CODA) 바다환경변화 이야기",
  },
  section3: {
    title: "향유고래\n자연보전",
    blocks: [
      {
        number: "1",
        title: "하와이 섬, 해변에서 발견된 향유고래",
        subtitle: "[세계자연보전연맹 IUCN, 적색목록 '취약']",
        image: "https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s4_1.webp",
        alt: "코다(CODA) 해변에서 발견된 향유고래",
      },
      {
        number: "2",
        title: "전세계 해양쓰레기로 인한 피해",
        subtitle: "[플라스틱 용기와 페트병 쓰레기의 사전 예방 필요성 증가]",
        image: "https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s4_2.webp",
        alt: "코다(CODA) 전세계 해양쓰레기로 인한 피해",
      },
      {
        number: "3",
        title: "넘치는 페트병, 캔 폐기물",
        subtitle: "[유엔환경계획 UNEP, 매년 800만톤 '해양쓰레기 발생']",
        image: "https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s4_3.webp",
        alt: "코다(CODA) 넘치는 페트병, 캔 폐기물",
      },
      {
        number: "4",
        title: "탄소 중립 시대\n공기 중의 이산화탄소 농도 줄이기",
        subtitle: "[RE100 - 온실가스 배출 저감 위한 대처방안]",
        image: "https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s4_4.webp",
        alt: "코다(CODA) 탄소 중립 시대",
      },
    ],
  },
  section4: {
    title: "재활용자원\n모아주세요",
    subtitle: "'자원을 아끼며 보살필 때, 자연 환경을 회복합니다.'",
    image: "https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s5.webp",
    alt: "코다(CODA) 재활용자원 모아주세요",
  },
  section5: {
    image: "https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s7_text.webp",
    alt: "코다(CODA) 포트폴리오",
  },
};

const BrandEditor: React.FC = () => {
  const [brandData, setBrandData] = useState<BrandData>(initialBrandData);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // 섹션 1 업데이트
  const updateSection1 = (field: keyof BrandData['section1'], value: string) => {
    setBrandData(prev => ({
      ...prev,
      section1: { ...prev.section1, [field]: value }
    }));
  };

  // 섹션 2 업데이트
  const updateSection2 = (field: keyof BrandData['section2'], value: string) => {
    setBrandData(prev => ({
      ...prev,
      section2: { ...prev.section2, [field]: value }
    }));
  };

  // 섹션 3 업데이트
  const updateSection3Title = (value: string) => {
    setBrandData(prev => ({
      ...prev,
      section3: { ...prev.section3, title: value }
    }));
  };

  const updateSection3Block = (index: number, field: keyof ContentBlock, value: string) => {
    setBrandData(prev => ({
      ...prev,
      section3: {
        ...prev.section3,
        blocks: prev.section3.blocks.map((block, i) =>
          i === index ? { ...block, [field]: value } : block
        )
      }
    }));
  };

  // 섹션 4 업데이트
  const updateSection4 = (field: keyof BrandData['section4'], value: string) => {
    setBrandData(prev => ({
      ...prev,
      section4: { ...prev.section4, [field]: value }
    }));
  };

  // 섹션 5 업데이트
  const updateSection5 = (field: keyof BrandData['section5'], value: string) => {
    setBrandData(prev => ({
      ...prev,
      section5: { ...prev.section5, [field]: value }
    }));
  };

  // 미리보기 렌더링
  const renderPreview = () => {
    const d = brandData;
    return (
      <div className="bg-white text-black">
        {/* 자원 선순환 플랫폼 섹션 */}
        <section className="w-full mt-44 mb-80">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <div className="mb-2.5 flex justify-center">
              <img
                src={d.section1.image}
                width={300}
                height={300}
                alt={d.section1.alt}
                className="rounded-none"
              />
            </div>
            <div className="text-center">
              <h2 className="text-4xl font-bold text-blue-500 mt-12 mb-8">
                {d.section1.title}
              </h2>
              <p className="text-xl font-light text-gray-500">
                {d.section1.subtitle}
              </p>
            </div>
          </div>
        </section>

        {/* 바다환경변화 이야기 섹션 */}
        <section className="w-full">
          <div className="max-w-6xl mx-auto px-4">
            <img
              src={d.section2.image}
              width={1200}
              height={600}
              alt={d.section2.alt}
              className="w-full h-auto"
            />
          </div>
        </section>

        {/* 향유고래 자연보전 섹션 */}
        <section className="w-full bg-gray-50 py-32">
          <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-indigo-900 leading-tight whitespace-pre-line">
                {d.section3.title}
              </h2>
            </div>

            {/* 컨텐츠 블록들 */}
            <div className="space-y-24">
              {d.section3.blocks.map((block, index) => (
                <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? '' : 'lg:flex-row-reverse'
                }`}>
                  <div className="lg:w-1/2">
                    <img
                      src={block.image}
                      width={600}
                      height={400}
                      alt={block.alt}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                  <div className={`lg:w-1/2 ${index % 2 === 0 ? 'text-right lg:pr-12' : 'text-left lg:pl-12'}`}>
                    <img
                      src={`https://do40f6yw4fd7i.cloudfront.net/img13/common/num${block.number}.webp`}
                      width={50}
                      height={50}
                      alt={`코다(CODA) ${block.number}번 컨텐츠`}
                      className="inline-block mb-2.5"
                    />
                    <h3 className="text-2xl font-bold text-blue-500 mb-2 whitespace-pre-line">
                      {block.title}
                    </h3>
                    <p className="text-base text-black">
                      {block.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 재활용자원 모아주세요 섹션 */}
        <section className="w-full py-40">
          <div className="max-w-6xl mx-auto px-4 text-center flex flex-col items-center">
            <h2 className="text-5xl font-bold text-indigo-900 leading-tight mb-8 whitespace-pre-line">
              {d.section4.title}
            </h2>
            <p className="text-3xl font-light text-gray-600 mb-24">
              {d.section4.subtitle}
            </p>
            <img
              src={d.section4.image}
              width={1200}
              height={600}
              alt={d.section4.alt}
              className="w-[70%] h-auto"
            />
          </div>
        </section>

        {/* 포트폴리오 섹션 */}
        <section
          className="w-full py-48 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://do40f6yw4fd7i.cloudfront.net/img13/brand/coda_brand_s7_bg.webp')",
          }}
        >
          <div className="w-[95%] mx-auto px-4 text-center">
            <img
              src={d.section5.image}
              width={1980}
              height={1000}
              alt={d.section5.alt}
              className="w-full h-auto"
            />
          </div>
        </section>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">브랜드 페이지 편집</h1>
          <p className="text-gray-600">www.coda230.com/brand</p>
        </div>

        <ImagePreviewModal 
          imageUrl={previewImage} 
          onClose={() => setPreviewImage(null)} 
        />

        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">콘텐츠 편집</TabsTrigger>
            <TabsTrigger value="preview">웹사이트 미리보기</TabsTrigger>
          </TabsList>

          <TabsContent value="edit" className="space-y-6">
            {/* 섹션 1 - 자원 선순환 플랫폼 */}
            <SectionCard title="섹션 1 - 자원 선순환 플랫폼">
              <TextField
                label="제목"
                value={brandData.section1.title}
                onChange={(value) => updateSection1('title', value)}
                placeholder="자원 선순환 플랫폼"
              />
              <TextField
                label="부제목"
                value={brandData.section1.subtitle}
                onChange={(value) => updateSection1('subtitle', value)}
                multiline
                rows={3}
                placeholder="브랜드 설명을 입력하세요"
              />
              <ImageField
                label="이미지 URL"
                value={brandData.section1.image}
                onChange={(value) => updateSection1('image', value)}
                onPreview={setPreviewImage}
              />
              <TextField
                label="이미지 설명"
                value={brandData.section1.alt}
                onChange={(value) => updateSection1('alt', value)}
                placeholder="이미지 alt 텍스트"
              />
            </SectionCard>

            {/* 섹션 2 - 바다환경변화 이야기 */}
            <SectionCard title="섹션 2 - 바다환경변화 이야기">
              <ImageField
                label="이미지 URL"
                value={brandData.section2.image}
                onChange={(value) => updateSection2('image', value)}
                onPreview={setPreviewImage}
              />
              <TextField
                label="이미지 설명"
                value={brandData.section2.alt}
                onChange={(value) => updateSection2('alt', value)}
                placeholder="이미지 alt 텍스트"
              />
            </SectionCard>

            {/* 섹션 3 - 향유고래 자연보전 */}
            <SectionCard title="섹션 3 - 향유고래 자연보전">
              <TextField
                label="섹션 제목"
                value={brandData.section3.title}
                onChange={updateSection3Title}
                multiline
                rows={2}
                placeholder="향유고래\n자연보전"
              />
              
              <div className="space-y-4">
                {brandData.section3.blocks.map((block, index) => (
                  <ContentBlockCard key={index} title={`컨텐츠 블록 ${index + 1}`}>
                    <TextField
                      label="번호"
                      value={block.number}
                      onChange={(value) => updateSection3Block(index, 'number', value)}
                      placeholder="1"
                    />
                    <TextField
                      label="제목"
                      value={block.title}
                      onChange={(value) => updateSection3Block(index, 'title', value)}
                      multiline
                      rows={2}
                      placeholder="블록 제목을 입력하세요"
                    />
                    <TextField
                      label="부제목"
                      value={block.subtitle}
                      onChange={(value) => updateSection3Block(index, 'subtitle', value)}
                      placeholder="부제목을 입력하세요"
                    />
                    <ImageField
                      label="이미지 URL"
                      value={block.image}
                      onChange={(value) => updateSection3Block(index, 'image', value)}
                      onPreview={setPreviewImage}
                    />
                    <TextField
                      label="이미지 설명"
                      value={block.alt}
                      onChange={(value) => updateSection3Block(index, 'alt', value)}
                      placeholder="이미지 alt 텍스트"
                    />
                  </ContentBlockCard>
                ))}
              </div>
            </SectionCard>

            {/* 섹션 4 - 재활용자원 모아주세요 */}
            <SectionCard title="섹션 4 - 재활용자원 모아주세요">
              <TextField
                label="제목"
                value={brandData.section4.title}
                onChange={(value) => updateSection4('title', value)}
                multiline
                rows={2}
                placeholder="재활용자원\n모아주세요"
              />
              <TextField
                label="부제목"
                value={brandData.section4.subtitle}
                onChange={(value) => updateSection4('subtitle', value)}
                placeholder="부제목을 입력하세요"
              />
              <ImageField
                label="이미지 URL"
                value={brandData.section4.image}
                onChange={(value) => updateSection4('image', value)}
                onPreview={setPreviewImage}
              />
              <TextField
                label="이미지 설명"
                value={brandData.section4.alt}
                onChange={(value) => updateSection4('alt', value)}
                placeholder="이미지 alt 텍스트"
              />
            </SectionCard>

            {/* 섹션 5 - 포트폴리오 */}
            <SectionCard title="섹션 5 - 포트폴리오">
              <ImageField
                label="이미지 URL"
                value={brandData.section5.image}
                onChange={(value) => updateSection5('image', value)}
                onPreview={setPreviewImage}
              />
              <TextField
                label="이미지 설명"
                value={brandData.section5.alt}
                onChange={(value) => updateSection5('alt', value)}
                placeholder="이미지 alt 텍스트"
              />
            </SectionCard>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardContent className="p-0">
                {renderPreview()}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default BrandEditor;
