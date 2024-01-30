import Image from 'next/image'
import stepFourImg from "../images/stepFourImg.png"

const stepFour = () => {

    return (
        <div className="text-center">
            <h1 className={"text-4xl font-bold mb-4"}>Step Four:</h1>
            <h2>You should now find yourself on the Google Chrome Extension Management Page</h2>
            <h2>As we are installing a Google Chrome extension from a file, we will need to enable "Developer mode"</h2>
            <h2>Do not worry though, this step is really simple</h2>
            <h2>Simple toggle "Developer Mode" in the top right corner to "on"</h2>
            <Image
                src={stepFourImg}
                width={750}
                height={750}
                alt="Instructional image for enabling developer mode."
            />
        </div>
    )
}

export default stepFour