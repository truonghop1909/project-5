import { Metadata } from "next";
import Image from "next/image";
import { Title } from "./components/title/title";
import { SongItem } from "./components/song/SongItem";
import { CardItem } from "./components/card/CardItem";
import { getDatabase, ref, onValue } from "firebase/database";
import { dbFirebase } from "./firebaseConfig";

export const metadata: Metadata = {
  title: "Trang chủ",
  description: "Nội dung trang chủ",
};




export default function Home() {
  // Section-1
  const dataSection1: any[] = [];
  const songRef = ref(dbFirebase, 'songs');
  onValue(songRef, (items) => {
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();

      if (dataSection1.length < 3) {
        const singerRef = ref(dbFirebase, '/singers/' + data.singerId[0]);
        onValue(singerRef, (itemSinger) => {
          const dataSinger = itemSinger.val();
          dataSection1.push(
            {
              id: key,
              image: data.image,
              title: data.title,
              singer: dataSinger.title,
              listen: data.listen,
              link: `/song/${key}`,
              audio: data.audio,
              wishlist: data.wishlist
            },
          )
        })
      }
    });
  });
  // End Section-1

  // const dataSection1 = [
  //   {
  //     image: "/demo/image-3.svg",
  //     title: "Cô Phòng",
  //     singer: "Hồ Quang Hiếu, Huỳnh Văn",
  //     listen: 20000
  //   },
  //   {
  //     image: "/demo/image-3.svg",
  //     title: "Cô Phòng 3",
  //     singer: "Hồ Quang Hiếu, Huỳnh Văn",
  //     listen: 20000
  //   },
  //   {
  //     image: "/demo/image-3.svg",
  //     title: "Cô Phòng 3",
  //     singer: "Hồ Quang Hiếu, Huỳnh Văn",
  //     listen: 20000
  //   },
  // ]

  // Section-2
  const dataSection2: any[] = [];
  // const dataSection2 = [
  //   {
  //     image: "/demo/image-4.svg",
  //     title: "Nhạc Trẻ",
  //     description: "Top 100 Nhạc Trẻ là danh sách 100 ca khúc hot nhất hiện tại của thể loại Nhạc Trẻ",
  //     link: "#"
  //   }
  // ]
  const categoryRef = ref(dbFirebase, 'categories');
  onValue(categoryRef, (items) => {
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();

      if (dataSection2.length < 5) {
        dataSection2.push(
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

  // End Section-2

  // Section-3
  // const dataSection3 = [
  //   {
  //     image: "/demo/image-5.svg",
  //     title: "Sơn Tùng",
  //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //     link: "#"
  //   }
  // ]

  const dataSection3: any[] = [];
  const singerRef = ref(dbFirebase, 'singers');
  onValue(singerRef, (items) => {
    items.forEach((item) => {
      const key = item.key;
      const data = item.val();

      if (dataSection3.length < 5) {
        dataSection3.push(
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
  // End Section-3

  return (
    <>
      {/* Section-1 */}
      <div className="flex items-start">
        <div className="w-[534px]">
          <div
            className="w-full flex items-center rounded-[15px] bg-cover"
            style={{ backgroundImage: "url('/demo/background-1.png')" }}
          >
            <div className="flex-1 mr-[34px] ml-[30px]">
              <div className="font-[700] text-[32px] text-white mb-[6px]">
                Nhạc EDM
              </div>
              <div className="font-[500] text-[14px] text-white">
                Top 100 Nhạc Electronic/Dance Âu Mỹ là danh sách 100 ca khúc hot nhất hiện tại của thể loại Top 100 Nhạc Electronic/Dance Âu Mỹ
              </div>
            </div>
            <div className="w-[215px] mr-[22px] mt-[48px]">
              <img
                src="/demo/image-2.svg"
                alt="Nhạc EDM"
                className="w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex-1 ml-[20px]">
          <Title text="Nghe Nhiều" />
          <div className="grid grid-cols-1 gap-[12px]">
            {/* Item */}
            {dataSection1.map((item, index) => (
              <SongItem
                key={index}
                item={item}
              />
            ))}
            {/* End Item */}
          </div>
        </div>
      </div>
      {/*End Section-1 */}
      {/* Section-2 */}
      <div className="mt-[30px]">
        <Title text="Danh Mục Nổi Bật" />
      </div>
      <div className="grid grid-cols-5 gap-[20px]">
        {dataSection2.map((item, index) => (
          <CardItem
            key={index}
            item={item}
          />
        ))}
      </div>
      {/* End Section-2 */}
      {/* Section-3 */}
      <div className="mt-[30px]">
        <Title text="Ca Sĩ Nổi Bật" />
      </div>
      <div className="grid grid-cols-5 gap-[20px]">
        {dataSection3.map((item, index) => (
          <CardItem
            key={index}
            item={item}
          />
        ))}
      </div>
      {/* End Section-3 */}
    </>
  );
}
