import { useState } from "react"
import { IoMdArrowDropup } from "react-icons/io";
import { LuEye,LuEyeClosed  } from "react-icons/lu";
import Alert from "./alert.jsx"
import useStore from "../store.jsx";
import { useEffect } from "react";
import ToolTip from "./toolTip.jsx";
import { Link } from "react-router";
import { useNavigate } from "react-router";

export default function LoginSignUpTemplate({ func, work }) {

    let navigate = useNavigate()
    let [userName, setUserName] = useState('')
    let [passWord, setPassWord] = useState('')
    let [showInstruct, setShowInstruct] = useState(false)
    let [viewPassword,setViewPassword] = useState('')
    let [showAlert, setShowAlert] = useState(false);
    let [showAlertText,setShowAlertText] = useState('')
    let {showAlertS} = useStore();

    useEffect(()=> {
        if(showAlertS.lert){
            setShowAlert(true)
            setShowAlertText(showAlertS.text)
        }
    },[showAlertS])
        
    return (
        <>
        <div className="relative"
        >
            {showAlert? <Alert text={showAlertText} setShowAlert={setShowAlert}/> : undefined }
        </div>
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-darkGray">
            <div className="w-10/12 min-h-2/4 min-[400px]:w-[300px] sm:w-[350px] xl:w-[400px] bg-lightGray flex flex-col justify-center 
            items-center gap-2 rounded-xl border border-slate-400 border-opacity-45 shadow-inner-box">
                <div className="flex gap-2 h-16 items-center">
                    <h1 className="text-2xl font-semibold text-gray-300 hover:text-white transition-all duration-500"
                    >{work}</h1>
                    <div className="h-fit w-fit group">
                    <button className={`text-gray-500 text-2xl active:text-gray-100 
                     transition-transform duration-500 transform ${showInstruct ? 'rotate-90' : 'rotate-0'}`}
                        onClick={() => {
                            setShowInstruct(prev => !prev)
                        }}
                    >
                        <IoMdArrowDropup />
                    </button>
                    <ToolTip text={'dropdown'} more={true} />
                    </div>
                </div>
                <div className={`w-full pl-5 flex flex-col gap-3 transition-all duration-1000 ease-in ${showInstruct ? 'max-h-48' : 'max-h-0 opacity-0 '}`}>
                    <div>
                        <h1 className="text-md text-gray-300 hover:text-white transition-all duration-500">Username</h1>
                        <p className="text-sm text-gray-400 ">Username length 6 to 20 charachter</p>
                        <p className="text-sm text-gray-400">Must have 1 special and 1 number </p>
                        <p className="text-sm text-gray-400">Must not have a space </p>
                    </div>
                    <div>
                        <h1 className="text-md text-gray-300 hover:text-white transition-all duration-500">Password</h1>
                        <p className="text-sm text-gray-400">Password length must be above 5 char</p>
                        <p className="text-sm text-gray-400">Must not have a space</p>
                    </div>
                </div>
                <div className="flex flex-col gap-6 w-full p-5 justify-center items-center z-10">
                    <div className="w-full">
                    <p className="text-sm text-gray-400 italic hover:text-white transition-all duration-500">username</p>
                    <input className="border border-darkGray w-full h-10 rounded-lg p-2 text-lg font-medium text-gray-600 tracking-tight outline-gray-700 bg-gray-200" 
                        placeholder="akash@1" autoFocus
                        disabled={false}
                        value={userName} onChange={(e) => setUserName(e.target.value)} type='text' />
                    </div>
                        <div className="relative w-full">
                    <p className="text-sm text-gray-400 italic hover:text-white transition-all duration-500">password</p>
                    <input className="border border-darkGray w-full h-10 rounded-lg p-2 text-lg font-medium text-gray-600 tracking-tight outline-gray-700 bg-gray-200"
                        value={passWord} onChange={(e) => setPassWord(e.target.value)} type={viewPassword?'text':'password'} />
                        <button className="absolute right-2 h-8 w-30 top-6 flex justify-center items-center z-10 text-gray-500"
                        onClick={()=> {
                            setViewPassword(prev=> !prev)
                        }}>
                           {viewPassword ? <LuEye /> : <LuEyeClosed />} 
                        </button>
                        </div>
                    {work == 'Login' && 
                    <span className="text-left w-full">
                        <Link to={'/signup'}><p className="text-md text-gray-300 hover:text-white transition-all duration-500 active:text-red-500">register, if not</p></Link>
                    </span>}
                    <button className="border h-10 w-20 rounded-lg text-gray-300 hover:border-white hover:text-white border-gray-400 shadow-inner-box transition-all duration-500"
                        onClick={() => {
                            let checkSpacesU = /^\s+$/.test(userName)
                            let checkSpacesP = /^\s+$/.test(passWord)
                            let checkSpaceU = /\s+/.test(userName)
                            let checkSpaceP = /\s+/.test(passWord)
                            let checkN = /\d/.test(userName)
                            let checkS = /[@#$%^&*!]/.test(userName)
                            if(userName.length < 6 || userName.length > 20 || passWord.length < 6){
                                setShowAlert(true)
                                setShowAlertText('The length of username or password is inappropriate *check dropdown')
                            } else if(checkSpacesU || checkSpacesP || checkSpaceU || checkSpaceP){
                                setShowAlert(true)
                                setShowAlertText('No spaces in usrname and password *check dropdown')
                            } else if(!checkN || !checkS){
                                setShowAlert(true)
                                setShowAlertText('No special or num charachter *check dropdown')
                            } else {
                                func(userName, passWord)
                                    .then(res => {
                                        if(res.status == '200'){
                                                navigate('/image')
                                        }
                                    })
                            }
                        }}>
                        {work}
                    </button>
                </div>
            </div>
        </div>
        </>
    )
}