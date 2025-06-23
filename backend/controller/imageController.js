import fs from "fs"
import { GoogleGenAI, Modality } from "@google/genai";
import imageSchema from "../models/imageModel.js"


const ai = new GoogleGenAI({ apiKey: "AIzaSyB2aSTV-lFPdnZ2L7jSP3Jj-90iCkRn9_k" });

export async function getImg(req, res) {
    let prompt = req.body.prom
    let promptCus = req.body.promptCus
    let newPrompt = "";

    for (let key in promptCus) {
        if (promptCus[key] != 'none') {
            if (key == 'mood') {
                console.log('hello')
                newPrompt = ` ${promptCus[key]} mood, ` + newPrompt.substring(0);
                console.log(newPrompt)
            } else if (key == 'style') {
                newPrompt = ` ${promptCus[key]} style, ` + newPrompt.substring(0);
            } else if (key == 'camera') {
                newPrompt = ` ${promptCus[key]} camera angle, ` + newPrompt.substring(0);
            }
        }
    }

    if (newPrompt.length == 0) {

        newPrompt = `generate an image of ${prompt}`

    } else {
        newPrompt = `generate an image of ${prompt} using following customization` + newPrompt.substring(0)
    }

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-preview-image-generation",
            contents: newPrompt,
            config: {
                responseModalities: [Modality.TEXT, Modality.IMAGE],
            },
        });

        let text = response.candidates[0].content.parts[0].text

        if (response.candidates[0].content.parts[1]?.inlineData?.data === undefined) {
            return res.status(201).json({ message: { text: text } })
        } else if (response.candidates[0].content.parts[0].text.length === 0) {
            return res.status(201).json({ message: { text: 'ther is not any text here' } })
        }

        let imageBase64 = response.candidates[0].content.parts[1].inlineData.data

        let imageBuffer = Buffer.from(imageBase64, 'base64')

        let folderPath = 'backend/imageFolder/'

        fs.readdir(folderPath,(err,files)=> {
            console.log(files.includes('img'))
        })

        let fileName = `backend/imageFolder/img-${Date.now()}.png`;

        fs.writeFileSync(fileName, imageBuffer)

        fileName = fileName.slice(20)

        let data = new imageSchema({
            username: req.user.username,
            imageUrl: fileName,
            text: text
        })

        let imageData = await data.save()

        res.status(201).json({ message: { fileName: fileName, text: text } })

    } catch (err) {
        res.status(500).json({ message: err })
        console.log(err)
    }
}


export async function getAllImg(req, res) {
    try {
        let data = await imageSchema.find({ username: req.user.username })
        res.status(200).json({ message: data })
    } catch (err) {
        res.status(500).json({ message: err })
    }
}

let v = 0;

export async function updateImg(req, res) {

    let img = req.body.img
    let text = req.body.text
    
    try {
        let setImgUrl = `backend/imageFolder/${img}`
        let imgBinaryData = fs.readFileSync(setImgUrl)
        let base64Data = imgBinaryData.toString('base64')
        let contents = [
            {
                text: text
            },
            {
                inlineData: {
                    mimeType: "image/png",
                    data: base64Data
                }
            }
        ]

        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash-preview-image-generation",
            contents: contents,
            config: {
                responseModalities: [Modality.TEXT, Modality.IMAGE],
            },
        });
        
        if (response.candidates[0].content.parts[0]?.text != undefined) {

            let text = response.candidates[0].content.parts[0].text

            if (response.candidates[0].content.parts[1]?.inlineData?.data != undefined) {

                let image = response.candidates[0].content.parts[1].inlineData.data
                let imageBuffer = Buffer.from(image, 'base64')

                fs.writeFileSync(setImgUrl, imageBuffer)

                v++;

                let changeUrl = setImgUrl.substring(0, 37) + `.${v}` + setImgUrl.substring(37)

                fs.renameSync(setImgUrl, changeUrl)

                let newImg = changeUrl.substring(20)

                let updateData = await imageSchema.findOneAndUpdate({ imageUrl: img }, { text: text, imageUrl: newImg }, { new: true })

                res.status(201).json({ message: updateData })
            } else {
                res.status(201).json({ message: 'no image updated please try again with nice prompt' })
            }

        } else if (response.candidates[0].content.parts[0]?.inlineData?.data != undefined) {

            let image = response.candidates[0].content.parts[0].inlineData.data
            let imageBuffer = Buffer.from(image, 'base64')

            fs.writeFileSync(setImgUrl, imageBuffer)

            v++;

            let changeUrl = setImgUrl.substring(0, 37) + `.${v}.` + setImgUrl.substring(37)

            fs.renameSync(setImgUrl, changeUrl)

            let newImg =  changeUrl.substring(20)

            let updateData = await imageSchema.findOneAndUpdate({ imageUrl: img }, { imageUrl: newImg }, { new: true })

            res.status(201).json({ message: updateData })

        } else {
            res.status(201).json({ message: 'not any response please try again' })
        }

    } catch (err) {
        console.log(err,'errr')
        res.status(500).json({ message: err })
    }
}

export async function deleteImg(req, res) {

    let img = req.query.img
    let imgUrl = `backend/imageFolder/${img}`
    try {
        fs.unlink(imgUrl, (err) => {
            err
        })
        let data = await imageSchema.findOneAndDelete({ imageUrl: img }, { new: true })
        let findData = await imageSchema.find({ username: req.user.username })
        res.status(201).json({ message: findData })
    } catch (err) {
        res.status(500).json({ message: err })
    }
}