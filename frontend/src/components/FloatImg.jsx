export default function FloatImg({showFloat,setShowFloat}){
    return (
        <>
        <div className="fixed h-fit w-4/5 min-[500px]:w-3/5 sm:w-3/6 lg:w-2/5 top-1/2 bottom-1/2 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 bg-lightGray/30 z-30 p-2 flex flex-col 
                    justify-center items-center gap-1 backdrop-blur-xl backdrop-filter shadow-2xl text-white rounded-2xl border-gray-300/20 border-2">
                        <div className='p-1 border border-gray-300/30'>
                            <img className='min-[450px]:max-h-96'
                                src={`http://localhost:3000/imagesFolder/${showFloat.imageUrl}`} />
                        </div>
                        <div className='p-1 border border-gray-300/30 bg-darkGray/40 max-h-[150px] overflow-y-scroll scrollbar-none
                         scrollbar-thin '>
                            <p>{showFloat.text}</p>
                        </div>
                        <button className='h-10 w-36 border border-gray-300/30 text-gray-300 hover:border-gray-300/100 hover:text-white'
                            onClick={() => {
                                setShowFloat('')
                            }}
                        >Cancel</button>
                    </div>
        </>
    )
}