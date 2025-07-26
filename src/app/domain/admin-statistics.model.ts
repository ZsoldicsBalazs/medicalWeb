export interface AdminStatistics {
  totalUsers: number;
  totalDoctors: number;
  totalPatients: number;
  totalSecretaries: number;
  totalAppointments: number;
  totalConsultations: number;
  monthlyAppointments: number;
  dailyRegistrations: number;
  averageConsultationTime: number;
  systemUptime: string;
  
  // Additional metrics for admin dashboard
  completedAppointments: number;
  cancelledAppointments: number;
  pendingAppointments: number;
} 