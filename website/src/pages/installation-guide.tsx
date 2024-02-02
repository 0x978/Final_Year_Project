import {FC, useState} from "react"

import StepOne from "../components/stepOne"
import StepTwo from "../components/stepTwo"
import StepThree from "../components/stepThree"
import StepFour from "../components/stepFour"
import StepFive from "../components/stepFive"
import StepSix from "../components/stepSix";
import StepSeven from "../components/stepSeven";

import Header from "@/components/header";

const InstallationGuide: FC = ({}) => {
    const [step, setStep] = useState(1)

    return (
        <main className="min-h-screen bg-black flex flex-col justify-between">
            <Header active={"get started"}/>
            <div className="flex flex-col justify-center items-center text-center text-gray-300 flex-grow ">
                <div className={"text-center"}>
                    {step === 1 && <StepOne/>}
                    {step === 2 && <StepTwo/>}
                    {step === 3 && <StepThree/>}
                    {step === 4 && <StepFour/>}
                    {step === 5 && <StepFive/>}
                    {step === 6 && <StepSix/>}
                    {step === 7 && <StepSeven/>}


                    <div className={"mt-8"}>

                        {step > 1 &&
                            <button className="bg-offWhite hover:bg-offWhiteHover hover:-translate-y-1 active:translate-y-1
                           text-black font-bold py-3 px-6 rounded mx-3 w-44"
                                    onClick={() => setStep(prevState => prevState - 1)}>
                                Previous Step
                            </button>}

                        {step < 7 &&
                            <button className="bg-buttonGray hover:bg-buttonDarkBorder hover:-translate-y-1 active:translate-y-1
                            text-white font-bold py-3 px-6 rounded border-buttonDarkBorder border w-44"
                                    onClick={() => setStep(prevState => prevState + 1)}>
                                Next Step
                            </button>
                        }


                    </div>

                </div>
            </div>
        </main>
    )
}

export default InstallationGuide