import { Component } from '@angular/core';
import { AlertController, ViewWillEnter } from '@ionic/angular';
import { DataService, InventoryItem } from '../services/data.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements ViewWillEnter {

  // Stores all inventory items retrieved from the API
  items: InventoryItem[] = [];
  searchName: string = '';

  constructor(
    private dataService: DataService, 
    private alertCtrl: AlertController
  ) {}

  /**
   * Ionic lifecycle hook: Triggered every time the page is about to become active.
   * This ensures that whenever the user navigates back from adding a new item,
   * the list refreshes automatically without requiring a manual page reload.
   */
  ionViewWillEnter() {
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
    // Show all items again if search input is empty
    if (!this.searchName || this.searchName.trim() === '') {
      this.loadItems(); 
      return;
    }

    this.dataService.getItem(this.searchName.trim()).subscribe({
      next: (data) => {
        // Ensure data is always displayed as an array 
        // (handles both single object and array responses from API)
        this.items = Array.isArray(data) ? data : [data];
      },
      error: (err) => {
        console.log('Item not found', err);
        // Clear list if item is not found
        this.items = []; 
      }
    });
  }

  // Show help message to the user
  async showHelp() {
    const alert = await this.alertCtrl.create({
      header: 'Help',
      message: 'Use this page to view all inventory items or search by exact item name.',
      buttons: ['OK']
    });

    await alert.present();
  }
}