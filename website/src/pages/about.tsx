import {FC} from "react"
import Header from "@/components/header";
import Image from "next/image";
import showCaseOne from "@/images/showCaseOne.png";
import showCaseTwo from "@/images/showCaseTwo.png";
import showCaseThree from "@/images/showCaseThree.png";

interface AboutProps {

}

const About: FC<AboutProps> = ({}) => {
    return (
        <main className="min-h-screen bg-black flex flex-col justify-between">
            <Header/>
            <div className="flex flex-col justify-center items-center text-center text-gray-300 flex-grow">
                <h1>WIP</h1>
            </div>
        </main>
    )
}

export default About