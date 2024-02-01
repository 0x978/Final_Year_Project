import {FC} from "react"
import Header from "@/components/header";


interface AboutProps {

}

const About: FC<AboutProps> = ({}) => {
    return (
        <main className="min-h-screen bg-black flex flex-col justify-between">
            <Header active={"about"}/>
            <div className="flex flex-col justify-center items-center text-center text-gray-300 flex-grow">
                <h1>WIP</h1>
                </div>
        </main>
    )
}

export default About