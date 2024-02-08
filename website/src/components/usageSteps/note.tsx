import {FC} from "react"
import {useRouter} from "next/router";
import Image from "next/image";
import usageFour from "@/images/usageFour.png";


const Note: FC = ({}) => {
    const router = useRouter()

    return (
        <div className="text-center">
            <h1 className={"text-4xl font-bold mb-4"}>Note:</h1>
            <h2 className={"text-xl mb-2"}>If the button says "summarise privacy policy", but you're on a terms
                    and conditions page, or vice versa,
            </h2>
            <h2 className={"text-xl mb-2"}>Click the text that says "incorrect?" </h2>

            <div className={"flex justify-center align-middle"}>
                <div className={""}>
                    <Image
                        src={usageFour}
                        alt="Instructional image for correcting the extension's document type inference."
                    />
                </div>
            </div>
        </div>
    )
}

export default Note