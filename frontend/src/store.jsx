import {create} from "zustand"
import api from "./axios.jsx"

let useStore = create((set,get)=> ({
    showAlertS : {lert : false,text : ''},
    setShowAlertT : ()=> {
        set((state)=> ({
            showAlertS : {...state.showAlertS,lert : true}
        }))
    },
    setShowAlertF : ()=> {
        set((state)=> ({
            showAlertS : {...state.showAlertS,lert : false}
        }))
    },
    setAlertText : (text)=> {
        set((state)=> ({
            showAlertS : {...state.showAlertS,text : text}
        }))
    },
    login : async(userName,passWord)=> {
        try{
            let data = await api.post('/auth/login',{
                username : userName,
                password : passWord
            })
            return data
        }catch(err){
            let setShowAlertT = get().setShowAlertT
            let setAlertText = get().setAlertText
            setShowAlertT();
            setAlertText('No user found or wait for 30 sec then re-try')
            console.log(err)
        }
    },
    signUp : async(userName,passWord)=> {
        try{
            let data = await api.post('/auth/signup',{
                username : userName,
                password : passWord
            })
            return data
        }catch(err){
            let setShowAlertT = get().setShowAlertT
            let setAlertText = get().setAlertText
            setShowAlertT();
            setAlertText('please wait for 30 sec')
            console.log(err)
        }
    },
    getImg : async(prom,promptCus)=> {
        try{
            let data = await api.post('/image/getimage',{
                prom : prom,
                promptCus : promptCus
            })
            if(data.data.message){
                return data.data.message
            }
        }catch(err){
            let setShowAlertT = get().setShowAlertT
            let setAlertText = get().setAlertText
            setShowAlertT();
            setAlertText('something unexpected occured if not login then login first or change your prompt')
            console.log(err)
        }
    },
    getAllImg : async(limit)=> {

        try{
            let data = await api.get(`/image/getallimage/${limit}`)
            return data
        }catch(err){
            let setShowAlertT = get().setShowAlertT
            let setAlertText = get().setAlertText
            setShowAlertT();
            setAlertText('login first to see your images')
            console.log(err)
        }
    },
    updateImg : async(img,text)=> {
        
        try{
            let data = await api.post('/image/update',{
                img : img, text: text
            })
            return data
        }catch(err){
            let setShowAlertT = get().setShowAlertT
            let setAlertText = get().setAlertText
            setShowAlertT();
            setAlertText('something unexpected occured if not login then login first or change your prompt')
            console.log(err)
        }
    },
    deleteImg : async(img,limit) => {
        try{
            let data = await api.delete(`/image/delete?img=${img}&limit=${limit}`)
            return data
        }catch(err){
            let setShowAlertT = get().setShowAlertT
            let setAlertText = get().setAlertText
            setShowAlertT();
            setAlertText('error in deleting image')
            console.log(err)
        }
    },
    logout : async() => {
        try{
            let data = await api.post('/auth/logout')
            return data 
        }catch(err){
            err
        }
    }
}))

export default useStore