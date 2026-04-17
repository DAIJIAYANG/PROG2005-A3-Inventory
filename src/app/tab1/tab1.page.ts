import { Component, OnInit } from '@angular/core';
import { DataService, InventoryItem } from '../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {
  items: InventoryItem[] = [];
  searchName: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.dataService.getAllItems().subscribe({
      next: (data) => {
        this.items = data;
        console.log('DATA FROM API:', data);
      },
      error: (err) => {
        console.log('Error fetching items', err);
      }
    });
  }
}