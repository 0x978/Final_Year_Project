import Image from 'next/image'
import stepThreeImg from "../images/stepThreeImg.png"

const stepThree = () => {

    return (
        <div className="text-center">
            <h1 className={"text-4xl font-bold mb-4"}>Step Three:</h1>
            <h2>Open up Google Chrome and press the menu in the top right corner with the 3 dots</h2>
            <h2>Hover over "extensions" and press "Manage Extensions"</h2>

            <Image
                src={stepThreeImg}
                width={750}
                height={750}
                alt="Instructional image for opening chrome extension page."
            />
        </div>
    )
}

export default stepThree