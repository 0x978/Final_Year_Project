import Image from 'next/image'
import {useRouter} from "next/router";
import stepTwoImage from "../../images/stepTwoImg.png"

const stepTwo = () => {

    return (
            <div className="text-center">
                <h1 className={"text-4xl font-bold mb-4"}>Step Two:</h1>
                <h2>Navigate to where you installed the file and extract it by right-clicking it and clicking "extract-all"</h2>
                <h2>If done correctly, you should end up with two files, "PolicyPal.zip" and "PolicyPal".</h2>

                <div className={"flex justify-center align-middle"}>
                    <div className={"h-1/2 w-1/2"}>
                        <Image
                            src={stepTwoImage}
                            alt="Instructional image for extracting the file."
                        />
                    </div>
                </div>
            </div>
    )
}

export default stepTwo