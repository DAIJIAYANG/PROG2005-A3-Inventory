import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService, InventoryItem } from '../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  // Stores all inventory items retrieved from the API
  items: InventoryItem[] = [];
  searchName: string = '';

  constructor(private dataService: DataService, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.loadItems();
  }

  // Fetch all items from the server and display them
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

  // Search for an item by exact name
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

  // Show help message to user
async showHelp() {
  const alert = await this.alertCtrl.create({
    header: 'Help',
    message: 'Use this page to view all inventory items or search by exact item name.',
    buttons: ['OK']
  });

  await alert.present();
}
}