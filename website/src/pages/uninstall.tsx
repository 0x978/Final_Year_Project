import {FC, useState} from "react";
import Header from "@/components/header";
import UninstallStepOne from "@/components/UninstallStepOne";
import UninstallStepTwo from "@/components/UninstallStepTwo";
import UninstallStepThree from "@/components/UninstallStepThree";
import UninstallStepFour from "@/components/UninstallStepFour";


const Uninstall: FC = ({}) => {
    const [step, setStep] = useState(1)

    return (
        <main className="min-h-screen bg-black flex flex-col justify-between">
            <Header active={"get started"}/>
            <div className="flex flex-col justify-center items-center text-center text-gray-300 flex-grow ">
                <div className={"text-center"}>
                    {step == 1 && <UninstallStepOne/>}
                    {step == 2 && <UninstallStepTwo/>}
                    {step == 3 && <UninstallStepThree/>}
                    {step == 4 && <UninstallStepFour/>}


                    <div className={"mt-8"}>

                        {step > 1 &&
                            <button className="bg-offWhite hover:bg-offWhiteHover hover:-translate-y-1 active:translate-y-1
                           text-black font-bold py-3 px-6 rounded mx-3 w-44"
                                    onClick={() => setStep(prevState => prevState - 1)}>
                                Previous Step
                            </button>}

                        {step < 4 &&
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

export default Uninstall