import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../services/news.service';
import { NewsPost } from '../../domain/news-post.model';

@Component({
  selector: 'app-newsboard',
  templateUrl: './newsboard.component.html',
  styleUrls: ['./newsboard.component.css']
})
export class NewsboardComponent implements OnInit {
  news: NewsPost[] = [];
  loading: boolean = true;

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadNews();
  }

  loadNews(): void {
    this.loading = true;
    this.newsService.getAllNews().subscribe({
      next: (news) => {
        this.news = news.sort((a, b) => 
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading news:', error);
        this.loading = false;
      }
    });
  }
} 