import useStore from "../store.jsx";
import { useEffect, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa6";
import ToolTip from "./toolTip.jsx";


export default function ImageContainer({ limitImg, showImg, setRenderImages, setShowImg, setShowFloat, setLimitImg,setShowAlert,setAlertText }) {

    let { updateImg, deleteImg } = useStore();
    let [showUpdateInput, setShowUpdateInput] = useState({})
    let [inputText, setInputText] = useState('')
    let [showUDemo, setShowUDemo] = useState(false)
    let uRef = useRef()

    useEffect(() => {
        let el = uRef.current
        if (showUDemo) {
            let interval = setInterval(() => {
                if (el.style.opacity == '0.5') {
                    el.style.opacity = '1'
                } else {
                    el.style.opacity = '0.5'
                }
            }, 1000)

            return () => {
                clearInterval(interval)
                el.style.opacity = '1'
            }
        }

    }, [showUDemo])

    function confirmUpd(source) {
        let trimSource = source.slice(13)
        setShowUDemo(true)
        updateImg(trimSource, inputText)
        .then(res => {
            if (res.data.text) {
                setShowAlert(true)
                setAlertText('There might be a prompt error from your side')
                setShowUDemo(false)
            } else {
                setTimeout(() => {
                    console.log(res)
                    setShowUDemo(false)
                    setRenderImages(prev => !prev)
                }, 12000)
            }
        })
        setInputText('')
        setShowUpdateInput(prev => ({ ...prev, id: undefined }))
        setInputText('')
    }

    let renderImg = showImg?.map((el) => {

        let id = el._id
        let source = `imagesFolder/${el?.imageUrl}`
        let text = el.text

        return (
            <div
                className="border border-gray-300/30 hover:border-gray-300/70 rounded-lg p-1 text-gray-300 h-fit hover:shadow-inner-box-image transition-all duration-500">
                <div className="group relative">
                    <img onClick={() => setShowFloat(el)}
                        className="rounded-lg cursor-pointer" src={source} />
                        <a className="group-hover:z-50 -z-10 text-white bg-black/40 rounded-full pl-1 pr-1 backdrop-blur-md opacity-100 absolute right-2 bottom-3 group"
                        href={`image/download/${el?.imageUrl}`} download={true}> 
                            <button onClick={(e)=> {
                                e.stopPropagation()
                            }}><FaDownload /></button>
                        </a>
                </div>
                <div className="p-2 text-[12px] sm:text-[14px] lg:text-[16px]">
                    {text?.length > 0 && `${text?.substring(0, 30)}.....`}
                </div>
                <div className="flex w-full justify-around p-2 text-[12px] sm:text-[14px] lg:text-[16px] ">
                    {el.imageUrl.includes('latest') &&
                        <button className="border p-1 sm:p-2 xl:pl-3 xl:pr-3 rounded-lg text-gray-300 border-gray-300/30 hover:text-white hover:border-white shadow-inner-box transition-all duration-500"
                        disabled={showUDemo?true:false}
                            ref={uRef}
                            onClick={() => {
                                setShowUpdateInput(prev => ({ ...prev, id: id }))
                            }}>{showUDemo ? '...' : 'Update'}</button>
                    }
                    <button className="border p-1 sm:p-2 xl:pl-3 xl:pr-3 rounded-lg text-gray-300 border-gray-300/30 hover:text-white hover:border-white shadow-inner-box transition-all duration-500"
                    disabled={showUDemo?true:false}
                        onClick={() => {
                            let trimSource = source.slice(13)
                            console.log(trimSource)
                            deleteImg(trimSource, limitImg)
                                .then(res => {
                                    let data = res.data.message
                                    setShowImg(data)
                                }
                                )
                        }}>
                        Delete
                    </button>
                </div>

                {(el._id != undefined ?
                    showUpdateInput.id == el._id : undefined) &&
                    <div className="w-full p-1 text-[12px] sm:text-[14px] lg:text-[16px]">
                        <textarea className="w-full  scrollbar-thin resize-none p-2 text-md font-medium text-gray-600 tracking-tight outline-gray-700 bg-gray-200 rounded-xl"
                            type="text" value={inputText}
                            onChange={(e) => setInputText(e.target.value)}></textarea>
                        <div className="flex w-full justify-around p-2">
                            <button className="border p-1 sm:p-2 xl:pl-3 xl:pr-3 rounded-lg shadow-inner-box text-gray-300 border-gray-300 hover:text-white hover:border-white transition-all duration-500"
                                onClick={() => {
                                    let space = /^\s+$/
                                    let checkSpaces = space.test(inputText)
                                    if (!checkSpaces && inputText.length != 0) {
                                        confirmUpd(source)
                                    } else {
                                        setShowAlert(true)
                                        setAlertText('There is no text or just spaces inside input')
                                    }
                                }}>Confrim</button>
                            <button className="border p-1 sm:p-2 xl:pl-3 xl:pr-3 rounded-lg shadow-inner-box text-gray-300 border-gray-300 hover:text-white hover:border-white transition-all duration-500"
                                onClick={() => {
                                    setShowUpdateInput(prev => ({ ...prev, id: undefined }))
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
            {showImg?.length == 0 ?
                <div className='flex-1 w-11/12 min-h-44 bg-lightGray border border-slate-400 border-opacity-45 shadow-inner-box rounded-2xl flex justify-center items-center'>
                    <p className="text-gray-300 text-md lg:text-lg">No images, pls generate to see</p>
                </div>
                :
                <div className="flex-1 w-11/12  min-h-96 bg-lightGray border border-slate-400 border-opacity-45 shadow-inner-box rounded-2xl p-3 ">
                    <div className="flex-1 gap-2 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                        {renderImg}
                    </div>
                    <div className="w-full h-fit flex justify-center items-center mt-4 ">
                        <button className="border border-gray-300/30 p-1 sm:p-2 xl:pl-3 xl:pr-3 rounded-lg text-[16px] sm:text-[18px] lg:text-[20px] text-gray-300 group hover:text-white hover:border-white shadow-inner-box transition-all duration-500"
                            onClick={() => {
                                setLimitImg(prev => prev + 8)
                            }}
                        >more
                            <ToolTip text={'More Images'} more={true}/>
                        </button>
                    </div>
                </div>
            }
        </>
    )
}