import {FC} from "react"
import {useRouter} from "next/router";
import Image from "next/image";
import usageSix from "@/images/usageSix.png";


const UsageStepSix: FC = ({}) => {
    const router = useRouter()

    return (
        <div className="text-center">
            <h1 className={"text-4xl font-bold mb-4"}>Step Six:</h1>
            <h2 className={"text-xl mb-2"}>Read the produced summary!</h2>

            <div className={"flex justify-center align-middle"}>
                <div className={"h-1/2 w-1/2"}>
                    <Image
                        src={usageSix}
                        alt="Image showing a summary produced by the extension"
                    />
                </div>
            </div>
        </div>
    )
}

export default UsageStepSix