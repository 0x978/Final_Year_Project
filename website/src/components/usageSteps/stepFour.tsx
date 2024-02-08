import {FC} from "react"
import {useRouter} from "next/router";
import Image from "next/image";
import usageThree from "@/images/usageThree.png";


const UsageStepThree: FC = ({}) => {
    const router = useRouter()

    return (
        <div className="text-center">
            <h1 className={"text-4xl font-bold mb-4"}>Step Four:</h1>
            <h2 className={"text-xl mb-2"}>Press the "summarise" button</h2>

            <div className={"flex justify-center align-middle"}>
                <div className={"h-1/2 w-1/2"}>
                    <Image
                        src={usageThree}
                        alt="Instructional image for starting summarisation."
                    />
                </div>
            </div>
        </div>
    )
}

export default UsageStepThree