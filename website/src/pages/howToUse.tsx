import {FC, useState} from "react"
import Header from "@/components/header";
import UsageStepOne from "../components/usageSteps/stepOne"
import UsageStepTwo from "@/components/usageSteps/stepTwo";
import UsageStepThree from "@/components/usageSteps/stepThree";
import UsageStepFour from "@/components/usageSteps/stepFour";
import Note from "@/components/usageSteps/note";
import UsageStepFive from "@/components/usageSteps/stepFive";
import UsageStepSix from "@/components/usageSteps/stepSix";

const HowToUse: FC = ({}) => {
    const [step, setStep] = useState(1)

    return (
        <main className="min-h-screen bg-black flex flex-col justify-between">
            <Header active={"get started"}/>
            <div className="flex flex-col justify-center items-center text-center text-gray-300 flex-grow ">
                <div className={"text-center"}>
                    {step === 1 && <UsageStepOne/>}
                    {step === 2 && <UsageStepTwo/>}
                    {step === 3 && <UsageStepThree/>}
                    {step === 4 && <UsageStepFour/>}
                    {step === 5 && <Note/>}
                    {step === 6 && <UsageStepFive/>}
                    {step === 7 && <UsageStepSix/>}



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

export default HowToUse