import useStore from "../store.jsx";
import { useState } from "react";
import FloatImg from "../../floatImg.jsx";

export default function ImageContainer({ showImg, setRenderImages, setShowImg, showFloat, setShowFloat }) {

    let { updateImg, deleteImg } = useStore();
    let [showUpdateInput, setShowUpdateInput] = useState({})
    let [inputText, setInputText] = useState('')
    // let [showFloatImg,setFloatImg] = useState('')

    let renderImg = showImg.map((el) => {

        let id = el._id

        let source = '';
        let text = '';
        if (el.imageUrl) {
            source = `http://localhost:3000/imagesFolder/${el.imageUrl}`
            text = el.text
        } else if (el.imageUrl === undefined && el.fileName === undefined) {
            text = el.text
            source = null
        } else {
            source = `http://localhost:3000/imagesFolder/${el.fileName}`
            text = el.text
        }

        return (
            <div 
            className="border border-gray-300 rounded-lg p-1 text-gray-300 h-fit">
                <div>
                    <img onClick={()=> setShowFloat(el)}
                    className="rounded-lg" src={source} />
                </div>
                <div className="p-2 text-[12px] sm:text-[14px] lg:text-[16px]">
                    {`${text.substring(0,30)}.....` }
                </div>
                {source &&
                    <div className="flex w-full justify-around p-2 text-[12px] sm:text-[14px] lg:text-[16px] ">
                        <button className="border p-1 sm:p-2 xl:pl-3 xl:pr-3 rounded-lg"
                        onClick={() => {
                                setShowUpdateInput(prev=> ({...prev,id : id}))
                        }}>Update</button>
                        <button className="border p-1 sm:p-2 xl:pl-3 xl:pr-3 rounded-lg"
                        onClick={() => {
                            let trimSource = source.slice(35)
                            deleteImg(trimSource)
                                .then(res => setShowImg(res.data.message))
                        }}>
                            Delete
                        </button>
                    </div>
                }
                { showUpdateInput.id == el._id &&
                    <div className="w-full p-1 text-[12px] sm:text-[14px] lg:text-[16px]">
                        <textarea className="w-full text-black scrollbar-thin resize-none p-2"
                        type="text" value={inputText}
                        onChange={(e) => setInputText(e.target.value)}></textarea>
                        <div className="flex w-full justify-around p-2">
                        <button className="border p-1 sm:p-2 xl:pl-3 xl:pr-3 rounded-lg"
                        onClick={() => {
                            let trimSource = source.slice(35)
                            updateImg(trimSource, inputText)
                                .then(res => console.log(res))
                            setTimeout(() => {
                                setRenderImages(prev => !prev)
                            }, 12000)
                            setShowUpdateInput(prev=> ({...prev,id: undefined}))
                            setInputText('')
                        }}>Confrim</button>
                        <button className="border p-1 sm:p-2 xl:pl-3 xl:pr-3 rounded-lg"
                        onClick={()=> {
                            setShowUpdateInput(prev=> ({...prev,id: undefined}))
                            setInputText('')
                        }}>
                            Cancel
                        </button>
                        </div>
                    </div>
                }
            </div>
        )
    })

    return (
        <>
            <div className="flex-1 gap-2 w-11/12 bg-lightGray border border-slate-400 border-opacity-45 shadow-inner-box rounded-2xl grid grid-cols-2 p-3 
            sm:grid-cols-3 md:grid-cols-4
            ">
                {renderImg}
            </div>
        </>
    )
}