import {FC} from "react"
import {useRouter} from "next/router";
import Image from "next/image";
import Uninstall2 from "@/images/Uninstall2.png";

const UninstallStepThree: FC = ({}) => {
    const router = useRouter()

    return (
        <div className="text-center">
            <h1 className={"text-4xl font-bold mb-4"}>Step Three:</h1>
            <h2 className={"text-xl mb-1"}>Press "Remove" on the "PolicyPal" extension</h2>
            <h2 className={"text-xl mb-2"}>Then confirm the removal in the popup in the top right.</h2>
            <h2 className={"text-xl mb-8"}>PolicyPal is then removed from Chrome.</h2>


            <div className={"flex justify-center align-middle"}>
                <div className={"h-1/2 w-1/2"}>
                    <Image
                        src={Uninstall2}
                        alt="Instructional image for removing extension fromc hroem"
                    />
                </div>
            </div>
        </div>
    )
}

export default UninstallStepThree