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
    image: 'https://ui-avatars.com/api/?name=John+Doe&background=00bcd4&color=fff&size=128',
    medicalRecords: [
      {
        id: 1,
        date: '2026-01-15',
        doctor: 'Dr. Sarah Johnson',
        specialization: 'Cardiologist',
        diagnosis: 'Hypertension Stage 1',
        prescription: 'Lisinopril 10mg once daily',
        notes: 'Patient advised to reduce salt intake and exercise regularly. Follow-up in 3 months.',
        vitals: {
          bloodPressure: '140/90 mmHg',
          heartRate: '78 bpm',
          temperature: '98.4°F',
          weight: '180 lbs'
        }
      },
      {
        id: 2,
        date: '2025-11-20',
        doctor: 'Dr. Michael Chen',
        specialization: 'Neurologist',
        diagnosis: 'Tension Headache',
        prescription: 'Ibuprofen 400mg as needed',
        notes: 'Stress-related headaches. Recommended relaxation techniques.',
        vitals: {
          bloodPressure: '135/85 mmHg',
          heartRate: '72 bpm',
          temperature: '98.2°F',
          weight: '178 lbs'
        }
      },
      {
        id: 3,
        date: '2025-08-10',
        doctor: 'Dr. Sarah Johnson',
        specialization: 'Cardiologist',
        diagnosis: 'Routine Checkup',
        prescription: 'None',
        notes: 'Overall health is good. Continue healthy lifestyle.',
        vitals: {
          bloodPressure: '130/80 mmHg',
          heartRate: '75 bpm',
          temperature: '98.6°F',
          weight: '175 lbs'
        }
      }
    ],
    allergies: ['Penicillin', 'Dust mites'],
    chronicConditions: ['Hypertension', 'High Cholesterol']
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
    image: 'https://ui-avatars.com/api/?name=Jane+Smith&background=2196f3&color=fff&size=128',
    medicalRecords: [
      {
        id: 1,
        date: '2026-02-10',
        doctor: 'Dr. Emily Rodriguez',
        specialization: 'Pediatrician',
        diagnosis: 'Annual Wellness Visit',
        prescription: 'Vitamin D3 1000IU daily',
        notes: 'Patient is in good health. Recommended maintaining balanced diet.',
        vitals: {
          bloodPressure: '120/75 mmHg',
          heartRate: '68 bpm',
          temperature: '98.4°F',
          weight: '135 lbs'
        }
      },
      {
        id: 2,
        date: '2025-09-15',
        doctor: 'Dr. Lisa Anderson',
        specialization: 'Dermatologist',
        diagnosis: 'Mild Acne',
        prescription: 'Benzoyl Peroxide 5% gel',
        notes: 'Follow skincare routine. Avoid oily products.',
        vitals: {
          bloodPressure: '118/72 mmHg',
          heartRate: '70 bpm',
          temperature: '98.2°F',
          weight: '132 lbs'
        }
      }
    ],
    allergies: ['Shellfish'],
    chronicConditions: []
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
    image: 'https://ui-avatars.com/api/?name=David+Brown&background=00bcd4&color=fff&size=128',
    medicalRecords: [
      {
        id: 1,
        date: '2026-01-28',
        doctor: 'Dr. James Wilson',
        specialization: 'Orthopedic',
        diagnosis: 'Chronic Lower Back Pain',
        prescription: 'Naproxen 500mg twice daily, Physical Therapy',
        notes: 'MRI recommended if pain persists. Patient works desk job - ergonomic assessment needed.',
        vitals: {
          bloodPressure: '138/88 mmHg',
          heartRate: '80 bpm',
          temperature: '98.6°F',
          weight: '210 lbs'
        }
      },
      {
        id: 2,
        date: '2025-10-05',
        doctor: 'Dr. Sarah Johnson',
        specialization: 'Cardiologist',
        diagnosis: 'Type 2 Diabetes - Well Controlled',
        prescription: 'Metformin 500mg twice daily',
        notes: 'HbA1c at 6.5%. Continue current medication and diet plan.',
        vitals: {
          bloodPressure: '132/82 mmHg',
          heartRate: '76 bpm',
          temperature: '98.4°F',
          weight: '205 lbs'
        }
      },
      {
        id: 3,
        date: '2025-06-12',
        doctor: 'Dr. Robert Taylor',
        specialization: 'General Physician',
        diagnosis: 'Upper Respiratory Infection',
        prescription: 'Amoxicillin 500mg three times daily',
        notes: 'Viral infection. Rest and fluids recommended.',
        vitals: {
          bloodPressure: '128/80 mmHg',
          heartRate: '82 bpm',
          temperature: '101.2°F',
          weight: '208 lbs'
        }
      }
    ],
    allergies: ['Sulfa drugs', 'Latex'],
    chronicConditions: ['Type 2 Diabetes', 'Lower Back Pain', 'Obesity']
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
    image: 'https://ui-avatars.com/api/?name=Maria+Garcia&background=2196f3&color=fff&size=128',
    medicalRecords: [
      {
        id: 1,
        date: '2026-02-05',
        doctor: 'Dr. Emily Rodriguez',
        specialization: 'Pediatrician',
        diagnosis: 'Prenatal Checkup - 28 Weeks',
        prescription: 'Prenatal vitamins, Iron supplements',
        notes: 'Pregnancy progressing well. Ultrasound shows healthy fetus. Recommended prenatal classes.',
        vitals: {
          bloodPressure: '115/70 mmHg',
          heartRate: '72 bpm',
          temperature: '98.2°F',
          weight: '145 lbs'
        }
      },
      {
        id: 2,
        date: '2025-12-10',
        doctor: 'Dr. Robert Taylor',
        specialization: 'General Physician',
        diagnosis: 'Pregnancy Confirmed',
        prescription: 'Folic Acid 400mcg daily',
        notes: 'Confirmed pregnancy at 8 weeks. Referred to OB/GYN for prenatal care.',
        vitals: {
          bloodPressure: '118/72 mmMHz',
          heartRate: '70 bpm',
          temperature: '98.4°F',
          weight: '130 lbs'
        }
      },
      {
        id: 3,
        date: '2025-07-20',
        doctor: 'Dr. Lisa Anderson',
        specialization: 'Dermatologist',
        diagnosis: 'Eczema',
        prescription: 'Hydrocortisone cream 1%, Moisturizer',
        notes: 'Mild eczema on arms. Identified triggers: stress, certain soaps.',
        vitals: {
          bloodPressure: '116/74 mmHg',
          heartRate: '68 bpm',
          temperature: '98.4°F',
          weight: '128 lbs'
        }
      }
    ],
    allergies: ['Peanuts', 'Eggs'],
    chronicConditions: ['Eczema']
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
  completedAppointments: 1
};

export const appointmentStatsByMonth = [
  { month: 'Jan', appointments: 45 },
  { month: 'Feb', appointments: 52 },
  { month: 'Mar', appointments: 38 },
  { month: 'Apr', appointments: 61 },
  { month: 'May', appointments: 55 },
  { month: 'Jun', appointments: 48 }
];
