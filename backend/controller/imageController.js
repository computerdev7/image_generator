import fs from "fs"
import { GoogleGenAI, Modality } from "@google/genai";
import imageSchema from "../models/imageModel.js"
import path from "path";

const ai = new GoogleGenAI({ apiKey: "AIzaSyB2aSTV-lFPdnZ2L7jSP3Jj-90iCkRn9_k" });

let __dirname = path.resolve()
console.log(__dirname)

export async function downloadImg(req,res) {
    let img = req.params.img
    res.download(path.join(__dirname,"backend","imageFolder",img));
}

export async function getAllImg(req, res) {
    let limit = req.params.limit
    try {
        let data = await imageSchema.find({ username: req.user.username }).sort({createdAt : -1}).limit(limit)
        res.status(200).json({ message: data })
    } catch (err) {
        res.status(500).json({ message: err })
    }
}


export async function deleteImg(req, res) {

    let img = req.query.img
    let limit = req.query.limit
    let imgUrl = `backend/imageFolder/${img}`
    try {
        fs.unlink(imgUrl, (err) => {
            err
        })
        let data = await imageSchema.findOneAndDelete({ imageUrl: img }, { new: true })
        let findData = await imageSchema.find({ username: req.user.username }).sort({createdAt : -1}).limit(limit)
        res.status(201).json({ message: findData })
    } catch (err) {
        res.status(500).json({ message: err })
    }
}