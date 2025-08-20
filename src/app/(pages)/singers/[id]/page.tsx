import { CardInfo } from "@/app/components/card/CardInfo";
import { SongItem2 } from "@/app/components/song/SongItem2";
import { Title } from "@/app/components/title/title";
import { dbFirebase } from "@/app/firebaseConfig";
import { onValue, ref } from "firebase/database";
import { get } from "firebase/database";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Trang chi tiết ca sĩ",
  description: "Nội dung trang chi tiết ca sĩ",
};

// const data = [
//   {
//     image: "/demo/image-5.svg",
//     title: "Nơi Này Có Anh",
//     singer: "Sơn Tùng M-TP",
//     time: "4:32"

//   },
//   {
//     image: "/demo/image-5.svg",
//     title: "Nơi Này Có Anh 2",
//     singer: "Sơn Tùng M-TP",
//     time: "4:32"
//   },
//   {
//     image: "/demo/image-5.svg",
//     title: "Nơi Này Có Anh 3",
//     singer: "Sơn Tùng M-TP",
//     time: "4:32"
//   }
// ]


export default async function SingerDetailPage(props: any) {
  const { id } = await props.params;

  const singersRef = ref(dbFirebase, "/singers/" + id);
  const snapshot = await get(singersRef);
  const dataFinal = snapshot.val();
  // End Section 1

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
  const dataSection2: any[] = [];
  const songRef = ref(dbFirebase, 'songs');
  onValue(songRef, (items) => {
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();
      if (data.singerId.includes(id)) {
        dataSection2.push(
          {
            id: key,
            image: data.image,
            title: data.title,
            singer: dataFinal.title,
            link: `/song/${key}`,
            time: "4:32",
            audio: data.audio
          },
        )
      }
    });
  });
  return (
    <>
      <CardInfo
        image={dataFinal.image}
        title={dataFinal.title}
        description={dataFinal.description}
      />

      {/* Bài Hát Cùng Danh Mục */}
      <div className="mt-[30px]">
        <Title text="Danh Sách Bài Hát" />
        <div className="grid grid-cols-1 gap-[10px]">
          {dataSection2.map((item, index) => (
            <SongItem2 key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
