import React from 'react'
import Loading from '../../components/Loading';
import { useEffect } from 'react';
import { getCookie } from '../../actions/auth';
import { findConversationId } from '../../actions/conversation';
import Router, { withRouter } from 'next/router';
import { useState } from 'react';

const FindConversation = ({ router }) => {
  const [error, setError] = useState('');

  const token = getCookie('token');

  useEffect(() => {
    // find conversation with this person
    if (router.query.with) {
      findConversationId(router.query.with, token).then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          Router.replace(`/conversations/${data.id}`)
        }
      });
    }
  }, [router.query.with]);

  return !error ? <Loading/> : <Error content={error} />
}

export default withRouter(FindConversation);
