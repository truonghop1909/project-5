import Link from "next/link"

export const CardItem = (props: {item: any}) => {
    const {item} = props
    return (
        <>
            <div className="">
                <Link href={item.link}>
                    <div className="w-full aspect-square rounded-[15px] truncate mb-[10px]">
                        <img 
                            src={item.image}
                            alt={item.title} 
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div className="font-[700] text-[14px] text-white mb-[10px] line-camp-1">
                        {item.title}
                    </div>
                    <div className="font-[400] text-[12px] text-[#FFFFFF80] line-camp-1">
                        {item.description}
                    </div>  
                </Link>
            </div>
        </>
    )
}