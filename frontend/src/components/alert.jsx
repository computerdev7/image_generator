import useStore from "../store.jsx"

export default function Alert({text,setShowAlert}){

    let {setShowAlertF} = useStore()

    return (
        <>
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-40  md:h-44 lg:w-3/5 xl:w-2/5 xl:h-48 sm:text-md md:text-lg w-3/4 bg-darkGray/40 backdrop-blur-sm  rounded-xl z-50 p-2"
        >
        <div className="bg-lightGray/60 backdrop-blur-sm h-full w-full rounded-xl flex justify-around items-center flex-col">
            <p className="text-gray-300 p-2 text-center">{text}</p>
        <button className="border border-gray-300 rounded-lg text-gray-300 p-2 hover:border-white hover:text-white"
        onClick={()=> {
            setShowAlert(false)
            setShowAlertF();
        }}
        >Cancel</button>
        </div>
        </div>
        </>
    )
}