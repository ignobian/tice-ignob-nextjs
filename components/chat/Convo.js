import React from 'react';
import { Image, Transformation } from 'cloudinary-react';

const Convo = ({ convo }) => {

  const showProfileImg = () => (
    <Image onClick={() => Router.push(`/profile/${convo.with.id}`)} width="30" height="30" style={{borderRadius: '50%', objectFit: 'cover', cursor: 'pointer'}} publicId={convo.with.photo}>
      <Transformation width="300" crop="fill" />
    </Image>
  )

  return (
    <div className="border-bottom py-2 d-flex align-items-center">
      <div className="p-2">
        {showProfileImg()}
      </div>

      <p className="m-0">{convo.with.username}</p>
    </div>
  )
}

export default Convo
