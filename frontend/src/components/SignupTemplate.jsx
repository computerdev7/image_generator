import { useState } from "react"
import { IoMdArrowDropup } from "react-icons/io";
import { LuEye,LuEyeClosed  } from "react-icons/lu";

export default function LoginSignUpTemplate({ func, work }) {

    let [userName, setUserName] = useState('')
    let [passWord, setPassWord] = useState('')
    let [showInstruct, setShowInstruct] = useState(false)
    let [viewPassword,setViewPassword] = useState('')

        
    
    return (
        <div className="h-screen w-screen flex flex-col justify-center items-center bg-darkGray">
            <div className="w-10/12 min-h-2/4 min-[400px]:w-[300px] sm:w-[350px] xl:w-[400px] bg-lightGray flex flex-col justify-center 
            items-center gap-2 rounded-xl border border-slate-400 border-opacity-45 shadow-inner-box">
                <div className="flex gap-2 h-16 items-center">
                    <h1 className="text-2xl font-semibold text-gray-300 hover:text-white"
                    >{work}</h1>
                    <button className={`text-gray-500 text-2xl active:text-gray-100
                     transition-transform duration-500 transform ${showInstruct ? 'rotate-90' : 'rotate-0'}`}
                        onClick={() => {
                            setShowInstruct(prev => !prev)
                        }}
                    >
                        <IoMdArrowDropup />
                    </button>
                </div>

                <div className={`w-full pl-5 flex flex-col gap-3 transition-all duration-500 ease-out ${showInstruct ? 'max-h-48' : 'max-h-0 opacity-0 '}`}>
                    <div>
                        <h1 className="text-md text-gray-300 hover:text-white">Username</h1>
                        <p className="text-sm text-gray-400 ">Username length 6 to 20 charachter</p>
                        <p className="text-sm text-gray-400">Must have 1 special and 1 number </p>
                        <p className="text-sm text-gray-400">Must not have a space </p>
                    </div>
                    <div>
                        <h1 className="text-md text-gray-300 hover:text-white">Password</h1>
                        <p className="text-sm text-gray-400">Password length must be above 5 char</p>
                        <p className="text-sm text-gray-400">Must not have a space</p>
                    </div>
                </div>
                <div className="flex flex-col gap-6 w-full p-5 justify-center items-center z-10">
                    <div className="w-full">
                    <p className="text-sm text-gray-400 italic">username</p>
                    <input className="border border-black w-full h-10 rounded-lg p-2 text-lg" 
                        placeholder="akash@1" autoFocus
                        disabled={false}
                        value={userName} onChange={(e) => setUserName(e.target.value)} type='text' />
                    </div>
                        <div className="relative w-full">
                    <p className="text-sm text-gray-400 italic">password</p>
                    <input className="border border-black w-full h-10 rounded-lg p-2 text-lg"
                        value={passWord} onChange={(e) => setPassWord(e.target.value)} type={viewPassword?'text':'password'} />
                        <button className="absolute right-2 h-8 w-30 top-6 flex justify-center items-center z-10 text-gray-500"
                        onClick={()=> {
                            setViewPassword(prev=> !prev)
                        }}>
                           {viewPassword ? <LuEye /> : <LuEyeClosed />} 
                        </button>
                        </div>
                    <button className="border h-10 w-20 rounded-lg text-gray-300 hover:border-white hover:text-white border-gray-400 shadow-inner-box"
                        onClick={() => {
                            func(userName, passWord)
                                .then(res => console.log(res))
                        }}>
                        {work}
                    </button>
                </div>
            </div>
        </div>
    )
}