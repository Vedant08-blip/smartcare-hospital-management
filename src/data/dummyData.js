// Dummy data for the Hospital Management System

export const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    email: 'sarah.johnson@smartcare.com',
    phone: '+1 234-567-8901',
    experience: '10 years',
    image: 'https://ui-avatars.com/api/?name=Sarah+Johnson&background=00bcd4&color=fff&size=128'
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialization: 'Neurologist',
    email: 'michael.chen@smartcare.com',
    phone: '+1 234-567-8902',
    experience: '8 years',
    image: 'https://ui-avatars.com/api/?name=Michael+Chen&background=2196f3&color=fff&size=128'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrician',
    email: 'emily.rodriguez@smartcare.com',
    phone: '+1 234-567-8903',
    experience: '12 years',
    image: 'https://ui-avatars.com/api/?name=Emily+Rodriguez&background=00bcd4&color=fff&size=128'
  },
  {
    id: 4,
    name: 'Dr. James Wilson',
    specialization: 'Orthopedic',
    email: 'james.wilson@smartcare.com',
    phone: '+1 234-567-8904',
    experience: '15 years',
    image: 'https://ui-avatars.com/api/?name=James+Wilson&background=2196f3&color=fff&size=128'
  },
  {
    id: 5,
    name: 'Dr. Lisa Anderson',
    specialization: 'Dermatologist',
    email: 'lisa.anderson@smartcare.com',
    phone: '+1 234-567-8905',
    experience: '7 years',
    image: 'https://ui-avatars.com/api/?name=Lisa+Anderson&background=00bcd4&color=fff&size=128'
  },
  {
    id: 6,
    name: 'Dr. Robert Taylor',
    specialization: 'General Physician',
    email: 'robert.taylor@smartcare.com',
    phone: '+1 234-567-8906',
    experience: '20 years',
    image: 'https://ui-avatars.com/api/?name=Robert+Taylor&background=2196f3&color=fff&size=128'
  }
];

export const patients = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+1 234-567-8910',
    age: 35,
    gender: 'Male',
    address: '123 Main St, City, State',
    bloodGroup: 'O+',
    image: 'https://ui-avatars.com/api/?name=John+Doe&background=00bcd4&color=fff&size=128'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    phone: '+1 234-567-8911',
    age: 28,
    gender: 'Female',
    address: '456 Oak Ave, City, State',
    bloodGroup: 'A+',
    image: 'https://ui-avatars.com/api/?name=Jane+Smith&background=2196f3&color=fff&size=128'
  },
  {
    id: 3,
    name: 'David Brown',
    email: 'david.brown@email.com',
    phone: '+1 234-567-8912',
    age: 42,
    gender: 'Male',
    address: '789 Pine Rd, City, State',
    bloodGroup: 'B+',
    image: 'https://ui-avatars.com/api/?name=David+Brown&background=00bcd4&color=fff&size=128'
  },
  {
    id: 4,
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1 234-567-8913',
    age: 31,
    gender: 'Female',
    address: '321 Elm St, City, State',
    bloodGroup: 'AB+',
    image: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=2196f3&color=fff&size=128'
  }
];

export const appointments = [
  {
    id: 1,
    patientId: 1,
    patientName: 'John Doe',
    doctorId: 1,
    doctorName: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    date: '2026-02-15',
    time: '10:00 AM',
    status: 'Pending',
    reason: 'Regular checkup'
  },
  {
    id: 2,
    patientId: 2,
    patientName: 'Jane Smith',
    doctorId: 2,
    doctorName: 'Dr. Michael Chen',
    specialization: 'Neurologist',
    date: '2026-02-15',
    time: '11:00 AM',
    status: 'Pending',
    reason: 'Headache consultation'
  },
  {
    id: 3,
    patientId: 3,
    patientName: 'David Brown',
    doctorId: 1,
    doctorName: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    date: '2026-02-14',
    time: '02:00 PM',
    status: 'Completed',
    reason: 'Follow-up appointment'
  },
  {
    id: 4,
    patientId: 4,
    patientName: 'Maria Garcia',
    doctorId: 3,
    doctorName: 'Dr. Emily Rodriguez',
    specialization: 'Pediatrician',
    date: '2026-02-16',
    time: '09:00 AM',
    status: 'Pending',
    reason: 'Child health checkup'
  },
  {
    id: 5,
    patientId: 1,
    patientName: 'John Doe',
    doctorId: 4,
    doctorName: 'Dr. James Wilson',
    specialization: 'Orthopedic',
    date: '2026-02-17',
    time: '03:00 PM',
    status: 'Pending',
    reason: 'Knee pain consultation'
  }
];

export const adminStats = {
  totalDoctors: doctors.length,
  totalPatients: patients.length,
  appointmentsToday: appointments.filter(apt => apt.date === '2026-02-15').length,
  totalAppointments: appointments.length,
  pendingAppointments: appointments.filter(apt => apt.status === 'Pending').length,
  completedAppointments: appointments.filter(apt => apt.status === 'Completed').length
};

export const appointmentStatsByMonth = [
  { month: 'Jan', appointments: 45 },
  { month: 'Feb', appointments: 52 },
  { month: 'Mar', appointments: 38 },
  { month: 'Apr', appointments: 61 },
  { month: 'May', appointments: 55 },
  { month: 'Jun', appointments: 48 }
];
