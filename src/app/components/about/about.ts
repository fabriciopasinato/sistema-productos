import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MaterialModule]
  
})
export class AboutComponent {
  profile = {
    name: 'Fabricio Pasinato',
    role: 'Analista desarrollador',
    email: 'fpasinato6@gmail.com',
    phone: '+54 9 3466 410000',
    location: 'Rosario, Santa Fe, Argentina',
    photo: 'https://media.licdn.com/dms/image/v2/D4D03AQEJ9pyWU6mYOQ/profile-displayphoto-shrink_200_200/profile-displayphoto-shrink_200_200/0/1715135571960?e=1764201600&v=beta&t=MXZnnedZd9PAKK5UFWisLECIRjBx1v1L5E_MNhI1L3I',
    about: 'Actualmente trabajo en desarrollo y análisis de software, combinando mi experiencia en empresas tecnológicas con proyectos freelance. Ayudo a organizaciones a optimizar procesos mediante soluciones digitales personalizadas. Mi enfoque proactivo y capacidad para trabajar en equipo me permiten adaptarme a nuevos desafíos y ofrecer soluciones técnicas creativas. Estoy en búsqueda de nuevas oportunidades que me permitan seguir creciendo, superándome y contribuyendo a proyectos innovadores.',
    skills: ['Python', ' PHP', 'JavaScript', 'HTML/CSS', '.NET', 'Power BI/Qlik', 'SQL','Java'],
    experience: [
      { 
        year: '03/2025 - Actualidad', 
        position: 'Profesor/Asistente de espacio de tecnología', 
        company: 'Universidad del Gran Rosario',
        description: 'Profesor adjunto del seminario de actualización I. Profesor adjunto de la cátedra herramientas de software. Asistente de espacio de tecnología.'
      },
      { 
        year: '07/2024 - Actualidad', 
        position: 'Analista desarrollador', 
        company: 'Express Telecomunicaciones',
        description: 'Desarrollo y mantenimiento de Software. Análisis y control de sistemas.'
      },
      { 
        year: '11/2020 - Actualidad', 
        position: 'Desarrollo de Software', 
        company: 'Freelance',
        description: 'Mantenimiento y administración de servicios en la nube. Creación de desarrollo de software a medida para diversas organizaciones (sistemas de gestión, contables, E-commerce, automatizaciones, aplicaciones móviles y sitios web).'
      },
      { 
        year: '08/2021 - 07/2024', 
        position: 'Product analyst/Desarrollador Full Stack', 
        company: 'Grupo América',
        description: 'Desarrollo y control de los productos digitales del grupo (desarrollos ligados al agro, mercado de capitales y sistemas contables). Soporte y mantenimiento de la infraestructura de los productos digitales.'
      },
      { 
        year: '03/2021 - 08/2021', 
        position: 'Desarrollador de Software', 
        company: 'Brandom',
        description: 'Automatizaciones y creación de E-commerce.'
      },
      { 
        year: '12/2020 - 02/2021', 
        position: 'Desarrollador de Software', 
        company: 'Shirley Ing',
        description: 'Desarrollo de aplicaciones móviles (Android) y automatizaciones de tareas con Python.'
      }
    ]
  };
}