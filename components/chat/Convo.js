import React from 'react';
import { Image, Transformation } from 'cloudinary-react';
import styled from 'styled-components';
import Router from 'next/router';

const StyledDiv = styled.div`
  &:hover {
    background-color: #efefef;
    transition: background-color, 200ms ease-out;
  }
  border-radius: 5px;
  cursor: pointer;
`;

const Convo = ({ convo, isFirst }) => {
  const showProfileImg = () => (
    <Image onClick={() => Router.push(`/profile/${convo.with.id}`)} width="30" height="30" style={{borderRadius: '50%', objectFit: 'cover', cursor: 'pointer'}} publicId={convo.with.photo}>
      <Transformation width="300" crop="fill" />
    </Image>
  )

  return (
    <StyledDiv role="button" onClick={() => Router.push(`/conversations/${convo.id}`)} className={`border-left border-right border-bottom py-2 d-flex align-items-center ${isFirst && 'border-top'}`}>
      <div className="p-2">
        {showProfileImg()}
      </div>

      <p className="m-0">{convo.with.username}</p>
    </StyledDiv>
  )
}

export default Convo
