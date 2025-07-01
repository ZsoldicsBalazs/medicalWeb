import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewsPost } from '../domain/news-post.model';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl = 'http://localhost:1212/api/v1/news';

  constructor(private http: HttpClient) {}

  getAllNews(): Observable<NewsPost[]> {
    return this.http.get<NewsPost[]>(this.apiUrl);
  }

  createNews(
    newsPost: Omit<NewsPost, 'id' | 'createdAt' | 'authorId' | 'authorName'>
  ): Observable<NewsPost> {
    return this.http.post<NewsPost>(this.apiUrl, newsPost);
  }

  updateNews(id: number, newsPost: Partial<NewsPost>): Observable<NewsPost> {
    return this.http.put<NewsPost>(`${this.apiUrl}/${id}`, newsPost);
  }

  deleteNews(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
