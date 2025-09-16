import { Component, signal, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, NgForm } from '@angular/forms';
import {MessageModule} from 'primeng/message';
import {User} from "../../models/user";
import { RadioButtonModule } from 'primeng/radiobutton';
import { ApiService } from './app.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    ButtonModule, 
    CardModule, 
    InputTextModule, 
    MessageModule, 
    FormsModule, 
    RadioButtonModule,
    CommonModule
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  constructor(private api: ApiService) {}
  
  ngOnInit() {
    this.api.getUsers().subscribe(data => {
      this.users = data;
    });
  }

  protected readonly title = signal('assignment');
  user: User = {
    name: '',
    email: '',
    telephone: '',
    gender: 'male'
  };

  users: User[] = [];
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Form is valid, proceed with submission logic
      this.api.addUser(this.user).subscribe((newUser) => {
        //Code to do when user is added
        this.api.getUsers().subscribe(data => {
          this.users = data;
          this.newuser();
        });
      }); 
    } else {
      // Form is invalid, display error messages or handle accordingly
      console.log('Form is invalid');
    }
    
  }
  onCancel() {
    console.log('Form Cancelled');
    this.newuser();
  }
  
  removeUser(userToRemove: User) {
    this.api.deleteUser(userToRemove).subscribe(() => {
      //Code to do when user is deleted
      this.api.getUsers().subscribe(data => {
        this.users = data;
      });
    });
  }

  newuser() {
    this.user = {
      name: '',
      email: '',
      telephone: '',
      gender: 'male'
    };
  }
}
