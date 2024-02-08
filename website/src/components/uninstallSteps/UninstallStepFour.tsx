import {FC} from "react"
import {useRouter} from "next/router";
import Image from "next/image";
import Uninstall3 from "@/images/Uninstall3.png";

const UninstallStepFour: FC = ({}) => {
    const router = useRouter()

    return (
        <div className="text-center">
            <h1 className={"text-4xl font-bold mb-4"}>Step Four:</h1>
            <h2 className={"text-xl mb-21"}>To remove PolicyPal files from your computer, navigate to
                where you installed them</h2>
            <h2 className={"text-xl mb-2"}>Then, select both PolicyPal files, right-click them and press "delete"</h2>
            <h2 className={"text-xl mb-5"}>Press "Yes" to the subsequent confirmation popup</h2>


            <div className={"flex justify-center align-middle -mb-5"}>
                <div className={"h-3/4 w-3/4"}>
                    <Image
                        src={Uninstall3}
                        alt="Instructional image for deleting PolicyPal files"
                    />
                </div>
            </div>
        </div>
    )
}

export default UninstallStepFour