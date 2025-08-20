import { Metadata } from "next";
import Image from "next/image";
import { CardInfo } from "@/app/components/card/CardInfo";
import { Title } from "@/app/components/title/title";
import { dbFirebase } from "@/app/firebaseConfig";
import { ref, get, Database, onValue } from "firebase/database";
import { SongItem2 } from "@/app/components/song/SongItem2";
// import { SongItem2 } from "@/app/components/song/SongItem2";


export const metadata: Metadata = {
  title: "Trang chi tiết bài hát",
  description: "Nội dung trang chi tiết bài hát",
};

export default async function SongPage(props: any) {

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

  // Section-1
  const { id } = await props.params;
  const song1Ref = ref(dbFirebase, "/songs/" + id);
  const snapshot = await get(song1Ref);
  const dataFinal = snapshot.val();
  const singerRef = ref(dbFirebase, '/singers/' + dataFinal.singerId[0])
  const itemSinger = await get(singerRef)
  const dataSinger = itemSinger.val();
  dataFinal["singers"] = dataSinger.title;
  // End Section-1

  // Section-3
  const dataSection3: any[] = [];
  const song2Ref = ref(dbFirebase, 'songs');
  onValue(song2Ref, (items) => {
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();
      if (data.categoryId === dataFinal.categoryId && key !== id) {
        const singerRef = ref(dbFirebase, '/singers/' + data.singerId[0]);
        onValue(singerRef, (item) => {
          const dataSinger = item.val();
          dataSection3.push(
            {
              id: key,
              image: data.image,
              title: data.title,
              singer: dataSinger.title,
              link: `/song/${key}`,
              time: "4:32"
            },
          )
        })
      }
    });
  });
  // End Section-3

  return (
    <>
      <CardInfo
        image={dataFinal.image}
        title={dataFinal.title}
        description={dataFinal.singers}
      />

      {/* Lời Bài Hát */}
      <div className="mt-[30px]">
        <Title text="Lời Bài Hát" />
      </div>
      <div className="bg-[#212121] text-white rounded-[15px] p-[20px] whitespace-pre-line">
        {dataFinal.lyric}
      </div>

      {/* Bài Hát Cùng Danh Mục */}
      <div className="mt-[30px]">
        <Title text="Bài Hát Cùng Danh Mục" />
        <div className="grid grid-cols-1 gap-[10px]">
          {dataSection3.map((item, index) => (
            <SongItem2 key = {index} item = {item}/>
          ))}
        </div>
      </div>
    </>
  );
}
