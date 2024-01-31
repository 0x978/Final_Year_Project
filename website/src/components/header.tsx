
const Header = () => {
    return (
        <header className="bg-black text-white py-4 ">
            <div className="container mx-auto flex justify-between items-center h-7">
                <h1>PolicyPal</h1>
                <div className={"text-lighterGray"}>
                    <a href="/" className="mr-4 hover:text-white duration-100">Home</a>
                    <a href="/get-started" className="mr-4 hover:text-white duration-100">Get Started</a>
                    <a className={"hover:text-white duration-100"} href="/about">About</a>
                </div>
            </div>
            <hr/>
        </header>
    );
};



export default Header;
