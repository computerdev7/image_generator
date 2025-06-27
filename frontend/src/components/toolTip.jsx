export default function ToolTip({text,more}){
    return (
        <>
        <div className={`absolute h-fit w-fit p-2 bg-black/50 rounded-md group-hover:block hidden pointer-events-none text-gray-300 backdrop-blur-sm ${more ? 'mt-3' : 'mt-14'}`}>
            {text}
        </div>
        </>
    )
}