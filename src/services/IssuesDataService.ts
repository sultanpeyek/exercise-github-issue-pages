import http from './http-common';

class IssuesDataService {
  getRepoDetail() {
    return http.get('/repos/angular/angular');
  }
  getAll(currentPage: number) {
    return http.get(`/repos/angular/angular/issues?per_page=10&page=${currentPage}`);
  }
  getIssueDetail(id: number) {
    return http.get(`/repos/angular/angular/issues/${id}`);
  }
  getSearchResult(query: string, currentPage: number) {
    return http.get(`/search/issues?per_page=10&page=${currentPage}&q=repo:angular/angular+${query.replace(' ', '+')}`);
  }
}

export default new IssuesDataService();
