import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../services/users/user.service';
import { User } from '../../../models/users/user';

@Component({
  selector: 'app-userlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent implements OnInit {
  private userService = inject(UserService);

  users: User[] = [];

  // Form Model

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
