import {create} from "zustand"
import api from "./axios.jsx"

let useStore = create((set)=> ({
    login : async(userName,passWord)=> {
        try{
            let data = await api.post('/auth/login',{
                username : userName,
                password : passWord
            })
            return data
        }catch(err){
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
            console.log(err)
        }
    },
    getAllImg : async(limit)=> {

        try{
            let data = await api.get(`/image/getallimage/${limit}`)
            return data
        }catch(err){
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
            console.log(err)
        }
    },
    deleteImg : async(img,limit) => {

        try{
            let data = await api.delete(`/image/delete?img=${img}&limit=${limit}`)
            return data
        }catch(err){
            console.log(err)
        }
    }
    
}))

export default useStore