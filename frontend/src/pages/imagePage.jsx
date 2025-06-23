import { useState, useEffect, useRef } from 'react'
import useStore from "../store.jsx"
import ImageContainer from "../components/imageContainer.jsx"
import ImageInput from '../components/imageInput.jsx'
import FloatImg from '../../floatImg.jsx'

export default function ImagePage() {

    let { getAllImg } = useStore()
    let [promptData, setPromptData] = useState('');
    let [showImg, setShowImg] = useState([]);
    let [renderImages, setRenderImages] = useState(false)
    let [showFloat, setShowFloat] = useState('')
    let mainImageDiv = useRef()

    useEffect(() => {
        getAllImg()
            .then(res => {
                setShowImg(res.data.message)
            })
    }, [renderImages])

    console.log(showFloat)

    useEffect(() => {
        if (showFloat != '') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'scroll';
        }
    }, [showFloat])

    return (
        <>
            <div className='relative'>
                {showFloat != '' &&
                    <div className="fixed h-fit w-4/5 min-[500px]:w-3/5 sm:w-3/6 lg:w-2/5 top-1/2 bottom-1/2 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-100/30 z-30 p-2 flex flex-col 
                    justify-center items-center gap-1 backdrop-blur-xl backdrop-filter shadow-2xl text-white">
                        <div className='p-1 border border-gray-300/30'>
                            <img className='min-[450px]:max-h-96'
                            src={`http://localhost:3000/imagesFolder/${showFloat.imageUrl}`} />
                        </div>
                        <div className='p-1 border border-gray-300/30 bg-gray-400/40 max-h-[150px] overflow-y-scroll scrollbar-track-black
                         scrollbar-thin '>
                            <p>{showFloat.text}</p>
                        </div>
                        <button className='h-10 w-36 border border-gray-300/30'
                            onClick={() => {
                                setShowFloat('')
                            }}
                        >Cancel</button>
                    </div>
                }
            </div>
            <div ref={mainImageDiv} className='min-h-screen min-w-screen bg-black z-40 opacity-100'>
                <div className='min-h-screen min-w-screen flex flex-col gap-10 justify-center items-center pt-10 pb-10 bg-darkGray'>
                    <ImageInput promptData={promptData} setPromptData={setPromptData} setShowImg={setShowImg} />
                    <ImageContainer showImg={showImg} setRenderImages={setRenderImages} setShowImg={setShowImg} showFloat={showFloat} setShowFloat={setShowFloat} />
                </div>
            </div>
        </>
    )
} 