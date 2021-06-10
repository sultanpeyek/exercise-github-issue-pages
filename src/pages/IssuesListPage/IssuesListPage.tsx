import React, { useState, useEffect } from 'react';
import IssuesDataService from '../../services/IssuesDataService';

import style from './IssuesListPage.module.css';

import InputField from '../../components/InputField/InputField';
import Button from '../../components/Button/Button';
import DropdownMenu from '../../components/DropdownMenu/DropdownMenu';
import Pagination from '../../components/Pagination/Pagination';
import IssueItem from '../../containers/IssueItem/IssueItem';

const IssuesListPage = () => {
  const [repoInfo, setRepoInfo] = useState<any>({});
  const [issues, setIssues] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [issuesPerPage] = useState(10);

  const [loading, setLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [query, setQuery] = useState('is:issue is:open');

  useEffect(() => {
    retrieveRepoInfo();
    retrieveIssues(currentPage);
  }, [currentPage, isSearching]); // eslint-disable-line react-hooks/exhaustive-deps

  const retrieveRepoInfo = () => {
    setLoading(true);
    IssuesDataService.getRepoDetail()
      .then(response => {
        setRepoInfo({
          full_name: response.data.full_name,
          open_issues_count: response.data.open_issues_count,
        });
        setLoading(false);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const retrieveIssues = (currentPage: number) => {
    setLoading(true);
    if (isSearching) {
      IssuesDataService.getSearchResult(query, currentPage)
        .then(response => {
          const issuesData: any = response.data.items.map((item: any) => {
            return {
              title: item.title,
              number: item.number,
              login: item.user.login,
              state: item.state,
            };
          });
          setIssues(issuesData);
          setLoading(false);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      IssuesDataService.getAll(currentPage)
        .then(response => {
          const issuesData: any = response.data.map((item: any) => {
            return {
              title: item.title,
              number: item.number,
              login: item.user.login,
              state: item.state,
            };
          });
          setIssues(issuesData);
          setLoading(false);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };

  const handleInputFieldChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      setIsSearching(true);
      retrieveIssues(1);
      setCurrentPage(1);
    }
  };

  const handleButtonClick = () => {
    setIsSearching(true);
    retrieveIssues(1);
    setCurrentPage(1);
  };

  const handleFilterClick = (status: any) => {
    return true;
  };

  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className={style.IssuesListPage__Title}>{repoInfo.full_name}</div>
      <div className={style.IssuesListPage__FormControl}>
        <DropdownMenu title="Filter" headerClassName={style.IssuesListPage__Filter}>
          <ul>
            <li onClick={() => handleFilterClick(false)}>Open issues</li>
            <li onClick={() => handleFilterClick(true)}>Closed issues</li>
          </ul>
        </DropdownMenu>
        <InputField
          value={query}
          className={style.IssuesListPage__InputField}
          onChange={handleInputFieldChange}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={handleButtonClick} />
      </div>
      {loading ? (
        <div className={style.LoadingState}>Loading . . .</div>
      ) : (
        <div className={style.IssuesListPage}>
          {issues?.length > 0 && issues.map((item, index) => <IssueItem item={item} key={index} />)}
        </div>
      )}
      <Pagination
        issuesPerPage={issuesPerPage}
        totalIssues={repoInfo.open_issues_count}
        paginate={paginate}
        currentPage={currentPage}
        pageNeighbors={4}
      />
    </>
  );
};

export default IssuesListPage;
