import Image from 'next/image'
import {useRouter} from "next/router";
import stepTwoImage from "../images/stepTwoImg.png"

const stepTwo = () => {

    return (
            <div className="text-center">
                <h1 className={"text-4xl font-bold mb-4"}>Step Two:</h1>
                <h2>Extract the file into a folder by right clicking it and pressing "extract all"</h2>
                <h2>If done correctly, you should end up with two folders, "release.zip" and "release".</h2>
                <Image
                    src={stepTwoImage}
                    width={750}
                    height={750}
                    alt="Instructional image for extracting the file."
                />
            </div>
    )
}

export default stepTwo