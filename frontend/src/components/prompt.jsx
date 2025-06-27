export default function PromptInstruction({showPInst}){
    return (
        <>
        <div className={`font-thin p-2 leading-4 flex flex-col text-left gap-2 overflow-hidden transition-all duration-500 ease-in text-gray-400 ${showPInst ? 'max-h-[700px] opacity-100' : 'max-h-[0px] opacity-0 overflow-clip'} `}
                    >
                        <h1 className="text-md text-gray-300 hover:text-white pb-3">
                            Best way to write prompt here, try to follow each step:
                        </h1>
                        <p className="text-sm italic capitalize">Directly describe your image and leave everything else to to us.</p>
                        <p className="text-sm italic capitalize">If want to customize the image instead of writing in the prompt choose between our given options from <u className="decoration-gray-300">moods,style</u> and <u className="decoration-gray-300">camera angle</u> and
                            if you can't get what you want from options than go ahead with prompt.</p>
                        <p className="text-sm italic capitalize">Is this right way to prompt? yes since i used some <u className="decoration-gray-300">image generation prompt techiniques</u> to list this options to you, and so this will cater
                            most of you need's, i guess.</p>
                        <p className="text-sm italic capitalize">Remember updating image requires accurate prompt's of what to do and where to do, since you can change the <u className="decoration-gray-300">full image </u> if not carefull.</p>
                        <p className="text-sm italic capitalize">Good luck! with your image generation, also if you see a notification of some kind of error while <u className="decoration-gray-300">deleting,creating</u>  or <u className="decoration-gray-300">updating</u> images
                           and if your prompts are correct than try to wait for 30 seconds then re-try.
                        </p>
                    </div>
        </>
    )
}