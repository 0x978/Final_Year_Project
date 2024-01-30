import { FC } from "react";
import {useRouter} from "next/router";

interface IndexProps {}

const Index: FC<IndexProps> = ({}) => {
    const router = useRouter()

    return (
            <main className="flex h-screen justify-center items-center bg-black text-gray-300">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">Website Agreement Summariser</h1>
                <h2 className="text-lg mb-8">
                    Summarise any website's privacy policy or terms and conditions with
                    just one button press
                </h2>
                <button className="bg-goldenOrange hover:bg-goldenOrangeHover hover:-translate-y-1
                 active:translate-y-1 text-white font-bold py-2 px-4 rounded" onClick={() => router.push("/getStarted")}>
                    Get Started
                </button>
            </div>
        </main>
    );
};

export default Index;
