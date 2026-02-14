import Navbar from '../components/Navbar';
import { Stethoscope, Heart, Brain, Baby, Bone, Eye, Microscope } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      icon: Heart,
      title: 'Cardiology',
      description: 'Comprehensive heart care and cardiovascular treatments'
    },
    {
      icon: Brain,
      title: 'Neurology',
      description: 'Expert care for brain and nervous system disorders'
    },
    {
      icon: Baby,
      title: 'Pediatrics',
      description: 'Specialized healthcare for infants, children, and adolescents'
    },
    {
      icon: Bone,
      title: 'Orthopedics',
      description: 'Treatment for bone, joint, and muscle conditions'
    },
    {
      icon: Eye,
      title: 'Ophthalmology',
      description: 'Eye care and vision correction services'
    },
    {
      icon: Stethoscope,
      title: 'General Medicine',
      description: 'Primary healthcare and preventive medicine'
    },
    {
      icon: Microscope,
      title: 'Laboratory Services',
      description: 'Advanced diagnostic testing and analysis'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Medical Services
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive healthcare services delivered by experienced medical professionals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="card text-center hover:shadow-lg transition-shadow">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-primary-100 rounded-full mb-6">
                  <Icon className="h-10 w-10 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
