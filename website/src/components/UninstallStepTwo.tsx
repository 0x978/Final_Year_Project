import {FC} from "react"
import {useRouter} from "next/router";
import Image from "next/image";
import stepThreeImg from "@/images/stepThreeImg.png";

const UninstallStepTwo: FC = ({}) => {
    const router = useRouter()

    return (
        <div className="text-center">
            <h1 className={"text-4xl font-bold mb-4"}>Step Two:</h1>
            <h2 className={"text-xl mb-1"}>Navigate to the extension page</h2>

            <div className={"flex justify-center align-middle"}>
                <div className={"h-1/2 w-1/2"}>
                    <Image
                        src={stepThreeImg}
                        alt="Instructional image for navigating to the extension page"
                    />
                </div>
            </div>
        </div>
    )
}

export default UninstallStepTwo