import Router from 'next/router';
import { Image, Transformation } from 'cloudinary-react';
import moment from 'moment';

const Message = ({ message, lastMessage }) => {

  const showProfileImg = () => (
    <Image onClick={() => Router.push(`/profile/${message.from.id}`)} width="40" height="40" style={{borderRadius: '50%', objectFit: 'cover', cursor: 'pointer'}} publicId={message.from.photo} secure="true">
      <Transformation width="300" crop="fill" />
    </Image>
  )
  return (
    <div className="d-flex my-2" id={lastMessage ? 'last-message' : undefined}>
      <div className="p-2">
        {showProfileImg()}
      </div>
      <div>
        <p className="mb-1"><span className="font-weight-bold">{message.from.username}</span><small className="text-muted font-italic ml-2">{moment(message.createdAt).format('LLLL')}</small></p>
        <p>{message.content}</p>
      </div>

    </div>
  )
}

export default Message
