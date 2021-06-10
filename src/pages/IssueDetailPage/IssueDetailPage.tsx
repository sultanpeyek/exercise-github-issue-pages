import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import IssuesDataService from '../../services/IssuesDataService';

const IssueDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const [detail, setDetail] = useState<any>({});
  useEffect(() => {
    retrieveIssueDetail(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const retrieveIssueDetail = (id: any) => {
    IssuesDataService.getIssueDetail(id)
      .then(response => {
        setDetail(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      Issue Detail Page 
      <div>{detail.title}</div><br/><br/>
      <div>{detail.body}</div><br/><br/>
      <small>
        <Link to={'/'}>(Back to home)</Link>
      </small>
    </div>
  );
};

export default IssueDetailPage;
