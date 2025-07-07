import { useState, useEffect, useRef } from 'react';
import useStore from "../store.jsx";
import ImageContainer from "../components/imageContainer.jsx";
import ImageInput from '../components/imageInput.jsx';
import FloatImg from '../components/FloatImg.jsx';
import Alert from '../components/alert.jsx';
import { CiLogin,CiLogout  } from "react-icons/ci";
import ToolTip from '../components/toolTip.jsx';
import { useNavigate } from 'react-router';

export default function ImagePage() {

    let navigate = useNavigate()
    let { getAllImg,showAlertS,logout } = useStore()
    let [promptData, setPromptData] = useState('');
    let [showImg, setShowImg] = useState([]);
    let [renderImages, setRenderImages] = useState(false)
    let [showFloat, setShowFloat] = useState('')
    let mainImageDiv = useRef()
    let [showDemo, setShowDemo] = useState(false)
    let [limitImg,setLimitImg] = useState(8)
    let [showAlert,setShowAlert] = useState(false)
    let [alertText,setAlertText] = useState('');

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

    useEffect(()=> {
        if(showAlertS.lert){
            setShowAlert(true)
            setAlertText(showAlertS.text)
        }
    },[showAlertS])

    return (
        <>
            <div className='absolute w-full left-0 flex p-2 sm:text-lg md:text-xl gap-3'>
                <button className='group text-gray-500 hover:text-white transition-all duration-500  active:text-red-500'
                onClick={()=> {
                    navigate('/signup')
                }}
                >
                <CiLogin className=''/>
                <ToolTip text={'new signup'} more={true}/>
                </button>
                <button className='group text-gray-500 hover:text-white transition-all duration-500  active:text-red-500'
                onClick={()=> {
                    logout()
                    .then(res=> {
                        if(res.status == '200'){
                            navigate('/')
                        }
                    })
                }}>
                <CiLogout/>
                <ToolTip text={'logout'} more={true} />
                </button>
            </div>
            <div className='relative '>
                {showFloat != '' &&
                    <FloatImg showFloat={showFloat} setShowFloat={setShowFloat} />
                }
            </div>
            <div ref={mainImageDiv} className='min-h-screen min-w-screen bg-black z-40 opacity-100'>
                {showAlert && <Alert text={alertText} setShowAlert={setShowAlert} />}
                <div className='min-h-screen min-w-screen flex flex-col gap-10 justify-center items-center pt-10 pb-10 bg-darkGray'>
                    <ImageInput setShowAlert={setShowAlert} setAlertText={setAlertText} limitImg={limitImg} promptData={promptData} setPromptData={setPromptData} setShowImg={setShowImg} setShowDemo={setShowDemo} showDemo={showDemo} />
                   <ImageContainer setShowAlert={setShowAlert} setAlertText={setAlertText} limitImg={limitImg} setLimitImg={setLimitImg} showImg={showImg} setRenderImages={setRenderImages} setShowImg={setShowImg} showFloat={showFloat} setShowFloat={setShowFloat} />
                </div>
            </div>
        </>
    )
} 