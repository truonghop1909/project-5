"use client"
import { SongItem2 } from "@/app/components/song/SongItem2";
import { authFirebase, dbFirebase } from "@/app/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { get, ref, child } from "firebase/database";
import { useEffect, useState } from "react";

export const WishList = () => {
    const [dataFinal, setDataFinal] = useState<any>([]);

    useEffect(() => {
        onAuthStateChanged(authFirebase, async (user) => {
            const userId = user?.uid;
            const snapshot = await get(ref(dbFirebase, "songs"));
            if (!snapshot.exists()) return;

            const items: any[] = [];
            snapshot.forEach((item) => {
                items.push({ key: item.key, data: item.val() });
            });

            const dataSection1 = await Promise.all(
                items.map(async (item) => {
                    const data = item.data;
                    const wishlist = data.wishlist;
                    const singerRef = ref(dbFirebase, '/singers/' + data.singerId[0]);
                    const dataSinger = await get(singerRef).then(res => res.val());

                    // Nếu chưa login, hiển thị tất cả bài hát
                    if (!userId || (wishlist && wishlist[userId])) {
                        return {
                            id: item.key,
                            image: data.image,
                            title: data.title,
                            singer: dataSinger?.title || "Unknown",
                            listen: data.listen,
                            link: `/song/${item.key}`,
                            audio: data.audio,
                            wishlist: data.wishlist
                        };
                    }
                    return null;
                })
            );

            setDataFinal(dataSection1.filter(Boolean)); // loại bỏ null
        });
    }, []);

    return (
        <div className="grid grid-cols-1 gap-[10px]">
            {dataFinal.map((item: any, index: number) => (
                <SongItem2 key={index} item={item} />
            ))}
        </div>
    );
}
