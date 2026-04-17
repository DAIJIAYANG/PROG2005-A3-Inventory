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

  searchItem() {
    if (!this.searchName || this.searchName.trim() === '') {
      this.loadItems(); // show all items again
      return;
    }

    this.dataService.getItem(this.searchName).subscribe({
      next: (data) => {
        this.items = Array.isArray(data) ? data : [data]; // show only one result
      },
      error: (err) => {
        console.log('Item not found', err);
        this.items = []; // clear list if not found
      }
    });
  }
}