import React, { useContext } from 'react';
import style from "./scrollable.module.scss";
import { Virtuoso } from 'react-virtuoso';
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../../config/chatLogics';
import chatContext from '../../Context/chatProvider';
import { Avatar, Tooltip } from '@mui/material';

function ScrollableChats({ message = [] }) {  // Ensure message is always an array
    const { user } = useContext(chatContext);
    console.log("Messages:", message);

    return (
        <div className={style.container} style={{ height: "100%", overflow: "hidden" }}>
            <Virtuoso
                style={{ height: "100%" }}
                data={message}
                itemContent={(index, v) => (
                    <div key={v._id} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "5px" }}>
                        {(isSameSender(message, v, index, user._id) || isLastMessage(message, index, user._id)) && (
                            <Tooltip title={v.sender.name} arrow>
                                <Avatar sx={{ height: '28px', width: '28px' }} src={v.sender.pic} alt={v.sender.name} />
                            </Tooltip>
                        )}
                        <span style={{
                            backgroundColor: `${v.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                                }`,
                            borderRadius: "20px",
                            padding: "5px 15px",
                            maxWidth: "75%",
                            marginLeft: isSameSenderMargin(message, v, index, user._id),
                            marginTop: isSameUser(message, v, index, user._id) ? 3 : 10
                        }} >{v.content}</span>
                    </div>
                )}
            />
        </div>
    );
}

export default ScrollableChats;



