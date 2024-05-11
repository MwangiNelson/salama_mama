import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'flowbite-react'
import { AppContext } from '../contexts/AppContexts'

const Feed = () => {
    const { userMood } = useContext(AppContext)
    const [feed, setFeed] = useState([])
    const [loading, setLoading] = useState(true)

    const getFeeds = async () => {
        let formData = new FormData()
        formData.append('mood', userMood)

        try {
            let responses = await fetch('https://mama-salama.onrender.com/feed')
            let data = await responses.json()
            console.log('Feed:', data)
            setFeed(data)
        } catch (error) {
            console.error('Error fetching feed:', error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getFeeds()
    }
        , [userMood])

    return (
        <div className="w-full h-full flex flex-col justify-center items-center">
            <div className='flex flex-col gap-4 h-full w-3/4'>

                <h2 className='text-5xl font-bold'>The Salama Feed</h2>
                <p className='text-gray-500'>Stay up-to-date with the latest news and resources</p>

                <div className="grid grid-cols-3 pt-4 gap-4 grid-rows-2 h-full">
                    <div className="w-full h-full rounded ">
                        <img src="" className='h-1/2' alt="" />
                        <div className="h-1/2 p-4 rounded-b bg-white items-start   flex flex-col">
                            <h3 className='text-lg font-bold'>Postpartum Depression</h3>
                            <p className='text-gray-500 pb-2'>Learn more about postpartum depression and how to navigate it</p>
                            <Button className='w-fit py-0'>View Details</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feed