import {FC} from "react"
import {useRouter} from "next/router";

interface stepOneProps {

}

const StepOne: FC<stepOneProps> = ({}) => {
    const router = useRouter()

    return (
            <div className="text-center">
                <h1 className={"text-4xl font-bold mb-4"}>Step One:</h1>
                <h2 className={"text-lg mb-1"}>Download the Google Chrome Extension by pressing the button below</h2>
                <h2 className={"text-lg mb-8"}>Make sure to note where you have installed it, as we will need it in the next step</h2>
                <button className="bg-goldenOrange hover:bg-goldenOrangeHover hover:-translate-y-1
                 active:translate-y-1 text-white font-bold py-2 px-4 rounded"
                        onClick={() => router.push("https://github.com/0x978/Final_Year_Project/releases/download/beta/ReleaseBeta.zip")}>
                    Install
                </button>
            </div>
    )
}

export default StepOne