"use client";
import { FaPlay } from "react-icons/fa6";

export const ButtonPlay = (props: any) => {
    const { item, className } = props;
    const handlePlay = () => {
        const audio = item.audio;

        const elementPlayAudio: any = document.querySelector(".play-audio");
        //Phat nhac
        if (elementPlayAudio) {
            const elementAudio = elementPlayAudio?.querySelector(".inner-audio");
            const elementSource = elementAudio?.querySelector("source");
            if (elementSource) {
                elementSource.src = audio;
            }
            if(elementAudio) {
                elementAudio.load();
                elementAudio.play();
            }

            //hien thi khoi play
            elementPlayAudio.classList.remove("hidden");

            // hien thi anh
            const elementImage = elementPlayAudio.querySelector(".inner-image");
            elementImage.src = item.image;
            elementImage.alt = item.title;
            

            //Hien thi tieu de
            const elementTitle = elementPlayAudio.querySelector(".inner-title");
            elementTitle.innerHTML = item.title;

            //Hien thi ca si
            const elementSinger = elementPlayAudio.querySelector(".inner-singer");
            elementSinger.innerHTML = item.singer;

            //Hien thi nut pause
            const elementButtonPlay = elementPlayAudio.querySelector(".inner-button-play");
            elementButtonPlay.classList.add("play");

            //Lay ra tong thoi gian cua bai hat
            const elementPlayTimeCurrent = elementPlayAudio.querySelector(".inner-play-time .inner-current");
            const elementPlayTimeTotal = elementPlayAudio.querySelector(".inner-play-time .inner-total");
            elementAudio.onloadedmetadata = () => {
                const totalTime = elementAudio.duration;
                elementPlayTimeTotal.max = totalTime;

                // Lấy ra thời gian hiện tại
                elementAudio.ontimeupdate = () => {
                    const currentTime = elementAudio.currentTime;
                    const percent = currentTime * 100 / totalTime;
                    elementPlayTimeCurrent.style.width = `${percent}%`;
                    elementPlayTimeTotal.value = currentTime; 
                }
            }
            //Xoa class active cho bai hat truoc do dang phat
            const elementSongOld = document.querySelector("[song-id].active");
            if(elementSongOld) {
                elementSongOld.classList.remove("active");
            }

            //them class active cho bai hat
            const elementSong = document.querySelector(`[song-id="${item.id}"]`);
            elementSong?.classList.add("active");
        }        
    }
    return (
        <>
            <button
                className={className}
                onClick={handlePlay}
            >
                <FaPlay />
            </button>
        </>
    )
}