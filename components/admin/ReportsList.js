import Link from 'next/link';
import { useState, useEffect } from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import { getCookie, isAuth } from '../../actions/auth';
import { getReports, removeReport } from '../../actions/report';
import { removeBlog } from '../../actions/blog';
import Loading from '../Loading';
import { API } from '../../config';
import { DefaultLink } from '../Link';
import { SecondaryButton } from '../Button';
import { Button } from 'reactstrap';

const ReportItem = styled.li`
  display: flex;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 1px 1px 4px rgba(0,0,0,.3);
  border-radius: 5px;
  margin-bottom: 20px;
`;

const ReportsList = () => {
  const [values, setValues] = useState({
    loading: true,
    reports: []
  });

  const { loading, reports } = values;

  const token = isAuth() && getCookie('token');

  useEffect(() => {
    initReports();
  }, []);

  const initReports = () => {
    setValues({ ...values, loading: true });
    getReports(token).then(data => {
      if (data.error) {
        console.log(data.error);
        setValues({ ...values, loading: false });
      } else {
        setValues({ ...values, loading: false, reports: data });
      }
    });
  }

  const onRemoveReport = report => e => {
    const answer = window.confirm(`Are you sure?`);

    if (answer) {
      removeReport(report._id, token).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          initReports();
        }
      })
    }
  }

  const onRemoveBlogPost = blog => e => {
    const answer = window.confirm(`Are you sure you want to remove ${blog.title}?`);

    if (answer) {
      removeBlog(blog.slug, token).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          initReports();
        }
      });
    }
  }

  const showReports = () => (
    reports.map(report => (
      <ReportItem>
        <img style={{ borderRadius: 5, width: 50, marginRight: 20 }} src={`${API}/blog/photo/${report.blog.slug}`} alt={report.blog.title} />
        <Link href={`/${report.blog.slug}`}>
          <DefaultLink>
            <h5 className="m-0 pr-2">{report.blog.title.length > 18 ? report.blog.title.substring(0, 18) + '..' : report.blog.title}</h5>
          </DefaultLink>
        </Link>

        <p className="m-0 text-muted flex-grow-1"><i>({report.name})</i></p>

        <div className="mr-4">
          <p className="mb-1 text-muted">Posted by:</p>
          <div className="d-flex align-items-center">
            <img style={{ borderRadius: '50%', width: 50, marginRight: 10 }} src={`${API}/user/photo/${report.blog.postedBy.uniqueUsername}`} />
            <Link href={`/profile/${report.blog.postedBy.uniqueUsername}`}><DefaultLink>{report.blog.postedBy.username}</DefaultLink></Link>
          </div>
        </div>

        <Button onClick={onRemoveBlogPost(report.blog)} className="mr-4" color="danger" outline>Delete post</Button>

        <div className="mr-4">
          <p className="mb-1 text-muted">Reported by:</p>
          <div className="d-flex align-items-center">
            <img style={{ borderRadius: '50%', width: 30, marginRight: 10 }} src={`${API}/user/photo/${report.reportedBy.uniqueUsername}`} />
            <Link href={`/profile/${report.reportedBy.uniqueUsername}`}><DefaultLink>{report.reportedBy.username}</DefaultLink></Link>
          </div>
        </div>


        <SecondaryButton onClick={onRemoveReport(report)} style={{borderRadius: '50%'}}>X</SecondaryButton>
      </ReportItem>
    ))
  )

  const showLoading = () => loading && <Loading/>

  return (
    <>
      {showLoading()}
      <p>Total: {reports.length}</p>
      <ul>
        {showReports()}
      </ul>
    </>
  );
}

export default ReportsList;