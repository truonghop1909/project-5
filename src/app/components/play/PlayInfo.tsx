export const PlayInfo = () => {
    return (
        <>
            <div className="flex items-center w-[218px]">
                <div className="w-[49px] aspect-square rounded-[14px] truncate">
                    <img
                        src="/"
                        alt=""
                        className="w-full h-full object-cover inner-image"
                    />
                </div>
                <div className="ml-[12px] flex-1">
                    <div className="font-[700] text-[15px] text-white inner-title line-clamp-1"></div>
                    <div className="font-[700] text-[12px] text-[#FFFFFF70] inner-singer"></div>
                </div>
            </div>
        </>
    )
}