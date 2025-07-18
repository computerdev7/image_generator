import fs from "fs"
import { GoogleGenAI, Modality } from "@google/genai";
import imageSchema from "../models/imageModel.js"


const ai = new GoogleGenAI({ apiKey: process.env.API });

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

                let changeUrl = setImgUrl.substring(0, 43) + `.${v}` + setImgUrl.substring(43)

                fs.renameSync(setImgUrl, changeUrl)

                let newImg = changeUrl.substring(20)

                let updateData = await imageSchema.findOneAndUpdate({ imageUrl: img }, { text: text, imageUrl: newImg }, { new: true })

                res.status(201).json({ message: updateData })
            } else {
                res.status(201).json({ text: 'no image updated please try again with nice prompt' })
            }

        } else if (response.candidates[0].content.parts[0]?.inlineData?.data != undefined) {

            let image = response.candidates[0].content.parts[0].inlineData.data
            let imageBuffer = Buffer.from(image, 'base64')

            fs.writeFileSync(setImgUrl, imageBuffer)
           
            v++;

            let changeUrl = setImgUrl.substring(0, 43) + `.${v}.` + setImgUrl.substring(43)

            fs.renameSync(setImgUrl, changeUrl)

            let newImg =  changeUrl.substring(20)

            let updateData = await imageSchema.findOneAndUpdate({ imageUrl: img }, { imageUrl: newImg }, { new: true })

            res.status(201).json({ message: updateData })

        } else {
            res.status(201).json({ text: 'not any response please try again later' })
        }

    } catch (err) {
        console.log(err,'errrup')
        res.status(500).json({ message: err })
    }
}
