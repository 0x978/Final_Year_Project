import Image from "next/image";
import stepSevenImg from "@/images/stepSevenImg.png";

const StepSeven = () => {

    return (
        <div className="text-center text-xl">
            <h1 className={"text-4xl font-bold mb-4"}>Complete!</h1>
            <h2>The extension is now installed!</h2>
            <h2>Now, visit any privacy policy or terms and conditions page, for <b>any website!</b></h2>
            <h2>You can then use the extension by pressing the extension button, then "privacy pal"</h2>

            <div className={"flex justify-center align-middle"}>
                <div className={"h-1/2 w-1/2"}>
                    <Image
                        src={stepSevenImg}
                        alt="Instructional image for how to activate the extension on a page"
                    />
                </div>
            </div>
        </div>
    )
}

export default StepSeven