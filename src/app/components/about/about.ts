import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  template: `
<div class="about-container">
  <!--h1>Acerca de</h1-->
  
  <mat-card class="profile-card">
    <mat-card-content>
      <div class="profile-content">
        <div class="profile-header">
          <img [src]="profile.photo" [alt]="profile.name" class="profile-photo">
          <div class="profile-info">
            <h2>{{profile.name}}</h2>
            <p class="role">{{profile.role}}</p>
          </div>
        </div>

        <div class="profile-section">
          <h3><mat-icon>person</mat-icon> Sobre mí</h3>
          <p>{{profile.about}}</p>
        </div>

        <div class="profile-section">
          <h3><mat-icon>contact_mail</mat-icon> Información de Contacto</h3>
          <div class="contact-info">
            <div class="contact-item">
              <mat-icon>email</mat-icon>
              <span>{{profile.email}}</span>
            </div>
            <div class="contact-item">
              <mat-icon>phone</mat-icon>
              <span>{{profile.phone}}</span>
            </div>
            <div class="contact-item">
              <mat-icon>location_on</mat-icon>
              <span>{{profile.location}}</span>
            </div>
          </div>
        </div>

        <div class="profile-section">
          <h3><mat-icon>code</mat-icon> Habilidades</h3>
          <div class="skills">
            <mat-chip *ngFor="let skill of profile.skills">{{skill}}</mat-chip>
          </div>
        </div>

        <div class="profile-section">
          <h3><mat-icon>work</mat-icon> Experiencia</h3>
          <div class="experience">
            <div class="experience-item" *ngFor="let exp of profile.experience">
              <div class="exp-year">{{exp.year}}</div>
              <div class="exp-details">
                <strong>{{exp.position}}</strong>
                <p class="company">{{exp.company}}</p>
                <p class="description" *ngIf="exp.description">{{exp.description}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </mat-card-content>
  </mat-card>
</div>
  `,
  styles: [`
.about-container {
  max-width: 900px;
  margin: 0 auto;
}

.about-container h1 {
  font-size: 28px;
  margin-bottom: 20px;
  font-weight: 500;
}

.profile-content {
  padding: 20px;
}

.profile-header {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e0e0e0;
}

.profile-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.profile-info h2 {
  margin: 0 0 8px 0;
  font-size: 32px;
}

.role {
  color: #666;
  font-size: 18px;
  margin: 0;
}

.profile-section {
  margin-bottom: 30px;
}

.profile-section h3 {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #3f51b5;
  margin-bottom: 15px;
  font-size: 20px;
}

.profile-section h3 mat-icon {
  font-size: 24px;
  height: 24px;
  width: 24px;
}

.profile-section p {
  line-height: 1.6;
  color: #555;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #555;
}

.contact-item mat-icon {
  color: #3f51b5;
}

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.skills mat-chip {
  background-color: #e3f2fd;
  color: #1976d2;
}

.experience-item {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f0f0f0;
}

.experience-item:last-child {
  border-bottom: none;
}

.exp-year {
  min-width: 120px;
  color: #3f51b5;
  font-weight: 500;
}

.exp-details strong {
  display: block;
  margin-bottom: 4px;
  color: #333;
}

.exp-details .company {
  margin: 4px 0;
  color: #3f51b5;
  font-weight: 500;
}

.exp-details .description {
  margin: 8px 0 0 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
}

@media (max-width: 768px) {
  .profile-header {
    flex-direction: column;
    text-align: center;
  }
  
  .experience-item {
    flex-direction: column;
    gap: 10px;
  }
}
  `]
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