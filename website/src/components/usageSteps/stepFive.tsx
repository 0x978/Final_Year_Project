import {FC} from "react"
import {useRouter} from "next/router";
import Image from "next/image";
import usageFive from "@/images/usageFive.png";


const UsageStepFive: FC = ({}) => {
    const router = useRouter()

    return (
        <div className="text-center">
            <h1 className={"text-4xl font-bold mb-4"}>Step Five:</h1>
            <h2 className={"text-xl mb-2"}>Wait for the summarisation process to finish</h2>

            <div className={"flex justify-center align-middle"}>
                <div className={"h-1/2 w-1/2"}>
                    <Image
                        src={usageFive}
                        alt="Instructional image for extension loading screen"
                    />
                </div>
            </div>
        </div>
    )
}

export default UsageStepFive