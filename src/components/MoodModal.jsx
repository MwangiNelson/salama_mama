import { Button, Modal } from 'flowbite-react'
import React, { useState, useContext } from 'react'
import { AppContext } from '../contexts/AppContexts'
import { toast } from 'react-toastify'
import CustomToast from './toast'

const MoodModal = ({ visible, toggleFunction
}) => {
    const { userMood, setUserMood } = useContext(AppContext)
    const [selectedMood, setSelectedMood] = useState(null)
    const moodsWithEmojis = [
        { mood: 'Happy', emoji: '😊' },
        { mood: 'Sad', emoji: '😢' },
        { mood: 'Angry', emoji: '😡' },
        { mood: 'Anxious', emoji: '😨' },
        { mood: 'Excited', emoji: '😁' },
        { mood: 'Tired', emoji: '😴' }
    ]

    const MoodCard = ({ mood, emoji }) => {
        return (
            <button
                className={`flex flex-col items-center justify-center p-4 rounded-lg ${selectedMood == mood
                    ? 'bg-green-300 text-slate-500 border-primary border-2'
                    : 'bg-gray-200 text-black'
                    }`}
                onClick={() => handleMoodSelection(mood)}
            >
                <span className="text-3xl">{emoji}</span>
                <span className="text-lg">{mood}</span>
            </button>
        );
    };
    const handleMoodSelection = (mood) => {
        if (selectedMood == mood) {
            setSelectedMood(null)
            return
        }
        setSelectedMood(mood)
        toggleFunction()
    }

    const updateMood = () => {
        console.log(selectedMood)
        if (selectedMood.length === 0) {
            CustomToast({ type: 'error', message: 'Please select a mood' })
            return
        }
        setUserMood(selectedMood)
    }
    return (
        <Modal show={visible} >
            <Modal.Header>
                <h2 className="text-xl font-bold">How are you feeling today?</h2>
            </Modal.Header>
            <Modal.Body>
                <div className="grid grid-cols-3 gap-4">
                    {moodsWithEmojis.map((moo, index) => (
                        <MoodCard key={index} mood={moo.mood} emoji={moo.emoji} />
                    ))}

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { updateMood() }} color='blue'>Save</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MoodModal