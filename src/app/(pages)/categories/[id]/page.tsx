import { SongItem2 } from "@/app/components/song/SongItem2";
import { Title } from "@/app/components/title/title";
import { Metadata } from "next";
import Image from "next/image";
import { CardInfo } from "@/app/components/card/CardInfo";
import { onValue, ref } from "firebase/database";
import { dbFirebase } from "@/app/firebaseConfig";
import { get } from "firebase/database";


export const metadata: Metadata = {
  title: "Trang danh sách bài hát theo danh mục",
  description: "Nội dung trang danh sách bài hát theo danh mục",
};

export default async function CategoryDetailPage(props: any) {
  // Section 1
  const { id } = await props.params;

  const categoryRef = ref(dbFirebase, "/categories/" + id);
  const snapshot = await get(categoryRef);
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

      if (data.categoryId === id) {
        const singerRef = ref(dbFirebase, '/singers/' + data.singerId[0]);
        onValue(singerRef, (item) => {
          const dataSinger = item.val();
          dataSection2.push(
            {
              id: key,
              image: data.image,
              title: data.title,
              singer: dataSinger.title,
              link: `/song/${key}`,
              time: "4:32",
              audio: data.audio
            },
          )
        })
      }
    });
  });
  return (
    <>
      {/* Section 1 */}
      <CardInfo
        image={dataFinal.image}
        title={dataFinal.title}
        description={dataFinal.description}
      />

      {/*End Section 1 */}
      {/* Section 2 */}
      <div className="mt-[30px]">
        <Title text="Danh Sách Bài Hát" />
        <div className="grid grid-cols-1 gap-[10px]">
          {dataSection2.map((item, index) => (
            <SongItem2 key={index} item={item} />
          ))}
        </div>

      </div>
      {/*End Section 2 */}
    </>
  );
}

