import React from 'react'
import Loading from '../../components/Loading';
import { useEffect } from 'react';
import { getCookie } from '../../actions/auth';
import { findConversationId } from '../../actions/conversation';

const FindConversation = ({ router }) => {
  const token = getCookie('token');

  useEffect(() => {
    // find conversation with this person
    findConversationId(router.query.with, token).then(data => {
      console.log(data);
    });

  }, [router.query.with]);

  return <Loading/>
}

export default FindConversation;
