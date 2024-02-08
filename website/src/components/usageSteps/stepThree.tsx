import {FC} from "react"
import {useRouter} from "next/router";
import Image from "next/image";
import usageTwo from "@/images/usageTwo.png";


const UsageStepTwo: FC = ({}) => {
    const router = useRouter()

    return (
        <div className="text-center">
            <h1 className={"text-4xl font-bold mb-4"}>Step Three:</h1>
            <h2 className={"text-xl mb-2"}>Press the extension button, which looks like a puzzle piece in the top
                right (1)</h2>
            <h2 className={"text-xl mb-2"}>Then press "policyPal" (2)</h2>
            <h2 className={"text-xl mb-8"}>Optionally, you may also pin the extension for easier access in the future
                    (3)</h2>

            <div className={"flex justify-center align-middle"}>
                <div className={"h-1/2 w-1/2"}>
                    <Image
                        src={usageTwo}
                        alt="Instructional image for opening the extension."
                    />
                </div>
            </div>
        </div>
    )
}

export default UsageStepTwo