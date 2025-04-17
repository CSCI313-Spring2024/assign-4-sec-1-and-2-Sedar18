import { Component, inject } from '@angular/core';
import { ContactService } from './services/contact.service';
import { ContactCardComponent } from './components/contact-card/contact-card.component';
import { ContactFormComponent } from './components/contact-form/contact-form.component';
import { CommonModule } from '@angular/common';
import { Contact } from './models/contact.model';

@Component({
  standalone: true,
  imports: [CommonModule, ContactCardComponent, ContactFormComponent],
  selector: 'app-root',
  template: `
    <h1>Contact Manager</h1>
    
    <button (click)="showAddForm()">Add Contact</button>
    
    <app-contact-form
      *ngIf="showForm"
      [contact]="contactToEdit"
      (onSubmitForm)="saveContact($event)"
      (onCancel)="cancelForm()"
    ></app-contact-form>
    
    <app-contact-card 
      *ngFor="let contact of contacts(); let i = index"
      [contact]="contact"
      (edit)="editContact(i)"
      (delete)="deleteContact(i)"
    ></app-contact-card>
  `,
  styles: [`
    button { margin-bottom: 1rem; padding: 0.5rem; }
  `]
})
export class AppComponent {
  private contactService = inject(ContactService);
  contacts = this.contactService.getContacts();
  
  showForm = false;
  contactToEdit?: Contact;
  editIndex?: number;

  showAddForm() {
    this.contactToEdit = undefined;
    this.showForm = true;
  }

  editContact(index: number) {
    this.contactToEdit = this.contacts()[index];
    this.editIndex = index;
    this.showForm = true;
  }

  saveContact(contact: Contact) {
    if (this.editIndex !== undefined) {
      this.contactService.updateContact(this.editIndex, contact);
    } else {
      this.contactService.addContact(contact);
    }
    this.cancelForm();
  }

  deleteContact(index: number) {
    if (confirm('Delete this contact?')) {
      this.contactService.deleteContact(index);
    }
  }

  cancelForm() {
    this.showForm = false;
    this.contactToEdit = undefined;
    this.editIndex = undefined;
  }
}