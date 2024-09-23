import logo from '../assets/img/logo.png'


function Footer() {
    return (
        <>
            <footer className="flex flex-col bg-deep-blue h-20">
                <img
                    className=" mt-4 h-11 w-20 mx-auto"
                    src={logo}
                    alt="Logo for a nav bar"
                />
            </footer>
        </>
    )
}
export default Footer
