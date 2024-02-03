import {FC} from "react";
import Header from "@/components/header";
import {useRouter} from "next/router";


interface GetStartedProps {
}

const GetStarted: FC<GetStartedProps> = () => {
    let router = useRouter()
    return (
        <main className="min-h-screen bg-black flex flex-col justify-between">
            <Header active={"get started"}/>
            <div className="flex flex-col justify-center items-center text-center text-gray-300 flex-grow ">

                <div className="">
                    <h1 className="text-5xl mb-8 font-bold">Get Started</h1>
                    <p className="text-lg mb-2">Install the Google Chrome extension to start using PolicyPal.</p>
                    <p className="text-lg mb-8">The installation process is <b> simple</b> and will take just a <b>couple minutes</b></p>

                    <div
                        className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
                        <button onClick={() => router.push("/youtube-steps")}
                                className="bg-offWhite hover:bg-offWhiteHover hover:-translate-y-1 active:translate-y-1
                           text-black font-bold py-3 px-6 rounded w-full md:w-auto">
                            Watch Installation Video
                        </button>
                        <button onClick={() => router.push("/installation-guide")}
                                className="bg-buttonGray hover:bg-buttonDarkBorder hover:-translate-y-1 active:translate-y-1
                            text-white font-bold py-3 px-6 rounded w-full md:w-auto border-buttonDarkBorder border">
                            View Installation Guide
                        </button>
                    </div>
                </div>

            </div>
        </main>
    );
};


export default GetStarted;

