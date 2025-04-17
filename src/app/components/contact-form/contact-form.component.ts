import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Contact } from '../../models/contact.model';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-contact-form',
  template: `
    <form [formGroup]="contactForm" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label>First Name:</label>
        <input type="text" formControlName="fName" required>
      </div>
      
      <div class="form-group">
        <label>Last Name:</label>
        <input type="text" formControlName="lName" required>
      </div>
      
      <div class="form-group">
        <label>Phone Number:</label>
        <input type="text" formControlName="phoneNumber" required>
      </div>
      
      <div class="form-group">
        <label>Email (optional):</label>
        <input type="email" formControlName="email">
      </div>
      
      <div class="buttons">
        <button type="button" (click)="onCancel.emit()">Cancel</button>
        <button type="submit" [disabled]="!contactForm.valid">Save</button>
      </div>
    </form>
  `,
  styles: [`
    .form-group {
      margin-bottom: 1rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
    }
    input {
      width: 100%;
      padding: 0.5rem;
    }
    .buttons {
      margin-top: 1rem;
      display: flex;
      gap: 0.5rem;
    }
    button {
      padding: 0.5rem 1rem;
    }
  `]
})
export class ContactFormComponent {
  @Input() contact?: Contact;
  @Output() onSubmitForm = new EventEmitter<Contact>();
  @Output() onCancel = new EventEmitter<void>();

  contactForm = new FormGroup({
    fName: new FormControl('', Validators.required),
    lName: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    email: new FormControl('')
  });

  ngOnInit() {
    if (this.contact) {
      this.contactForm.patchValue(this.contact);
    }
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.onSubmitForm.emit(this.contactForm.value as Contact);
    }
  }
}