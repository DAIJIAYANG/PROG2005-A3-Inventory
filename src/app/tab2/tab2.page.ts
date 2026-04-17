// Import Angular core and our data service
import { Component } from '@angular/core';
import { DataService, InventoryItem } from '../services/data.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  // Array to store featured items from API
  featuredItems: InventoryItem[] = [];

  // Form input variables (linked to HTML using ngModel)
  item_name: string = '';
  category: string = '';
  quantity: number | null = null;
  price: number | null = null;
  supplier_name: string = '';
  stock_status: string = '';
  featured_item: boolean = false;
  special_note: string = '';

  // Message shown to user after adding item
  message: string = '';

  constructor(private dataService: DataService) {
    // Load featured items when page loads
    this.loadFeaturedItems();
  }

  // Function to get all items and filter only featured ones
  loadFeaturedItems() {
    this.dataService.getAllItems().subscribe({
      next: (data) => {
        // Only keep items where featured_item = 1
        this.featuredItems = data.filter(item => item.featured_item === 1);
      },
      error: (err) => {
        console.log('Error loading featured items', err);
      }
    });
  }

  // Function to send new item to server (POST request)
  addItem() {

    // Basic validation (check required fields)
    if (
      this.item_name.trim() === '' ||
      this.category.trim() === '' ||
      this.quantity === null ||
      this.price === null ||
      this.supplier_name.trim() === '' ||
      this.stock_status.trim() === ''
    ) {
      this.message = 'Please fill in all required fields.';
      return;
    }

    // Create object to match API structure
    const newItem: InventoryItem = {
      item_name: this.item_name.trim(),
      category: this.category,
      quantity: Number(this.quantity),
      price: Number(this.price),
      supplier_name: this.supplier_name.trim(),
      stock_status: this.stock_status,
      featured_item: this.featured_item ? 1 : 0, // convert boolean to 0/1
      special_note: this.special_note.trim()
    };

    // Send POST request to API
    this.dataService.addItem(newItem).subscribe({
      next: () => {
        this.message = 'Item added successfully.';

        // Clear form after success
        this.clearForm();

        // Reload featured items
        this.loadFeaturedItems();
      },
      error: (err) => {
        console.log('Error adding item', err);
        this.message = 'Failed to add item.';
      }
    });
  }

  // Function to reset form inputs
  clearForm() {
    this.item_name = '';
    this.category = '';
    this.quantity = null;
    this.price = null;
    this.supplier_name = '';
    this.stock_status = '';
    this.featured_item = false;
    this.special_note = '';
  }
}