import Image from "next/image";
import stepSevenImg from "@/images/stepSevenImg.png";
import {useRouter} from "next/router";

const StepSeven = () => {
    const router = useRouter()

    return (
        <div className="text-center text-xl">
            <h1 className={"text-4xl font-bold mb-4"}>Complete!</h1>
            <h2 className={"mb-2"}>The extension is now installed!</h2>
            <h2>Want to learn how to use the extension?
                <span onClick={() => router.push("/howToUse")}
                    className={"underline cursor-pointer text-blue-400 "}
                > Visit the "how to" guide by clicking here!
                </span>
            </h2>

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