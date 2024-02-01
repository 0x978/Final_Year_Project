import {FC, useEffect, useState} from "react";
import {useRouter} from "next/router";
import Header from "@/components/header";
import Image from "next/image";
import showCaseOne from "@/images/showCaseOne.png"
import showCaseTwo from "@/images/showCaseTwo.png"
import showCaseThree from "@/images/showCaseThree.png"

interface IndexProps {
}

const Index: FC<IndexProps> = ({}) => {
    const router = useRouter();
    const [showImages, setShowImages] = useState<boolean>()

    useEffect(() => {
        setShowImages(true);
    }, []);

    return (
        <main className="min-h-screen bg-black flex flex-col justify-between">
            <Header active={"home"} />
            <div className="flex flex-col justify-center items-center text-center text-gray-300 flex-grow ">
                <div>
                    <h1 className="text-7xl mb-12 font-bold">
                        <span className="text-blue-300">Policy</span>
                        <span className="text-red-300">Pal</span>
                    </h1>
                    <h2 className="text-xl mb-12 max-w-5xl mx-auto">
                        Utilise a <b>powerful</b> natural language processing model to summarise
                        any terms and conditions or privacy policy <b>with just one click</b>
                    </h2>
                    <div className="mb-12">
                        <button
                            className="bg-offWhite hover:bg-offWhiteHover hover:-translate-y-1 active:translate-y-1
                            text-black font-bold py-2 px-4 rounded mx-6 w-36 transition ease-in-out delay-150"
                            onClick={() => router.push("/getStarted")}
                        >
                            Get Started
                        </button>
                        <button
                            className="bg-buttonGray hover:bg-buttonDarkBorder hover:-translate-y-1 active:translate-y-1
                            text-white font-bold py-2 px-4 rounded w-36 border-buttonDarkBorder border transition
                             ease-in-out delay-150"
                            onClick={() => router.push("/about")}
                        >
                            About
                        </button>
                    </div>

                    <h1 className={`text-2xl w-full text-center mb-8 transition-opacity duration-[1000ms]
                     ${showImages ? 'opacity-100' : 'opacity-0'}`}>
                        <b>Use the extension</b> to receive a summary in just 3 easy steps:
                    </h1>

                    <div className="flex flex-wrap justify-center items-start">
                        <div className={`flex flex-col items-center w-full sm:w-1/3 p-4 transition-opacity duration-[2000ms]
                         ${showImages ? 'opacity-100' : 'opacity-0'}`} >
                            <h2 className="mb-4 text-xl"><b>Step 1:</b> Press the <b>"summarize"</b> button</h2>
                            <Image src={showCaseOne}  width={450} alt="A screenshot of the Google Chrome Extension, with an orange summarize privacy policy button"
                                   className={"h-72 hover:scale-110 transition-transform"}
                            />
                        </div>

                        <div className={`flex flex-col items-center w-full sm:w-1/3 p-4 transition-opacity duration-[4000ms] 
                        ${showImages ? 'opacity-100' : 'opacity-0'}`}>
                            <h2 className="mb-4 text-xl"><b>Step 2:</b> Wait for summarisation</h2>
                            <Image src={showCaseTwo} width={450} alt="A loading screen for the summarization process, 51 seconds remain in the screenshot"
                                   className={"h-72 hover:scale-110 transition-transform"}
                            />
                        </div>

                        <div className={`flex flex-col items-center w-full sm:w-1/3 p-4 transition-opacity duration-[6000ms] 
                        ${showImages ? 'opacity-100' : 'opacity-0'}`}>
                            <h2 className="mb-4 text-xl"><b>Step 3:</b> Read the produced summary!</h2>
                            <Image src={showCaseThree} width={450} alt="A screenshot of a webpage with a produced summary and rating"
                                   className={"h-72 hover:scale-150 transition-transform"}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};


export default Index;
