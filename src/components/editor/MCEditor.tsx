"use client";
import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import "./content.css";
import "./skin.min.css";

interface EditorProps {
  content?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

const Editor = dynamic(
  async () => {
    await import("tinymce/tinymce");
    await import("tinymce/icons/default");
    await import("tinymce/themes/silver");
    await import("tinymce/models/dom");
    await import("tinymce/plugins/advlist");
    await import("tinymce/plugins/autolink");
    await import("tinymce/plugins/lists");
    await import("tinymce/plugins/link");
    await import("tinymce/plugins/image");
    await import("tinymce/plugins/charmap");
    await import("tinymce/plugins/preview");
    await import("tinymce/plugins/anchor");
    await import("tinymce/plugins/searchreplace");
    await import("tinymce/plugins/visualblocks");
    await import("tinymce/plugins/code");
    await import("tinymce/plugins/fullscreen");
    await import("tinymce/plugins/insertdatetime");
    await import("tinymce/plugins/media");
    await import("tinymce/plugins/table");
    await import("tinymce/plugins/wordcount");
    await import("tinymce/plugins/importcss");
    const mod = await import("@tinymce/tinymce-react");
    return mod.Editor;
  },
  { ssr: false }
);

export default function MCEditor({ content = "", onChange, placeholder }: EditorProps) {
  const editorRef = useRef<any>(null);

  return (
    <>
      <div className="w-[96%] sm:w-[100%] mx-auto bg-white rounded-xl shadow-lg flex flex-col gap-8">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* 에디터 영역 */}
          <div className="w-full xl:w-1/2">
            <Editor
              onInit={(_, editor) => (editorRef.current = editor)}
              onEditorChange={onChange}
              init={{
                height: 700,
                menubar: false,
                language: "ko_KR",
                language_url: "/tinymce/langs/ko_KR.js", // public 폴더 기준 경로
                skin: false,
                content_css: "/tinymce/content.css",
                importcss_append: true,
                importcss_selector_filter: ".tailwind-", // 예: tailwind- 접두사만
                plugins: ["advlist", "autolink", "lists", "link", "image", "charmap", "preview", "anchor", "searchreplace", "visualblocks", "code", "fullscreen", "insertdatetime", "media", "table", "wordcount", "importcss"],
                // 툴바 모드를 'floating'이나 'wrap'으로 설정
                toolbar_mode: "wrap",
                toolbar1: "undo redo | blocks fontfamily fontsize",
                toolbar2: "bold italic underline strikethrough | forecolor backcolor | alignleft aligncenter alignright alignjustify bullist numlist outdent indent",
                toolbar3: "image table | charmap insertdatetime | link unlink | searchreplace code fullscreen removeformat",
                images_upload_url: "/api/upload",
                automatic_uploads: true,
                images_reuse_filename: true,
                image_caption: true,
                image_title: true,
                image_advtab: true,
                imagetools_cors_hosts: ["localhost"],
                images_upload_handler: async (blobInfo, progress) => {
                  const formData = new FormData();
                  formData.append("file", blobInfo.blob(), blobInfo.filename());
                  const res = await fetch("/api/upload", {
                    method: "POST",
                    body: formData,
                  });
                  const data = await res.json();
                  if (!data.url) throw new Error("이미지 업로드 실패");
                  return data.url;
                },
                content_style: `
              body { font-family: 'Inter', 'Noto Sans KR', sans-serif; background: #fff; }
              .mce-content-body { min-height: 500px; }
              img { border-radius: 0.75rem; box-shadow: 0 2px 8px rgba(0,0,0,0.08); margin: 1.5rem auto; display: block; max-width: 100%; height: auto; }
              figure.image { display: inline-block; margin: 0 1rem 1rem 0; }
              .tox-toolbar__primary { background: #f9fafb; border-radius: 0.75rem; border: 1px solid #e5e7eb; box-shadow: 0 1px 2px rgba(0,0,0,0.03); }
              .tox .tox-tbtn:hover { background: #e5e7eb !important; transition: background 0.15s; }
              .tox .tox-tbtn--enabled, .tox .tox-tbtn:focus { background: #e5e7eb !important; }
              .tox .tox-toolbar__group { margin-right: 0.5rem; }
              .tox .tox-tbtn svg { width: 1.25rem; height: 1.25rem; }
            `,
                branding: false,
                block_formats: "제목 1=h2;제목 2=h3;본문=p;인용문=blockquote",
                table_toolbar: "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
                resize: true,
                image_dimensions: true,
                image_class_list: [
                  { title: "기본", value: "" },
                  { title: "왼쪽 정렬", value: "align-left" },
                  { title: "오른쪽 정렬", value: "align-right" },
                  { title: "가운데 정렬", value: "align-center" },
                ],
              }}
            />
          </div>
          {/* 미리보기 영역 */}
          <div className="hidden xl:block w-1/2 pl-0 xl:pl-8 border-0 xl:border-2 border-[#EEEEEE] rounded-xl p-0 xl:p-3 overflow-scroll h-[400px] xl:h-[700px] bg-gray-50">
            <h3 className="text-lg md:text-xl font-semibold mb-4 text-gray-800">미리보기</h3>
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    </>
  );
}
