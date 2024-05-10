import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { AppContext } from "../contexts/AppContexts";
import { Avatar, AvatarGroupCounter, Badge, Button, TextInput, Tooltip, Spinner, Modal, Label } from "flowbite-react";
import { MdArrowBackIos, MdArrowForwardIos, MdArrowRight, MdArrowRightAlt, MdChatBubble, MdChatBubbleOutline, MdEmojiPeople, MdHistory, MdInfo, MdVerticalSplit } from "react-icons/md";
import { GiChatBubble, GiHandGrip, GiInfo, GiPencil, GiPencilBrush, GiQuill, GiTrashCan } from "react-icons/gi";
import { RiArrowRightLine, RiChatQuoteFill, RiExternalLinkLine, RiPencilFill, RiQuillPenFill, RiRobot2Fill, RiWomenFill } from "react-icons/ri";


const Emotions = [
    {
        emotion_name: 'happy',
        emotion_emoji: '😁',
        emotion_ratio: '90%'
    },
    {
        emotion_name: 'chill',
        emotion_emoji: '🙂',
        emotion_ratio: '8%'
    }, {
        emotion_name: 'normal',
        emotion_emoji: '😐',
        emotion_ratio: '2%'
    }, {
        emotion_name: 'sad',
        emotion_emoji: '😥',
        emotion_ratio: '0%'
    }, {
        emotion_name: 'very sad',
        emotion_emoji: '😰',
        emotion_ratio: '0%'
    },
]
function Chat() {
    const titleRef = useRef(null)

    const navigate = useNavigate()
    const [openSideNav, setOpenSideNav] = useState(true)
    const [conversation, setConversation] = useState([])
    const [loading, setLoading] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [saveModal, setSaveModal] = useState(false)
    const [unsavedData, setUnsavedData] = useState(false)
    const [savePrompt, setSavePrompt] = useState(false)
    const [saving, setSaving] = useState(false)
    const [historyModal, setHistoryModal] = useState(false)

    const { userData, logout, chats, promptBot, saveChat, getChatsForUser } = useContext(AppContext)

    console.log(chats ? chats : 'No chats yet')

    function getEmbeddedUrl(youtubeLink) {
        // Extract video ID from the YouTube link
        const videoIdMatch = youtubeLink.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);

        if (videoIdMatch) {
            const videoId = videoIdMatch[1];
            // Construct embedded URL
            return `https://www.youtube.com/embed/${videoId}`;
        } else {
            // Invalid YouTube link
            return null;
        }
    }

    const handlePrompt = async (data, resetForm) => {
        setLoading(true);
        console.log(data.userPrompt)
        setUnsavedData(true)

        try {
            const response = await promptBot({ text: data.userPrompt });
            const botResponse = await response.json();

            console.log("Bot Response:", botResponse);

            setConversation(prevConvo => [...prevConvo, { user: data.userPrompt, bot: { text: botResponse.generated_text[0].generated_text, links: botResponse.youtubeLink } }]);
            resetForm();
        } catch (error) {
            console.error("Error handling prompt:", error);
            // Handle error appropriately, e.g., show error message to user
        } finally {
            setLoading(false);
        }
    };

    const displayOldChat = (chat) => {
        if (conversation.length == 0) {
            setConversation(chat)
            return
        }

        if (unsavedData) {
            setSavePrompt(true)
            return
        }

        setConversation(chat)

    }

    const handleSaveChat = async (e) => {
        e.preventDefault()
        setSaving(true)
        // console.log('This is whats being saved', conversation)
        await saveChat(titleRef.current.value, conversation, userData.uid)
            .then(() => {
                console.log('Chat saved successfully')
                setConversation([])
                setSaveModal(false)
                setUnsavedData(false)

                getChatsForUser(userData?.uid)
                setSaving(false)

            }).catch((err) => { console.error(err) })

        setSaving(false)
    }


    useEffect(() => {
        console.log("Conversation history:", conversation);
    }, [conversation]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    // console.log(userData.username)

    const BotCard = ({ text, links }) => {
        return (
            <div className="flex flex-col w-full">
                <div className="flex flex-row items-start gap-2 w-full my-3">
                    <Avatar rounded size={'md'} img={'/images/Bubble.jpeg'} className="object-contain" />
                    <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-4 bg-blue-300 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div className="flex items-center justify-between space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-700 dark:text-white">Frontida BOT</span>
                            <MdInfo className="text-white" />
                        </div>
                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{text}</p>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Responded</span>
                    </div>
                </div>
                {links && <div className="flex flex-col w-full md:w-3/4 lg:w-1/2 ps-0 md:ps-12 gap-1 md:gap-4">
                    <h4 className="text-sm text-gray-700 !font-sans">Here are some helpful videos</h4>
                    <div className="flex flex-row flex-wrap gap-2">
                        {links.map((link, index) => <Tooltip
                            key={index}
                            style="light"
                            content={
                                <>
                                    <iframe width="300" height="175" src={getEmbeddedUrl(link)} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                                </>
                            }
                        >
                            <a href={link} target="_blank" className="">
                                <Badge className="rounded-full flex flex-row py-0 !w-fit !h-fit" pill color={'gray'}>
                                    <div className="flex flex-row py-1 gap-2">
                                        <h3 className="!font-sans text-gray-600 text-xs ">VIDEO LINK {index + 1} </h3>
                                        <RiExternalLinkLine className="ms-1 md:ms-3" />
                                    </div>
                                </Badge>
                            </a>
                        </Tooltip>)}
                    </div>
                </div>}
            </div>
        )
    }

    const BotLoading = () => {

        return (
            <div className="flex flex-row items-start gap-2 w-full my-3">
                <Avatar rounded size={'md'} img={'/images/Bubble.jpeg'} />
                <div className="flex flex-row-reverse items-end justify-center  w-full max-w-[320px] leading-1.5 p-4 bg-blue-300 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                    <Spinner color="info" aria-label="Info spinner example" />
                    <span className="text-sm !font-sans w-full text-start font-normal text-gray-500 dark:text-gray-400">Generating response ...</span>
                </div>
            </div >
        )
    }

    const UserCard = ({ text }) => {
        return (

            <div className="flex flex-row items-start h-fit justify-end gap-2 w-full my-3">
                <div className="h-full flex flex-col justify-center items-center">
                    <Tooltip
                        className="p-0 m-0 bg-transparent border-none"
                        content={
                            <div className="w-fit flex flex-row-reverse gap-3 h-fit px-5 py-1 bg-white rounded-[99px]">
                                {
                                    Emotions.map((emotion) => (
                                        <div className="flex justify-center items-center flex-col">
                                            <h2 className="text-xl">{emotion.emotion_emoji}</h2>
                                            <p className="text-xs text-gray-700 !font-sans">{emotion.emotion_ratio}</p>
                                        </div>
                                    ))
                                }

                            </div>
                        }
                        style={'light'}
                        placement="left"
                        arrow={false}

                    >
                        <Button color="gray" size={'xs'} className="!w-fit !p-0 !m-0">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 4 15">
                                <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                            </svg>
                        </Button>
                    </Tooltip>
                </div>
                <div className="flex h-fit flex-col w-full max-w-[320px] leading-1.5 px-4 py-1 border-gray-200 bg-white rounded-s-xl rounded-ee-xl dark:bg-gray-700">
                    <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{text}</p>
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                </div>
                <Avatar rounded size={'md'} />
            </div>


        )
    }


    return (
        <div className="w-full flex flex-col h-full">
            <Modal
                onClose={() => { setOpenModal(false) }}
                show={openModal}
                dismissible
            >
                <Modal.Header>Save this conversation?</Modal.Header>
                <Modal.Body>
                    <h3 className="text-xl font-bold ">Here's what you need to know before saving this conversation.</h3>
                    <ul className="ps-5 list-decimal">
                        <li className="">
                            <p>You'll be able to access your previous conversations with our chatbot</p>
                        </li>
                        <li className="">
                            <p>Your data is stored anonymously for privacy  reasons, but we may use it in the future to train the model to give you better responses.</p>
                        </li>
                        <li className="">
                            <p>You can choose to completely erase your conversations any time. </p>
                        </li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button color="blue" onClick={() => {
                        setOpenModal(false)
                        setSaveModal(true)
                    }}>Save Conversation</Button>
                    <Button
                        onClick={() => {
                            setOpenModal(false)
                            setConversation([])
                        }}
                        disabled={saving}
                        color="red"
                    >Cancel, I don't want to save this conversation.</Button>
                </Modal.Footer>
            </Modal>

            <Modal dismissible size={'sm'} show={savePrompt} onClose={() => setSavePrompt(false)}>
                <Modal.Header className="!border-b-0 pb-0" />
                <Modal.Body className="flex flex-col items-center pt-0">
                    <MdInfo className="mx-auto mb-4 h-14 w-14 bg-gray-400 rounded-full p-0 text-white" />
                    <h3>You have unsaved changes. Would you like to save them before opening an old chat?</h3>
                    <div className="flex flex-row w-full justify-center gap-2">
                        <Button color="blue">Save Chat</Button>
                        <Button color="red">I don't wish to save  the chat</Button>
                    </div>
                </Modal.Body>
            </Modal>
            <Modal
                dismissible
                size={'sm'}
                show={saveModal}
                onClose={() => setSaveModal(false)}
            >
                <Modal.Header className="!border-b-0 pb-0" />
                <Modal.Body className="flex flex-col items-center pt-0">
                    <MdInfo className="mx-auto mb-4 h-14 w-14 bg-gray-400 rounded-full p-0 text-white" />
                    <form
                        onSubmit={handleSaveChat}
                        className="flex flex-col items-center">
                        <Label className="!font-sans w-full pb-2">Enter a title for your saved conversation.</Label>
                        <TextInput
                            ref={titleRef}
                            placeholder="Enter a title"
                            required
                            className="w-full"
                        />
                        <div className="flex flex-row w-full justify-center gap-2">
                            <Button
                                disabled={loading}
                                color="blue"
                                className="w-fit mt-3"
                                type="submit"
                            >Save Chat</Button>
                            <Button
                                color="red"
                                className="w-fit mt-3"
                                onClick={
                                    () => {
                                        setSaveModal(false)
                                        setOpenModal(true)
                                    }

                                }
                            >Cancel</Button>
                        </div>
                    </form>
                </Modal.Body>


            </Modal>
            <Modal
                dismissible
                show={historyModal}
                onClose={() => setHistoryModal(false)}
                position={'center'}
                size={'sm'}
                className="flex lg:hidden"
            >
                <Modal.Header>Conversation History</Modal.Header>
                <Modal.Body>
                    <div className="flex flex-col gap-1 w-full max-h-[75vh] overflow-y-scroll" >
                        {chats &&

                            chats.map((chat, index) => {
                                // console.log('shatt', chat)
                                return (
                                    <Button
                                        key={index}
                                        onClick={() => displayOldChat(chat.data)}
                                        color="blue" className="p-0 bg-blue-500" >
                                        <h4 className="text-sm !font-sans">{chat.name}</h4>
                                    </Button>
                                )
                            })

                        }
                    </div>
                </Modal.Body>
            </Modal>

            <div className="flex flex-row h-full p-2 gap-4">
                <div className={`${openSideNav ? 'w-1/4' : 'w-fit'} h-full hidden lg:flex rounded p-3`}>
                    <div className="flex flex-col w-full gap-3">
                        <Button size={'lg'} className={!openSideNav ? "py-2" : 'w-fit'} color="gray" pill onClick={() => (setOpenSideNav(!openSideNav))} > {openSideNav ? <MdArrowBackIos /> : <MdArrowForwardIos />} {openSideNav && "Collapse"}</Button>
                        <Button
                            size={'lg'}
                            className={!openSideNav ? "py-2" : 'w-fit'}
                            color="dark" pill={!openSideNav}
                            onClick={() => {
                                if (unsavedData) {
                                    setOpenModal(true)
                                }
                                else { setConversation([]) }
                            }}
                        >
                            {openSideNav && "Start New Chat"}
                            <GiChatBubble className={openSideNav && "ms-20"} />
                        </Button>
                        <div className="flex flex-col gap-1 w-3/4" >
                            {chats &&

                                chats.map((chat, index) => {
                                    // console.log('shatt', chat)
                                    return (
                                        <Button
                                            key={index}
                                            onClick={() => displayOldChat(chat.data)}
                                            color="blue" className="p-0 bg-blue-500" >
                                            <h4 className="text-sm !font-sans">{chat.name}</h4>
                                        </Button>
                                    )
                                })

                            }
                        </div>
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center rounded py-0 md:py-3">

                    <div className={`${openSideNav ? "w-11/12 md:w-10/12" : "w-3/4"} flex flex-col justify-between h-full  gap-3 `}>
                        <div className="flex flex-row h-fit gap-2 justify-between w-full border-b-[none] md:!border-b-[1px] pb-0 md:pb-4 border-gray-300">
                            <div className="flex flex-row gap-3">
                                <Avatar rounded size={'md'} img={'/images/Bubble.jpeg'} status="online" statusPosition="top-right" />
                                <div className="hidden md:flex flex-col">
                                    <h3 className="text-xl font-bold">Frontida Bot</h3>
                                    <Badge className="w-fit">Online</Badge>
                                </div>
                            </div>
                            <div className="flex flex-row gap-2 items-center justify-end w-full md:w-fit">

                                <Button
                                    onClick={() => {
                                        if (unsavedData) {
                                            setOpenModal(true)
                                        }
                                        else { setConversation([]) }
                                    }}
                                    className="m-0 p-0 flex lg:hidden" pill color="dark"><h4 className="hidden md:flex">New</h4><GiChatBubble className="m-0 md:ms-2" /> </Button>


                                <Button
                                    onClick={() => setHistoryModal(true)}
                                    className="m-0 p-0 flex lg:hidden" pill color="light"><h4 className="hidden md:flex">History</h4><MdHistory className="m-0 md:ms-2" /> </Button>

                                {/* <Button onClick={() => Save()} >Save shatt</Button> */}
                                <Tooltip
                                    style="light"
                                    arrow={false}
                                    trigger="click"
                                    placement='left'
                                    className="bg-transparent border-none"
                                >
                                    <Badge icon={GiTrashCan} className="bg-red-400 px-3 py-2" color={'dark'} size={'xl'} />

                                </Tooltip>

                            </div>
                        </div>
                        <div className="h-full w-full !overflow-y-scroll scroll-force max-h-[70vh] md:max-h-[65vh] flex flex-col items-center">

                            {
                                conversation.map((item, index) => {
                                    return (
                                        <div key={index} className="w-full">
                                            <UserCard text={item.user} />
                                            <BotCard text={item.bot.text} links={item.bot.links} />
                                        </div>
                                    )
                                })
                            }
                            {loading && <BotLoading />}

                        </div>

                        <div className="flex flex-row h-fit w-full">
                            <form onSubmit={handleSubmit(handlePrompt, { reset: true })} className="w-full">
                                <div className="flex flex-row w-full gap-1 md:gap-4">
                                    <div className="flex flex-col justify-center items-center w-full">
                                        <TextInput
                                            {...register('userPrompt', { required: 'Please type something' })}
                                            icon={GiQuill}
                                            rightIcon={RiRobot2Fill}
                                            placeholder="Your text goes here ..."
                                            className="w-full"
                                            color={errors.userPrompt ? 'warning' : 'gray'}
                                            helperText={errors.userPrompt?.message}
                                        />
                                    </div>
                                    <Button color="purple" type="submit" className="py-0 h-fit" >Send <RiArrowRightLine className="ms-2 text-sm md:text-2xl" /></Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
}

export default Chat;
