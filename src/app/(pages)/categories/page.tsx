import { CardItem } from "@/app/components/card/CardItem";
import { Title } from "@/app/components/title/title";
import { dbFirebase } from "@/app/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Trang danh mục",
  description: "Nội dung trang danh mục",
};

export default function CategoryPage() {
    // const data = [
    //   {
    //     image: "/demo/image-4.svg",
    //     title: "Nhạc Trẻ",
    //     description: "Top 100 Nhạc Trẻ là danh sách 100 ca khúc hot nhất hiện tại của thể loại Nhạc Trẻ",
    //     link: "#"
    //   }
    // ]

    const dataFinal: any[] = [];
      const categoryRef = ref(dbFirebase, 'categories');
      onValue(categoryRef, (items) => {
        items.forEach((item) => {
          const key = item.key;
          const data = item.val();
    
          if (dataFinal) {
            dataFinal.push(
              {
                id: key,
                image: data.image,
                title: data.title,
                description: data.description,
                link: `/categories/${key}`
              },
            )
          }
        })
      });

  return (
    <>
      <div className="mt-[30px]">
        <Title text="Danh Mục Bài Hát" />
      </div>
      <div className="grid grid-cols-5 gap-[20px]">
        {dataFinal.map((item, index) => (
          <CardItem
            key = {index}
            item = {item}
          />
        ))}                             
      </div>
    </>
  );
}
