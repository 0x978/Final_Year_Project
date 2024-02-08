import {FC} from "react"
import {useRouter} from "next/router";
import Image from "next/image";
import usageOne from "@/images/usageOne.png";


const UsageStepTwo: FC = ({}) => {
    const router = useRouter()

    return (
        <div className="text-center">
            <h1 className={"text-4xl font-bold mb-4"}>Step Two:</h1>
            <h2 className={"text-xl mb-8"}>Navigate to any terms and conditions or privacy policy of your choice.</h2>

            <div className={"flex justify-center align-middle"}>
                <div className={"h-1/2 w-1/2"}>
                    <Image
                        src={usageOne}
                        alt="Instructional image for navigating to a site of your choice."
                    />
                </div>
            </div>
        </div>
    )
}

export default UsageStepTwo