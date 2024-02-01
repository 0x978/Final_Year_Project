import {FC} from "react";
import {useRouter} from "next/router";

interface HeaderProps {
    active: "home" | "get started" | "about"
}

const Header: FC<HeaderProps> = ({active}) => {
    let router = useRouter()
    return (
        <header className="bg-black text-white py-4 ">
            <div className="container mx-auto flex justify-between items-center h-7">
                <h1>PolicyPal</h1>
                <div className={"text-lighterGray"}>

                    <button onClick={() => router.push("/")} className={`mr-4 hover:text-white duration-100 
                    ${active === "home" ? 'text-white' : 'text-lighterGray'}`}>
                        Home
                    </button>

                    <button onClick={() => router.push("/getStarted")} className={`mr-4 hover:text-white duration-100
                    ${active === "get started" ? 'text-white' : 'text-lighterGray'}`}>
                        Get Started
                    </button>

                    <button className={`hover:text-white duration-100 
                    ${active === "about" ? 'text-white' : 'text-lighterGray'}`} onClick={() => router.push("/about")}>
                        About
                    </button>
                </div>
            </div>
            <hr/>
        </header>
    );
};


export default Header;

