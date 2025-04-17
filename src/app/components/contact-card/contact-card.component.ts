import { Component, Input, output } from '@angular/core';
import { Contact } from '../../models/contact.model';

@Component({
  standalone: true,
  selector: 'app-contact-card',
  template: `
    <div class="card">
      <h3>{{ contact.fName }} {{ contact.lName }}</h3>
      <p>Phone: {{ contact.phoneNumber }}</p>
      <p *ngIf="contact.email">Email: {{ contact.email }}</p>
      <div class="buttons">
        <button (click)="edit.emit()">Edit</button>
        <button (click)="delete.emit()">Delete</button>
      </div>
    </div>
  `,
  styles: [`
    .card { 
      border: 1px solid #ddd; 
      padding: 1rem; 
      margin-bottom: 1rem; 
    }
    .buttons { margin-top: 0.5rem; }
    button { margin-right: 0.5rem; }
  `]
})
export class ContactCardComponent {
  @Input() contact!: Contact;
  edit = output<void>();
  delete = output<void>();
}