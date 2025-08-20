import { Title } from "@/app/components/title/title";
import { Metadata } from "next";
import Image from "next/image";
import { WishList } from "./WishList";

export const metadata: Metadata = {
  title: "Trang bài hát yêu thích",
  description: "Nội dung trang bài hát yêu thích",
};

export default function SongPage() {
  return (
    <>
      <div className="mt-[30px]">
        <Title text="Bài Hát Yêu Thích" />
      </div>
      <div className="mt-[30px]">
        <Title text="Danh Sách Bài Hát" />
        <WishList/>
      </div>
    </>
  );
}
