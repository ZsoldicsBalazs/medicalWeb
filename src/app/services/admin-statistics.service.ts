import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { AdminStatistics } from '../domain/admin-statistics.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminStatisticsService {
  
  private apiUrl = `${environment.apiBaseUrl}/admin/statistics`;

  constructor(private http: HttpClient) { }

  /**
   * Get comprehensive admin statistics from backend
   * @returns Observable<AdminStatistics>
   */
  getAdminStatistics(): Observable<AdminStatistics> {
    return this.http.get<AdminStatistics>(this.apiUrl).pipe(
      catchError(this.handleError<AdminStatistics>('getAdminStatistics', this.getEmptyStatistics()))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed:`, error);
      
      // Let the app keep running by returning an empty result
      return of(result as T);
    };
  }

  /**
   * Returns empty statistics in case of error
   * @returns AdminStatistics with all zeros
   */
  private getEmptyStatistics(): AdminStatistics {
    return {
      totalUsers: 0,
      totalDoctors: 0,
      totalPatients: 0,
      totalSecretaries: 0,
      totalAppointments: 0,
      totalConsultations: 0,
      monthlyAppointments: 0,
      dailyRegistrations: 0,
      averageConsultationTime: 0,
      systemUptime: 'N/A',
      completedAppointments: 0,
      cancelledAppointments: 0,
      pendingAppointments: 0
    };
  }
} 