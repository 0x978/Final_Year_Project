import {FC} from "react"
import {useRouter} from "next/router";

interface stepOneProps {

}

const StepOne: FC<stepOneProps> = ({}) => {
    const router = useRouter()

    return (
            <div className="text-center">
                <h1 className={"text-4xl font-bold mb-4"}>Step One:</h1>
                <h2 className={"text-xl mb-1"}>Download the Google Chrome Extension by pressing the button below</h2>
                <h2 className={"text-xl mb-8"}> <b> Make sure to note where you have installed it, </b> as we will need it in the next step</h2>
                <button className="bg-offWhite hover:bg-offWhiteHover hover:-translate-y-1 active:translate-y-1
                           text-black font-bold py-3 px-6 rounded mx-3 w-44"
                        onClick={() => router.push("https://github.com/0x978/Final_Year_Project/releases/download/1.0/PolicyPal.zip")}>
                    Install
                </button>
            </div>
    )
}

export default StepOne