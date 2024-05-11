import { Tooltip } from "flowbite-react";
import React from "react";
import { RiGithubFill, RiGithubLine, RiGoogleLine, RiMailAddFill, RiTwitterLine } from "react-icons/ri";


function Footer() {
    return (
        <footer className="bg-primary rounded-b-md px-5 sticky bottom-0 dark:bg-gray-800 w-full hidden md:flex justify-center items-center">
            <div className="  px-5 py-1 md:p-4 md:flex md:items-end w-full items-end md:justify-between lg:justify-between">
                
                <span className="w-fit text-sm flex flex-row gap-5 justify-center items-center text-gray-500 sm:text-center dark:text-gray-400">
                    <Tooltip content="Github Link">
                        <a href="https://github.com/SalamaMama" target="_blank">
                            <RiGithubFill className="text-sm md:text-4xl text-black" />
                        </a>
                    </Tooltip>

                    <a href="https://ai.google.dev/gemini-api/docs" target="_blank" className="text-sm flex flex-row gap-3">
                      <img src="./gemini.png" className="w-[10vh] h-fit object-center object-contain" alt="" />
                    </a>


                </span>

            </div>
        </footer>
    );
}

export default Footer;
