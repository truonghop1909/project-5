"use client";

import { SongItem2 } from "@/app/components/song/SongItem2";
import { dbFirebase } from "@/app/firebaseConfig";
import { ref, onValue, get } from "firebase/database";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const Section1 = () => {
    const searchParams = useSearchParams();
    const [dataFinal, setDataFinal] = useState<any[]>([]);
    const defaultKeyword = searchParams.get("keyword")?.toLowerCase().trim() || "";

    useEffect(() => {
        const songRef = ref(dbFirebase, "songs");

        onValue(songRef, async (songsSnap) => {
            const promises: Promise<any>[] = [];

            songsSnap.forEach((songItem) => {
                const key = songItem.key;
                const data = songItem.val();

                const singerRef = ref(dbFirebase, "/singers/" + data.singerId[0]);

                const p = get(singerRef).then((singerSnap) => {
                    const dataSinger = singerSnap.val();
                    return {
                        id: key,
                        image: data.image,
                        title: data.title,
                        singer: dataSinger?.title || "Unknown",
                        link: `/song/${key}`,
                        time: "4:32",
                        audio: data.audio
                    };
                });

                promises.push(p);
            });

            const allSongs = await Promise.all(promises);

            // Nếu có keyword thì lọc
            const filteredSongs = defaultKeyword
                ? allSongs.filter((song) =>
                      (song.title + " " + song.singer).toLowerCase().includes(defaultKeyword)
                  )
                : allSongs;

            setDataFinal(filteredSongs);
        });
    }, [defaultKeyword]);

    return (
        <>
            {dataFinal.length > 0 ? (
                dataFinal.map((item, index) => (
                    <SongItem2 key={index} item={item} />
                ))
            ) : (
                <p className="text-white">Không tìm thấy bài hát nào</p>
            )}
        </>
    );
};
