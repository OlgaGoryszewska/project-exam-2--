import logo from '../assets/img/logo.png'
import GitHubIcon from '@mui/icons-material/GitHub'

function Footer() {
    return (
        <>
            <footer className="flex flex-col bg-deep-blue h-30">
                <img
                    className=" mt-4 h-11 w-26 mx-auto"
                    src={logo}
                    alt="Logo for a nav bar"
                />
                <div className="text-white mx-auto flex flex-col pb-2">
                    <a
                        className="text-white font-extralight text-xs pt-2"
                        href="https://github.com/OlgaGoryszewska"
                    >
                        Made by Olga Goryszewska
                    </a>
                    <a  className="text-white mx-auto" href="https://github.com/OlgaGoryszewska"><GitHubIcon  sx={{ fontSize: 18 }} /></a>
                    
                </div>
            </footer>
        </>
    )
}
export default Footer
