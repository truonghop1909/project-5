"use client"
import { SongItem2 } from "@/app/components/song/SongItem2";
import { authFirebase, dbFirebase } from "@/app/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { use, useEffect, useState } from "react";

export const WishList = () => {
    const [dataFinal, setDataFinal] = useState<any>([]);

    useEffect(() => {
        onAuthStateChanged(authFirebase, async (user) => {
            if (user) {
                const userId = user.uid;
                const songRef = ref(dbFirebase, 'songs');

                onValue(songRef, async (snapshot) => {
                    const items: any[] = [];
                    snapshot.forEach((item) => {
                        items.push({ key: item.key, data: item.val() });
                    });

                    const dataSection1 = (await Promise.all(
                        items.map(async (item) => {
                            const data = item.data;
                            const wishlist = data.wishlist;
                            const singerRef = ref(dbFirebase, '/singers/' + data.singerId[0]);

                            const dataSinger = await new Promise<any>((resolve) => {
                                onValue(singerRef, (singerSnap) => {
                                    resolve(singerSnap.val());
                                }, { onlyOnce: true });
                            });

                            if (wishlist && wishlist[userId]) {
                                return {
                                    id: item.key,
                                    image: data.image,
                                    title: data.title,
                                    singer: dataSinger.title,
                                    listen: data.listen,
                                    link: `/song/${item.key}`,
                                    audio: data.audio,
                                    time: "4:23",
                                    wishlist: data.wishlist
                                };
                            }
                            return null; // trả về null nếu không có trong wishlist
                        })
                    )).filter(Boolean); // loại bỏ tất cả giá trị null hoặc undefined


                    setDataFinal(dataSection1);
                });
            }
        });
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 gap-[10px]">
                {dataFinal.map((item: any, index: number) => (
                    <SongItem2 key={index} item={item} />
                ))}
            </div>
        </>
    )
}