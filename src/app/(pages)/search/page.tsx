import { Title } from "@/app/components/title/title";
import { Section1 } from "./section-1";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Trang kết quả tìm kiếm",
  description: "Nội dung trang kết quả tìm kiếm",
};

// const data = [
//   {
//     image: "/demo/image-3.svg",
//     title: "Cô Phòng",
//     singer: "Hồ Quang Hiếu, Huỳnh Văn",
//     time: "4:32"

//   },
//   {
//     image: "/demo/image-3.svg",
//     title: "Cô Phòng 2",
//     singer: "Hồ Quang Hiếu, Huỳnh Văn",
//     time: "4:32"
//   },
//   {
//     image: "/demo/image-3.svg",
//     title: "Cô Phòng 3",
//     singer: "Hồ Quang Hiếu, Huỳnh Văn",
//     time: "4:32"
//   }
// ]

export default function SearchPage() {
  return (
    <>
      <div className="mt-[30px]">
        <Title text="Danh Sách Bài Hát" />
        <div className="grid grid-cols-1 gap-[10px]">
          <Suspense>
            <Section1 />
          </Suspense>
        </div>
      </div>
    </>
  );
}
