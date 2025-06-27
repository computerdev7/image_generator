import useStore from "../store.jsx"
import { useState, useRef, useEffect } from "react"
import PromptCus from "./PromptCus.jsx";
import PromptInstruction from "./prompt.jsx";
import { IoMdArrowDropup } from "react-icons/io";
import ToolTip from "./toolTip.jsx";

export default function ImageInput({ limitImg, promptData, setPromptData, setShowImg, setShowDemo, showDemo, setShowAlert, setAlertText }) {

    let { getImg, getAllImg } = useStore()
    let [promptCus, setPromtCus] = useState({});
    let [showPInst, setShowPI] = useState(false);
    let textArea = useRef();
    let buttonRef = useRef();
    let el = buttonRef.current
    if (el) {
        el.style.disabled = 'true'
    }
    function imgSend() {

        setShowDemo(true)
        getImg(promptData, promptCus)
            .then(res => {
                if ((res.fileName == undefined && res.text == undefined) || (res.fileName == undefined && res.text != undefined)) {
                    setShowDemo(false)
                    setShowAlert(true)
                    setAlertText('There might be some input error from your side')
                }
                else if (res.fileName != undefined && res.text == undefined) {
                    setTimeout(() => {
                        getAllImg(limitImg)
                            .then(res => {
                                setShowDemo(false)
                                let data = res.data.message
                                setShowImg(data)
                            })
                    }, 12000)
                } else {
                    setTimeout(() => {
                        getAllImg(limitImg)
                            .then(res => {
                                setShowDemo(false)
                                let data = res.data.message
                                setShowImg(data)
                            })
                    }, 12000)
                }
            })
            setPromptData('')
    }

    function handleTextArea(e) {
        setPromptData(e.currentTarget.value)

        let el = textArea.current
        if (el) {
            el.style.height = 'auto';
            el.style.height = el.scrollHeight + "px";
        }
    }

    useEffect(() => {
        if (showDemo == true) {
            let interval = setInterval(() => {
                let el = buttonRef.current
                if (el) {
                    if (el.style.opacity == '0.5') {
                        el.style.opacity = '1'
                    } else {
                        el.style.opacity = '0.5'
                    }
                }

            }, 1000)
            return () => {
                let el = buttonRef.current
                el.style.opacity = '1';
                clearInterval(interval)
            }
        }
    }, [showDemo])

    return (
        <>
            <div className="w-11/12 min-h-96 sm:min-h-60 md:min-h-52 flex md:pt-10 flex-col rounded-2xl bg-lightGray border border-slate-400 border-opacity-45 p-5 pt-10 shadow-inner-box">
                <div className="w-full flex flex-col items-center gap-4 min-h-24 md:flex-row md:min-h-9 md:items-end lg:p-3 xl:p-6">
                    <textarea className='border border-darkGray w-full overflow-hidden resize-none p-2 rounded-lg text-md font-medium text-gray-600 tracking-tight outline-gray-700 bg-gray-200' autoFocus
                        placeholder="enter prompt here...." ref={textArea} rows={1} type='text' value={promptData} onChange={(e) => handleTextArea(e)}></textarea>
                    <button className='border border-gray-300 h-9 w-20 text-xl rounded-lg text-gray-300 hover:border-white hover:text-white transition-all duration-500 shadow-inner-box'
                        ref={buttonRef} disabled={showDemo ? true : false}
                        onClick={() => {
                            let space = /^\s+$/
                            let checkSpaces = space.test(promptData)
                            if (!checkSpaces && promptData.length != 0) {
                                imgSend()
                            } else {
                                setShowAlert(true)
                                setAlertText('Your input contains just space or no text')
                            }
                        }}>{showDemo ? '...' : 'send'}</button>
                </div>
                <div className="flex flex-col p-5 gap-6 xl:gap-14 justify-center items-center w-full sm:flex-row min-h-20 ">
                    <PromptCus promptCus={promptCus} setPromtCus={setPromtCus} />
                </div>
                <div className="w-full flex justify-center items-center group">
                    <p className="text-gray-300 italic text-sm hover:text-white">Prompt Guidance</p>
                    <button
                        className={`text-gray-500 text-2xl active:text-gray-100 transition-transform duration-500 transform ${showPInst ? 'rotate-90' : 'rotate-0'}`}
                        onClick={() => {
                            setShowPI((prev) => !prev)
                        }}
                    >
                        <IoMdArrowDropup />
                    </button>
                </div>
                     <PromptInstruction showPInst={showPInst} />
            </div>
        </>
    )
}