import { CardItem } from "@/app/components/card/CardItem";
import { Title } from "@/app/components/title/title";
import { dbFirebase } from "@/app/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Trang danh sách ca sĩ",
  description: "Nội dung trang danh sách ca sĩ",
};

// const data = [
//   {
//     image: "/demo/image-5.svg",
//     title: "Sơn Tùng",
//     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//     link: "#"
//   },
//   {
//     image: "/demo/image-5.svg",
//     title: "Sơn Tùng",
//     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//     link: "#"
//   },
//   {
//     image: "/demo/image-5.svg",
//     title: "Sơn Tùng",
//     description: "TLorem Ipsum is simply dummy text of the printing and typesetting industry.",
//     link: "#"
//   },
//   {
//     image: "/demo/image-5.svg",
//     title: "Sơn Tùng",
//     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
//     link: "#"
//   }
// ]
const data1: any[] = [];
const singerRef = ref(dbFirebase, 'singers');
onValue(singerRef, (items) => {
  items.forEach((item) => {
    const key = item.key;
    const data = item.val();

    if (data1) {
      data1.push(
        {
          id: key,
          image: data.image,
          title: data.title,
          description: data.description,
          link: `/singers/${key}`
        },
      )
    }
  })
});

export default function SingersPage() {
  return (
    <>
      <div className="mt-[30px]">
        <Title text="Ca Sĩ Nổi Bật" />
      </div>
      <div className="grid grid-cols-5 gap-[20px]">
        {data1.map((item, index) => (
          <CardItem
            key={index}
            item={item}
          />
        ))}
      </div>
    </>
  );
}
