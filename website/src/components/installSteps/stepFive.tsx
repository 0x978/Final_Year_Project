import Image from "next/image";
import stepFiveImg from "@/images/stepFiveImg.png";
import stepSevenImg from "@/images/stepSevenImg.png";

const stepFive = () => {

    return (
        <div className="text-center text-xl">
            <h1 className={"text-4xl font-bold mb-4"}>Step Five:</h1>
            <h2>You should now notice three new buttons</h2>
            <h2>Press "Load unpacked"</h2>

            <div className={"flex justify-center align-middle"}>
                <div className={"h-1/2 w-1/2"}>
                    <Image
                        src={stepFiveImg}
                        alt="Instructional image for finding the load unpacked button."
                    />
                </div>
            </div>
        </div>
    )
}

export default stepFive