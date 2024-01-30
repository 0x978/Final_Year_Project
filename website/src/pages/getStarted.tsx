import {FC, useState} from "react"

import StepOne from "../components/stepOne"
import StepTwo from "../components/stepTwo"
import StepThree from "../components/stepThree"
import StepFour from "../components/stepFour"

const GetStarted: FC= ({}) => {
    const [step, setStep] = useState(1)

    return (
        <main className="flex h-screen justify-center items-center bg-black text-gray-300">
            <div className={"text-center"}>
                {step === 1 && <StepOne/>}
                {step === 2 && <StepTwo/>}
                {step === 3 && <StepThree/>}
                {step === 4 && <StepFour/>}


                <div className={"mt-8"}>

                    {step > 1 &&
                        <button className="bg-goldenOrange hover:bg-goldenOrangeHover hover:-translate-y-1
                             active:translate-y-1 text-white font-bold py-2 px-4 rounded w-40 mx-2"
                                onClick={() => setStep(prevState => prevState - 1)}>
                            Previous Step
                        </button>}

                    <button className="bg-goldenOrange hover:bg-goldenOrangeHover hover:-translate-y-1
                 active:translate-y-1 text-white font-bold py-2 px-4 rounded w-40"
                            onClick={() => setStep(prevState => prevState + 1)}>
                        Next Step
                    </button>
                </div>

            </div>
        </main>
    )
}

export default GetStarted