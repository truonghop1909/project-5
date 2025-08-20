"use client";

import { SongItem2 } from "@/app/components/song/SongItem2";
import { authFirebase, dbFirebase } from "@/app/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";

// Định nghĩa interface Song
interface Song {
  id: string;
  image: string;
  title: string;
  singer: string;
  listen: number;
  link: string;
  audio: string;
  time: string;
  wishlist?: Record<string, boolean>;
}

// Type guard để lọc null
function isSong(item: Song | null): item is Song {
  return item !== null;
}

export const WishList = () => {
  const [dataFinal, setDataFinal] = useState<Song[]>([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(authFirebase, (user) => {
      if (!user) return;

      const userId = user.uid;
      const songRef = ref(dbFirebase, "songs");

      onValue(songRef, async (snapshot) => {
        const items: { key: string; data: any }[] = [];
        snapshot.forEach((item) => {
          if (item.key) items.push({ key: item.key, data: item.val() });
        });

        const allSongs = await Promise.all(
          items.map(async (item) => {
            const data = item.data;
            const wishlist = data.wishlist;
            const singerRef = ref(dbFirebase, "/singers/" + data.singerId[0]);

            const dataSinger: { title: string } = await new Promise((resolve) => {
              onValue(
                singerRef,
                (snap) => {
                  resolve(snap.val());
                },
                { onlyOnce: true }
              );
            });

            if (wishlist && wishlist[userId]) {
              return {
                id: item.key,
                image: data.image as string,
                title: data.title as string,
                singer: dataSinger.title,
                listen: data.listen as number,
                link: `/song/${item.key}`,
                audio: data.audio as string,
                time: "4:23",
                wishlist: data.wishlist,
              } as Song;
            }

            return null;
          })
        );

        const songsList: Song[] = allSongs.filter(isSong);
        setDataFinal(songsList);
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-[10px]">
      {dataFinal.map((item) => (
        <SongItem2 key={item.id} item={item} />
      ))}
    </div>
  );
};
