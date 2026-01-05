import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export interface CrudPost {
  id?: number;
  name: string;
  comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private apiUrl = '/crud';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders(): HttpHeaders {
    return this.authService.getAuthHeaders();
  }

  getAllPosts(): Observable<CrudPost[]> {
    return this.http.get<CrudPost[]>(`${this.apiUrl}/fetch`, { headers: this.getHeaders() });
  }

  getPostById(id: number): Observable<CrudPost> {
    return this.http.get<CrudPost>(`${this.apiUrl}/id/${id}`, { headers: this.getHeaders() });
  }

  createPost(post: Omit<CrudPost, 'id'>): Observable<CrudPost> {
    return this.http.post<CrudPost>(`${this.apiUrl}/addCrud`, post, { headers: this.getHeaders() });
  }

  updatePost(id: number, post: Omit<CrudPost, 'id'>): Observable<CrudPost> {
    return this.http.put<CrudPost>(`${this.apiUrl}/update/${id}`, post, { headers: this.getHeaders() });
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers: this.getHeaders() });
  }
}
