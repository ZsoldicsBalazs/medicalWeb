import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdminStatisticsService } from '../../services/admin-statistics.service';
import { AdminStatistics } from '../../domain/admin-statistics.model';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrl: './admin-statistics.component.css',
  providers: [MessageService]
})
export class AdminStatisticsComponent implements OnInit {

  // Admin-specific statistics data
  totalUsers: number = 0;
  totalDoctors: number = 0;
  totalPatients: number = 0;
  totalSecretaries: number = 0;
  totalAppointments: number = 0;
  totalConsultations: number = 0;

  // Detailed appointment statistics
  completedAppointments: number = 0;
  cancelledAppointments: number = 0;
  pendingAppointments: number = 0;

  // System performance metrics
  systemStats = {
    dailyRegistrations: 0,
    monthlyAppointments: 0,
    averageConsultationTime: 0,
    systemUptime: '99.9%'
  };

  // Loading state
  loading: boolean = true;

  constructor(
    private messageService: MessageService,
    private notificationService: NotificationService,
    private adminStatisticsService: AdminStatisticsService
  ) { }

  ngOnInit(): void {
    this.loadAdminStatistics();
  }

  private loadAdminStatistics(): void {
    this.loading = true;
    
    this.adminStatisticsService.getAdminStatistics().subscribe({
      next: (data: AdminStatistics) => {
        this.updateStatistics(data);
        this.loading = false;
        this.notificationService.success('Statistics Loaded', 'Admin statistics loaded successfully');
        
      },
      error: (error) => {
        console.error('Error loading admin statistics:', error);
        this.loading = false;
        this.notificationService.warning('Error Loading Statistics', 'Failed to load admin statistics. Using default values.');
        
        
        // Use default values in case of error
        this.setDefaultStatistics();
      }
    });
  }

  private updateStatistics(data: AdminStatistics): void {
    // Update main statistics
    this.totalUsers = data.totalUsers;
    this.totalDoctors = data.totalDoctors;
    this.totalPatients = data.totalPatients;
    this.totalSecretaries = data.totalSecretaries;
    this.totalAppointments = data.totalAppointments;
    this.totalConsultations = data.totalConsultations;

    // Update detailed appointment statistics
    this.completedAppointments = data.completedAppointments;
    this.cancelledAppointments = data.cancelledAppointments;
    this.pendingAppointments = data.pendingAppointments;

    // Update system stats
    this.systemStats = {
      dailyRegistrations: data.dailyRegistrations,
      monthlyAppointments: data.monthlyAppointments,
      averageConsultationTime: data.averageConsultationTime,
      systemUptime: data.systemUptime
    };
  }

  private setDefaultStatistics(): void {
    // Fallback values in case of API error
    this.totalUsers = 0;
    this.totalDoctors = 0;
    this.totalPatients = 0;
    this.totalSecretaries = 0;
    this.totalAppointments = 0;
    this.totalConsultations = 0;

    // Reset detailed appointment statistics
    this.completedAppointments = 0;
    this.cancelledAppointments = 0;
    this.pendingAppointments = 0;

    this.systemStats = {
      dailyRegistrations: 0,
      monthlyAppointments: 0,
      averageConsultationTime: 0,
      systemUptime: 'N/A'
    };
  }

  // Refresh statistics manually
  refreshStatistics(): void {
    this.loadAdminStatistics();
  }

  // Calculate completion rate percentage
  getCompletionRate(): number {
    if (this.totalAppointments === 0) {
      return 0;
    }
    return Math.round((this.completedAppointments / this.totalAppointments) * 100);
  }

  // Admin Action Methods
  exportUserReport(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Export Started',
      detail: 'User report export has been initiated.'
    });
    // TODO: Implement actual export functionality
  }

  viewSystemLogs(): void {
    this.messageService.add({
      severity: 'info',
      summary: 'System Logs',
      detail: 'Opening system logs viewer...'
    });
    // TODO: Implement system logs viewer
  }

  backupDatabase(): void {
    this.messageService.add({
      severity: 'warn',
      summary: 'Backup Started',
      detail: 'Database backup process initiated. This may take a few minutes.'
    });
    // TODO: Implement database backup functionality
  }

  sendNotification(): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Notification',
      detail: 'System-wide notification sent to all users.'
    });
    // TODO: Implement notification system
  }

} 