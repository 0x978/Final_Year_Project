import {FC} from "react"
import {useRouter} from "next/router";
import Image from "next/image";
import Uninstall1 from "@/images/Uninstall1.png";

interface stepOneProps {

}

const UninstallStepOne: FC<stepOneProps> = ({}) => {
    const router = useRouter()

    return (
        <div className="text-center">
            <h1 className={"text-4xl font-bold mb-4"}>Step One:</h1>
            <h2 className={"text-xl mb-1"}>Thanks for using PolicyPal!</h2>
            <h2 className={"text-xl mb-8"}>To uninstall, first open Google Chrome.</h2>

            <div className={"flex justify-center align-middle"}>
                <div className={"h-1/2 w-1/2"}>
                    <Image
                        src={Uninstall1}
                        alt="Instructional image for opening chrome"
                    />
                </div>
            </div>
        </div>
    )
}

export default UninstallStepOne