import useStore from "../store.jsx";
import { useEffect, useRef, useState } from "react";
import { FaDownload } from "react-icons/fa6";


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
        let trimSource = source.slice(35)
        setShowUDemo(true)
        updateImg(trimSource, inputText)
            .then(res => {
                if (res.data.text) {
                    setShowAlert(true)
                    setAlertText('there migght be a prompt error from your side')
                    setShowUDemo(false)
                } else {
                    setTimeout(() => {
                        setShowUDemo(false)
                        setRenderImages(prev => !prev)
                    }, 12000)
                }
            })
        setShowUpdateInput(prev => ({ ...prev, id: undefined }))
        setInputText('')
    }

    let renderImg = showImg.map((el) => {

        let id = el._id
        let source = `http://localhost:3000/imagesFolder/${el.imageUrl}`
        let text = el.text

        return (
            <div
                className="border border-gray-300 rounded-lg p-1 text-gray-300 h-fit">
                <div className="group relative">
                    <img onClick={() => setShowFloat(el)}
                        className="rounded-lg" src={source} />
                        <a className="group-hover:z-50 -z-10 group-hover:opacity-100 opacity-0 absolute right-2 bottom-3 "
                        href={`http://localhost:3000/image/download/${el.imageUrl}`} download={true}> 
                            <button onClick={(e)=> {
                                e.stopPropagation()
                            }}><FaDownload /></button>
                        </a>
                </div>
                <div className="p-2 text-[12px] sm:text-[14px] lg:text-[16px]">
                    {text.length > 0 && `${text.substring(0, 30)}.....`}
                </div>
                <div className="flex w-full justify-around p-2 text-[12px] sm:text-[14px] lg:text-[16px] ">
                    {el.imageUrl.includes('latest') &&
                        <button className="border p-1 sm:p-2 xl:pl-3 xl:pr-3 rounded-lg"
                        disabled={showUDemo?true:false}
                            ref={uRef}
                            onClick={() => {
                                setShowUpdateInput(prev => ({ ...prev, id: id }))
                            }}>{showUDemo ? '...' : 'Update'}</button>
                    }
                    <button className="border p-1 sm:p-2 xl:pl-3 xl:pr-3 rounded-lg"
                    disabled={showUDemo?true:false}
                        onClick={() => {
                            let trimSource = source.slice(35)
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
                        <textarea className="w-full text-black scrollbar-thin resize-none p-2"
                            type="text" value={inputText}
                            onChange={(e) => setInputText(e.target.value)}></textarea>
                        <div className="flex w-full justify-around p-2">
                            <button className="border p-1 sm:p-2 xl:pl-3 xl:pr-3 rounded-lg"
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
                            <button className="border p-1 sm:p-2 xl:pl-3 xl:pr-3 rounded-lg"
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
            {showImg.length == 0 ?
                <div className='flex-1 w-11/12  bg-lightGray border border-slate-400 border-opacity-45 shadow-inner-box rounded-2xl flex justify-center items-center'>
                    <p className="text-gray-300 text-md lg:text-lg">No images, pls generate to see</p>
                </div>
                :
                <div className="flex-1 w-11/12 bg-lightGray border border-slate-400 border-opacity-45 shadow-inner-box rounded-2xl p-3 ">
                    <div className="flex-1 gap-2 w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
                        {renderImg}
                    </div>
                    <div className="w-full h-10 flex justify-center items-center mt-4 ">
                        <button className="border p-1 sm:p-2 xl:pl-3 xl:pr-3 rounded-lg text-[16px] sm:text-[18px] lg:text-[20px] text-gray-300"
                            onClick={() => {
                                setLimitImg(prev => prev + 8)
                            }}
                        >more</button>
                    </div>
                </div>
            }
        </>
    )
}