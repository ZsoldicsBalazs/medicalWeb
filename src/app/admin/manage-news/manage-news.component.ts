import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsService } from '../../services/news.service';
import { NewsPost } from '../../domain/news-post.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-manage-news',
  templateUrl: './manage-news.component.html',
  styleUrls: ['./manage-news.component.css'],
  providers: [MessageService]
})
export class ManageNewsComponent implements OnInit {
  news: NewsPost[] = [];
  newsForm: FormGroup;
  loading: boolean = true;
  displayDialog: boolean = false;
  editingNews: NewsPost | null = null;

  constructor(
    private newsService: NewsService,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    this.newsForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

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
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load news'
        });
      }
    });
  }

  showDialog(news?: NewsPost): void {
    if (news) {
      this.editingNews = news;
      this.newsForm.patchValue({
        title: news.title,
        content: news.content
      });
    } else {
      this.editingNews = null;
      this.newsForm.reset();
    }
    this.displayDialog = true;
  }

  saveNews(): void {
    if (this.newsForm.invalid) return;

    const newsData = this.newsForm.value;
    
    if (this.editingNews) {
      this.newsService.updateNews(this.editingNews.id!, newsData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'News updated successfully'
          });
          this.loadNews();
          this.displayDialog = false;
        },
        error: (error) => {
          console.error('Error updating news:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to update news'
          });
        }
      });
    } else {
      this.newsService.createNews(newsData).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'News created successfully'
          });
          this.loadNews();
          this.displayDialog = false;
        },
        error: (error) => {
          console.error('Error creating news:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create news'
          });
        }
      });
    }
  }

  deleteNews(id: number): void {
    this.newsService.deleteNews(id).subscribe({
      next: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'News deleted successfully'
        });
        this.loadNews();
      },
      error: (error) => {
        console.error('Error deleting news:', error);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to delete news'
        });
      }
    });
  }
} 