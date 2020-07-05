import Router from 'next/router';
import { Image, Transformation } from 'cloudinary-react';

const Message = ({ message, lastMessage }) => {

  const showProfileImg = () => (
    <Image onClick={() => Router.push(`/profile/${message.from.id}`)} width="40" height="40" style={{borderRadius: '50%', objectFit: 'cover', cursor: 'pointer'}} publicId={message.from.photo}>
      <Transformation width="300" crop="fill" />
    </Image>
  )
  return (
    <div className="d-flex my-2" id={lastMessage ? 'last-message' : false}>
      <div className="p-2">
        {showProfileImg()}
      </div>
      <div>
        <p className="font-weight-bold mb-1">{message.from.username}</p>
        <p>{message.content}</p>
      </div>

    </div>
  )
}

export default Message
