import {FC} from "react";
import {useRouter} from "next/router";
import Header from "@/components/header";
import Image from "next/image";
import showCaseOne from "@/images/showCaseOne.png"
import showCaseTwo from "@/images/showCaseTwo.png"
import showCaseThree from "@/images/showCaseThree.png"

interface IndexProps {
}

const Index: FC<IndexProps> = ({}) => {
    const router = useRouter()

    return (
        <main className="h-screen bg-black">
            <Header/>
            <div className="flex justify-center text-center text-gray-300">
                <div className="">

                    <h1 className="text-7xl mb-12 font-bold">
                        <span className="text-blue-300">Policy</span>
                        <span className="text-red-300">Pal</span>
                    </h1>

                    <h2 className="text-2xl mb-12 max-w-5xl mx-auto">
                        Powered by a <b>powerful</b> Natural Language Processing Model, summarise any terms and
                        conditions or privacy policy
                        <b> with just one click</b> and <b>without leaving the page</b>.
                    </h2>

                    <div className={"mb-12"}>
                        <button
                            className="bg-offWhite hover:bg-offWhiteHover hover:-translate-y-1 active:translate-y-1 text-black font-bold py-2 px-4 rounded mx-6"
                            onClick={() => router.push("/getStarted")}>
                            Get Started
                        </button>

                        <button
                            className="bg-goldenOrange hover:bg-goldenOrangeHover hover:-translate-y-1 active:translate-y-1 text-white font-bold py-2 px-4 rounded"
                            onClick={() => router.push("/getStarted")}>
                            About
                        </button>

                    </div>

                    <h1 className="text-xl w-full text-center mb-8">Receive a summary in just 3 easy steps:</h1>

                    <div className="flex flex-wrap justify-center items-start">

                        <div className="flex flex-col items-center w-full sm:w-1/3 p-4">
                            <h2 className="mb-4">Step 1: Press the "summarise" button</h2>
                            <Image src={showCaseOne} width={450} height={450}
                                   alt="A screenshot of the google Chrome Extension, with an orange summarise privacy policy button "/>
                        </div>

                        <div className="flex flex-col items-center w-full sm:w-1/3 p-4">
                            <h2 className="mb-4">Step 2: Wait for the summary to be produced</h2>
                            <Image src={showCaseTwo} width={450} height={450}
                                   alt="A loading screen for the summarisation process, 51 seconds remain in the screenshot"/>
                        </div>

                        <div className="flex flex-col items-center w-full sm:w-1/3 p-4">
                            <h2 className="mb-4">Step 3: Read the produced summary!</h2>
                            <Image src={showCaseThree} width={450} height={450}
                                   alt="A screenshot of a webpage with a produced summary and rating"/>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    );
};

export default Index;
