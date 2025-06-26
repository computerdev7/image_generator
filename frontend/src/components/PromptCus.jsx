import { useState } from "react"

export default function PromptCus({ promptCus, setPromtCus }) {

    let [showDropDown, setShowDropDown] = useState({
        moodD: false,
        styleD: false,
        cameraD: false
    })

    const moods = ["none", "Happy", "Sad", "Romantic", "Peaceful", "Dramatic", "Mysterious", "Creepy", "Cinematic", "Epic", "Fantasy", "Futuristic", "Dark", "Melancholic", "Hopeful", "Energetic", "Cozy"];

    const styles = ["none", "Realistic", "Photorealistic", "Cartoon", "Anime", "Pixel Art", "Low Poly", "3D Render", "Sketch / Pencil", "Watercolor", "Oil Painting", "Digital Painting", "Cyberpunk", "Steampunk", "Noir", "Vaporwave", "Surreal", "Minimalist", "Vintage / Retro", "Fantasy", "Sci-fi"];

    const cameraAngles = ["none",
        "Eye-Level", "High Angle", "Low Angle", "Birds Eye View", "Worms Eye View", "Close-Up", "Medium Shot", "Full Body Shot", "Wide Shot (Long Shot)", "Over-the-Shoulder", "POV (Point of View)", "Two-Shot", "Tracking/Follow Shot", "Frontal View", "Profile View", "Rear View", "Aerial Drone Shot",
        "360-Degree Shot"];

    let renderMoods = moods.map((el) => {
        return (
            <>
                <div className="w-full bg-lightGray text-gray-300 border-b border-gray-300 p-2 hover:border-white hover:text-white cursor-pointer"
                    onClick={() => {
                        setPromtCus(prev => ({ ...prev, mood: el }))
                        setShowDropDown(prev => ({ ...prev, moodD: !prev.moodD }))
                    }}>
                    {el}</div>
            </>
        )
    })

    let renderStyle = styles.map((el) => {
        return (
            <>
                <div className="w-full bg-lightGray text-gray-300 border-b border-gray-300 p-2 hover:border-white hover:text-white cursor-pointer"
                    onClick={() => {
                        setPromtCus(prev => ({ ...prev, style: el }))
                        setShowDropDown(prev => ({ ...prev, styleD: !prev.styleD }))
                    }}>
                    {el}</div>
            </>
        )
    })

    let renderCameraAngle = cameraAngles.map((el) => {
        return (
            <>
                <div className="w-full bg-lightGray text-gray-300 border-b border-gray-300 p-2 hover:border-white hover:text-white cursor-pointer"
                    onClick={() => {
                        setPromtCus(prev => ({ ...prev, camera: el }))
                        setShowDropDown(prev => ({ ...prev, cameraD: !prev.cameraD }))
                    }}>
                    {el}</div>
            </>
        )
    })


    return (
        <>
            <div className="w-[200px] lg:w-[250px] relative">
                <p className="text-gray-300 hover:text-white italic text-sm">mood</p>
                <button className="rounded-sm text-gray-300 w-full h-8 border border-gray-300 hover:border-white hover:text-white flex items-center"
                    onClick={() => setShowDropDown(prev => ({ ...prev, moodD: !prev.moodD, styleD: false, cameraD: false }))}>
                    <p className="flex-[0.8]">{promptCus.mood ? promptCus.mood : 'none'}</p> <p className="flex-[0.2]">&#9662;</p>
                </button>
                <div className="absolute w-full z-10 bg-slate-200 h-[300px] overflow-y-scroll scrollbar-thin scrollbar-track-lightGray scrollbar-thumb-darkGray"
                    style={{ height: showDropDown.moodD ? `285px` : '0px' }}>
                    {showDropDown.moodD ? renderMoods : undefined}
                </div>
            </div>
            <div className="w-[200px] lg:w-[250px] relative">
                <p className="text-gray-300 hover:text-white italic text-sm">style</p>
                <button className="rounded-sm text-gray-300 w-full h-8 border border-gray-300 hover:border-white hover:text-white flex items-center"
                    onClick={() => {
                        setShowDropDown(prev => ({ ...prev, styleD: !prev.styleD, moodD: false, cameraD: false }))
                    }}>
                    <p className="flex-[0.8]">{promptCus.style ? promptCus.style : 'none'}</p> <p className="flex-[0.2]">&#9662;</p>
                </button>
                <div className="absolute w-full z-10 bg-slate-200 h-[300px] overflow-y-scroll scrollbar-thin scrollbar-track-lightGray scrollbar-thumb-darkGray"
                    style={{ height: showDropDown.styleD ? `285px` : '0px' }}>
                    {showDropDown.styleD ? renderStyle : undefined}
                </div>
            </div>
            <div className="w-[200px] lg:w-[250px] relative">
                <p className="text-gray-300 hover:text-white italic text-sm">camera angle</p>
                <button className="rounded-sm text-gray-300 w-full h-8 border border-gray-300 hover:border-white hover:text-white flex items-center"
                    onClick={() => setShowDropDown(prev => ({ ...prev, cameraD: !prev.cameraD, styleD: false, moodD: false }))}>
                    <p className="flex-[0.8]">{promptCus.camera ? promptCus.camera : 'none'}</p> <p className="flex-[0.2]">&#9662;</p>
                </button>
                <div className="absolute w-full z-10 bg-slate-200 h-[300px] overflow-y-scroll scrollbar-thin scrollbar-track-lightGray scrollbar-thumb-darkGray"
                    style={{ height: showDropDown.cameraD ? `285px` : '0px' }}>
                    {showDropDown.cameraD ? renderCameraAngle : undefined}
                </div>
            </div>
        </>
    )
}