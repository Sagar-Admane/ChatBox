import React, { useContext, useEffect, useState } from 'react'
import style from "./message.module.scss"
import Loading from '../Miscellaneous/Loading';
import { IoSendSharp } from 'react-icons/io5';
import chatContext from '../../Context/chatProvider';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';
import ScrollableChats from '../ScrollableChats/ScrollableChats';

function Message() {

    const [message, setMessage] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoding] = useState(false);

    const {user, selectedChat, setSelectedchat} = useContext(chatContext)

    useEffect(()=>{
        fetchMessage();
        console.log(message);
    }, [selectedChat])

    async function fetchMessage(){
        if(!selectedChat) return;

        

        try {
            const {data} = await axios.get(`http://localhost:5000/api/message/${selectedChat._id}`,{
                headers : {
                    Authorization : `Bearer ${user.token}`
                }
            })
            setMessage(data);
            console.log(data);
        } catch (error) {
            toast.error("Failed to load the messages");
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!newMessage) {
            toast.error("There should be some message");
            return;
        }
    
        setNewMessage("");
        try {
            const { data } = await axios.post("http://localhost:5000/api/message", {
                content: newMessage,
                chatId: selectedChat._id
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                }
            });
    
            setMessage([...message, data]);  
            fetchMessage();  
        } catch (error) {
            toast.error("Failed to send message");
        }
    }

    function typingHandler(e){
        setNewMessage(e.target.value);
    }

    return (
        <div className={style.container} >
            <ToastContainer />
            {loading ? <Loading /> : (
                <div className={style.container1} >
                    <div className={style.msg} >
                        {<ScrollableChats message={message} />}
                    </div>
                    <div className={style.inp} >
                        <form onSubmit={handleSubmit} >
                            <input type="text" placeholder='Enter Your text' onChange={typingHandler} value={newMessage} />
                            <IoSendSharp size={24} />
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Message
