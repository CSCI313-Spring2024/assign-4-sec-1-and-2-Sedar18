import { Injectable, signal } from '@angular/core';
import { Contact } from '../models/contact.model';
import { CONTACTS } from '../../assets/contacts'; // Updated import

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts = signal<Contact[]>(CONTACTS); // Use the imported constant directly

  getContacts() {
    return this.contacts.asReadonly();
  }

  addContact(contact: Contact) {
    this.contacts.update(current => [...current, contact]);
  }

  updateContact(index: number, updatedContact: Contact) {
    this.contacts.update(current => 
      current.map((c, i) => i === index ? updatedContact : c)
    );
  }

  deleteContact(index: number) {
    this.contacts.update(current => 
      current.filter((_, i) => i !== index)
    );
  }
}