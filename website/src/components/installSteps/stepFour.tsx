import Image from 'next/image'
import stepFourImg from "../../images/stepFourImg.png"

const stepFour = () => {

    return (
        <div className="text-center text-xl">
            <h1 className={"text-4xl font-bold mb-4"}>Step Four:</h1>
            <h2 className={"mb-0.5"}>You should now find yourself on the Google Chrome Extension Management Page</h2>
            <h2 className={"mb-0.5"}>As we are installing a Google Chrome extension from a file, we will need to enable "Developer mode"</h2>
            <h2 className={"mb-0.5"}>Simply toggle "Developer Mode" in the top right corner to "on"</h2>

            <div className={"flex justify-center align-middle"}>
                <div className={"h-1/2 w-1/2"}>
                    <Image
                        src={stepFourImg}
                        alt="Instructional image for enabling developer mode."
                    />
                </div>
            </div>
        </div>
    )
}

export default stepFour