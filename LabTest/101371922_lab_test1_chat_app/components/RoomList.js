// RoomList.js
import React from 'react';

const RoomList = ({ rooms, onJoinRoom }) => {
  return (
    <div>
      <h2>Room List</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room} onClick={() => onJoinRoom(room)}>
            {room}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
