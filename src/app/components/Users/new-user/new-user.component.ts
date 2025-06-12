import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  FormGroup,
  Validators,
} from '@angular/forms';
import { UserService } from '../../../services/users/user.service';
import { User } from '../../../models/users/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css'],
})
export class NewUserComponent implements OnInit {
  private fb = inject(FormBuilder);
  private userService = inject(UserService);

  userForm: FormGroup | undefined;
  isEditMode = false;

  ngOnInit(): void {
    this.userForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNo: ['', Validators.required],
      profession: [''],
      memberType: [''],
      personalDetails: [''],
      registered: [new Date()],
      addedBy: [''],
      isActive: [true],
      isRemoved: [false],
    });
  }

  submitForm() {
    const user: User = this.userForm?.value;

    if (this.isEditMode && user.id) {
      this.userService.updateUser(user).then(() => {
        console.log('User updated');
        this.userForm?.reset();
      });
    } else {
      this.userService.addUser(user).then(() => {
        console.log('User added');
        this.userForm?.reset();
      });
    }
  }

  loadUser(user: User) {
    this.userForm?.patchValue(user);
    this.isEditMode = true;
  }

  deleteUser() {
    const user: User = this.userForm?.value;
    if (user.id) {
      this.userService.deleteUser(user).then(() => {
        console.log('User soft-deleted');
        this.userForm?.reset();
        this.isEditMode = false;
      });
    }
  }
}
