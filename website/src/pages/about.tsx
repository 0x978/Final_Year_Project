import {FC} from "react"
import Header from "@/components/header";
import {useRouter} from "next/router";


interface AboutProps {

}

const About: FC<AboutProps> = ({}) => {
    const router = useRouter()
    return (
        <main className="min-h-screen bg-black flex flex-col justify-between">
            <Header active={"about"} />
            <div className="flex flex-col  items-center text-center text-gray-300 flex-grow px-4 py-8">
                <div className="max-w-4xl mx-auto">

                    <h1 className="text-3xl font-bold mb-4">Welcome to
                        <span className={"text-blue-300"}> Policy</span>
                        <span className={"text-red-300"}>Pal</span>!</h1>

                    <p className="mb-6">
                        PolicyPal aims to revolutionise the way you interact with website policies, utilising artificial
                        intelligence to simplify the often convoluted, verbose terms and conditions or privacy policies
                        of any website into a set of succinct and concise bullet points.
                    </p>

                    <h2 className="text-2xl font-bold mb-2">The Mission</h2>
                    <p className="mb-6">
                        PolicyPal's mission is to empower users with the ability to navigate the web confidently. With
                        PolicyPal, developing an understanding of website policies is just one click away.
                    </p>

                    <h2 className="text-2xl font-bold mb-2">How It Works</h2>
                    <p className="mb-6">
                        PolicyPal utilises a cutting-edge Natural Language Processing (NLP) Model to analyse and extract
                        the key information from website policies and form a concise, digestible summary. It utilises
                        revolutionary technology such as the longform encoder decoder (LED) model to process tens of
                        thousands of characters at blazingly fast speeds.

                        <br/><br/>

                        With just one click, the Extension picks out all relevant information on the page,
                        passes it to the NLP model, and receives a summary highlighting the most important aspects of
                        the policy.
                    </p>

                    <h2 className="text-2xl font-bold mb-2">Why Choose PolicyPal</h2>
                    <p className="mb-6">
                        With PolicyPal, you can trust that you're making informed decisions regarding your data when
                        browsing the web. The extension provides transparent and digestible summaries, empowering you
                        to stay informed about policies that impact your online experience.

                    </p>

                    <h2 className="text-2xl font-bold mb-2">Get Started</h2>
                    <p>
                        Ready to simplify website policies and enhance your browsing experience?
                    </p>
                    <button
                        className="bg-offWhite hover:bg-offWhiteHover hover:-translate-y-1 active:translate-y-1
                            text-black font-bold py-2 px-4 rounded mx-6 w-36 transition ease-in-out delay-150 my-2"
                        onClick={() => router.push("/getStarted")}
                    >
                        Get Started
                    </button>
                </div>
            </div>
        </main>
    );
}

export default About