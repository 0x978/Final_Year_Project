import Image from 'next/image'
import stepThreeImg from "../../images/stepThreeImg.png"

const stepThree = () => {

    return (
        <div className="text-center text-xl">
            <h1 className="text-4xl font-bold mb-4">Step Three:</h1>
            <h2>Open up Google Chrome and press the menu in the top right corner with the 3 dots</h2>
            <h2>Then hover over "extensions" and press "Manage Extensions"</h2>
            <div className={"flex justify-center align-middle"}>
                <div className={"h-1/2 w-1/2"}>
                    <Image
                        src={stepThreeImg}
                        alt="Instructional image for finding the Manage Extensions button."
                    />
                </div>
            </div>
        </div>
    )
}

export default stepThree