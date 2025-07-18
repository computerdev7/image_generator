import fs from "fs"
import { GoogleGenAI, Modality } from "@google/genai";
import imageSchema from "../models/imageModel.js"

const ai = new GoogleGenAI({ apiKey: process.env.API });

export async function getImg(req, res) {
    let prompt = req.body.prom
    let promptCus = req.body.promptCus
    let newPrompt = "";

    for (let key in promptCus) {
        if (promptCus[key] != 'none') {
            if (key == 'mood') {
                newPrompt = ` ${promptCus[key]} mood, ` + newPrompt.substring(0);
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
            return res.status(201).json({ message: { text: 'something wrong with your prompt please check' } })
        }

        let imageBase64 = response.candidates[0].content.parts[1].inlineData.data

        let imageBuffer = Buffer.from(imageBase64, 'base64')

        let folderPath = 'backend/imageFolder/'

        fs.readdir(folderPath,async(err,files)=> {
            files.map(async (el)=> {
                let check = el.includes('latest')
                if(check){
                    let newUrlI = el.substring(7,28)
                    fs.renameSync(folderPath + el,folderPath + newUrlI)
                    let data = await imageSchema.findOneAndUpdate({imageUrl : el},{imageUrl : newUrlI})
                }
            })
        })

        let fileName = `backend/imageFolder/latest-img-${Date.now()}.png`;

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
        console.log(err,'error here ge')
        res.status(500).json({ message: err })
    }
}

