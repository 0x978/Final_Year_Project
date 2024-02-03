import {FC, useState} from "react";
import Header from "@/components/header";
import {useRouter} from "next/router";

const InstallationGuide: FC = ({}) => {
    const router = useRouter()

    return (
        <main className="min-h-screen bg-black flex flex-col justify-between">
            <Header active={"get started"}/>
            <div className="flex flex-col items-center text-center text-gray-300 flex-grow mt-14">
                <h1 className={"text-5xl mb-8 font-bold"}>Video Tutorial</h1>

                <h1 className={"text-2xl"}>
                    Before starting the YouTube video, please download the Google Chrome Extension file.
                </h1>

                <h1 className={"text-2xl mt-3 mb-6 font-semibold"}>
                    Please make sure you note where you save the file, as you will need it when following the video!
                </h1>

                <button className="bg-offWhite hover:bg-offWhiteHover hover:-translate-y-1 active:translate-y-1
                           text-black font-bold py-3 px-6 rounded mx-3 w-44 mb-16"
                        onClick={() => router.push("https://github.com/0x978/Final_Year_Project/releases/download/1.0/PolicyPal.zip")}>
                    Install
                </button>

                <iframe width="800" height="400" src="https://www.youtube.com/embed/Uo0384RAaU0?si=tsVtC18PkweewWJa"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen></iframe>

            </div>
        </main>
    )
}

export default InstallationGuide