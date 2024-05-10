import { Tooltip } from "flowbite-react";
import React from "react";
import { RiGithubFill, RiGithubLine, RiGoogleLine, RiMailAddFill, RiTwitterLine } from "react-icons/ri";


function Footer() {
    return (
        <footer className="bg-primary rounded-b-md px-5 sticky bottom-0 dark:bg-gray-800 w-full hidden md:flex justify-center items-center">
            <div className="  px-5 py-1 md:p-4 md:flex md:items-center w-full items-end md:justify-between lg:justify-between">
                <ul className="hidden md:flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
     
 
                </ul>
                <span className="text-sm flex flex-row gap-5 justify-center items-center text-gray-500 sm:text-center dark:text-gray-400">
                    <Tooltip content="Github Link">
                        <a href="https://github.com/Mama-Frontida" target="_blank">
                            <RiGithubFill className="text-sm md:text-4xl text-black" />
                        </a>
                    </Tooltip>
                    <Tooltip content='Huggingface' style="dark">
                        <a href="https://huggingface.co/Danroy/MamaFrontida" target="_blank" className="text-3xl">
                            🤗
                        </a>
                    </Tooltip>

                </span>

            </div>
        </footer>
    );
}

export default Footer;
