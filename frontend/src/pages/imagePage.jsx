import { useState, useEffect, useRef } from 'react'
import useStore from "../store.jsx"
import ImageContainer from "../components/imageContainer.jsx"
import ImageInput from '../components/imageInput.jsx'
import FloatImg from '../components/FloatImg.jsx'

export default function ImagePage() {

    let { getAllImg } = useStore()
    let [promptData, setPromptData] = useState('');
    let [showImg, setShowImg] = useState([]);
    let [renderImages, setRenderImages] = useState(false)
    let [showFloat, setShowFloat] = useState('')
    let mainImageDiv = useRef()
    let [showDemo, setShowDemo] = useState(false)
    let [limitImg,setLimitImg] = useState(8)

    useEffect(() => {
        getAllImg(limitImg)
            .then(res => {
                let data = res.data.message
                setShowImg(data)
            })
    }, [renderImages,limitImg])

    useEffect(() => {
        document.body.style.overflowX = 'hidden'
        if (showFloat != '') {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflowY = 'scroll';
        }
    }, [showFloat])
            
    return (
        <>
            <div className='relative overflow-x-hidden'>
                {showFloat != '' &&
                    <FloatImg showFloat={showFloat} setShowFloat={setShowFloat} />
                }
            </div>
            <div ref={mainImageDiv} className='min-h-screen min-w-screen bg-black z-40 opacity-100'>
                <div className='min-h-screen min-w-screen flex flex-col gap-10 justify-center items-center pt-10 pb-10 bg-darkGray'>
                    <ImageInput limitImg={limitImg} promptData={promptData} setPromptData={setPromptData} setShowImg={setShowImg} setShowDemo={setShowDemo} showDemo={showDemo} />
                   <ImageContainer limitImg={limitImg} setLimitImg={setLimitImg} showImg={showImg} setRenderImages={setRenderImages} setShowImg={setShowImg} showFloat={showFloat} setShowFloat={setShowFloat} />
                </div>
            </div>
        </>
    )
} 