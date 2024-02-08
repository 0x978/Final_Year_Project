import Image from "next/image";
import stepSixImg from "@/images/stepSixImg.png";

const StepSix = () => {

    return (
        <div className="text-center text-xl">
            <h1 className={"text-4xl font-bold mb-4"}>Step Six:</h1>
            <h2 className={"mb-1"}>Now, click the folder ("policyPal") you downloaded and extracted.</h2>
            <h2>Then, press "select folder"</h2>

            <div className={"flex justify-center align-middle"}>
                <div className={"h-1/2 w-1/2"}>
                    <Image
                        src={stepSixImg}
                        alt="Instructional image for installing the extension."
                    />
                </div>
            </div>
        </div>
    )
}

export default StepSix