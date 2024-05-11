import React, { useContext, useEffect, useState } from 'react'
import { Button, Spinner } from 'flowbite-react'
import { AppContext } from '../contexts/AppContexts'
import { act } from 'react'
import { Link } from 'react-router-dom'
const Feed = () => {
    const { userMood } = useContext(AppContext)
    const [feed, setFeed] = useState(null)
    const [loading, setLoading] = useState(true)

    const getFeeds = async () => {
        setLoading(true)
        let formData = new FormData()
        formData.append('mood', userMood)

        try {
            let responses = await fetch('https://mama-salama.onrender.com/feed', {
                method: 'POST',
                body: formData

            })
            let data = await responses.json()
            console.log('Feed:', data)
            console.log('Feed lenght:', Object.keys(data).length)
            setFeed(data)
        } catch (error) {
            console.error('Error fetching feed:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getFeeds()
    }, [])

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className='flex flex-col gap-4 h-full w-3/4 overflow-y-scroll'>

                <h2 className='text-5xl font-bold'>The Salama Feed</h2>
                <p className='text-gray-500'>Stay up-to-date with the latest news and resources</p>
                {
                    loading &&
                    <div className="w-full gap-3 h-full flex justify-center items-center">
                        <Spinner />
                        <h3>Fetching customised feeds</h3>
                    </div>
                }
                {!loading && feed && Object.keys(feed).length > 0 &&

                    <div className='w-full flex flex-col gap-4'>
                        {feed.activities && (
                            <div className='w-full flex flex-col'>
                                <h3 className="text-2xl font-bold mb-4">Activities</h3>


                                <div className="grid grid-cols-1 pt-4 gap-4  h-full">
                                    {feed.activities.map((activity, index) => (
                                        <div className="w-full flex flex-row h-full rounded ">
                                            <img src={activity.image_url} className='rounded-r-lg w-1/4 h-[30vh]' alt="" />
                                            <div className="h-full w-full p-6 gap-4 rounded-b bg-white items-start flex flex-col">
                                                <h3 className='text-lg font-bold'>{activity.title}</h3>
                                                <p className='text-gray-500 pb-2'>{activity.benefit}</p>
                                                <p className='w-fit text-sm font-semibold'>{activity.description}</p>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </div>
                        )}
                        {feed.articles && (
                            <div className='w-full flex flex-col'>
                                <h3 className="text-2xl font-bold mb-4">Articles</h3>


                                <div className="grid grid-cols-1 pt-4 gap-4  h-full">
                                    {feed.articles.map((article, index) => (
                                        <div className="w-full flex flex-row h-full rounded ">
                                            <img src={article.image_url} className='rounded-l-lg w-1/4 h-[30vh] bg-slate-200 animate-pulse' alt="" />
                                            <div className="h-full w-full p-6 gap-4 rounded-b bg-white items-start flex flex-col">
                                                <h3 className='text-xl font-bold'>{article.title}</h3>
                                                <p className='text-gray-500 pb-2'>{article.benefit}</p>
                                                <p className='w-fit text-sm font-semibold'>{article.description}</p>
                                                <a target='_blank' to={article.detailed_info}>
                                                    <Button>View MOre</Button>
                                                </a>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </div>
                        )}
                        {feed.informative_material && (
                            <div className='w-full flex flex-col'>
                                <h3 className="text-2xl font-bold mb-4">Informative Material</h3>


                                <div className="grid grid-cols-1 pt-4 gap-4  h-full">
                                    {feed.informative_material.map((article, index) => (
                                        <div className="w-full flex flex-row h-full rounded ">
                                            <img src={article.image_url} className='rounded-r-lg w-1/4 h-[30vh]' alt="" />
                                            <div className="h-full w-full p-6 gap-4 rounded-b bg-white items-start flex flex-col">
                                                <h3 className='text-xl font-bold'>{article.title}</h3>
                                                <p className='text-gray-500 pb-2'>{article.benefit}</p>
                                                <p className='w-fit text-sm font-semibold'>{article.description}</p>
                                                <p className="text-md">
                                                    {article.detailed_info}
                                                </p>
                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </div>
                        )}
                    </div>
                }

            </div>
        </div>
    )
}

export default Feed