// Import Angular core and our data service
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DataService, InventoryItem } from '../services/data.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  // Item name to search/update/delete
  targetName: string = '';

  // Optional update fields
  newCategory: string = '';
  newQuantity: number | null = null;
  newPrice: number | null = null;
  newStockStatus: string = '';

  // Message shown to user
  message: string = '';

  constructor(private dataService: DataService, private alertCtrl: AlertController) {}

  // Update item using PUT
  updateItem() {
    // Target item name is required
    if (this.targetName.trim() === '') {
      this.message = 'Please enter the target item name.';
      return;
    }

    // First get the existing item from the server
    this.dataService.getItem(this.targetName.trim()).subscribe({
      next: (data) => {
        // If nothing is found, stop
        if (!data || data.length === 0) {
          this.message = 'Item not found.';
          return;
        }

        // Use the first matching item from the search result
        const existingItem = data[0];

        // Create the updated object
        // If a field is left blank, keep the old value
        const updatedItem: InventoryItem = {
          item_name: existingItem.item_name,
          category: this.newCategory.trim() !== '' ? this.newCategory : existingItem.category,
          quantity: this.newQuantity !== null ? Number(this.newQuantity) : existingItem.quantity,
          price: this.newPrice !== null ? Number(this.newPrice) : existingItem.price,
          supplier_name: existingItem.supplier_name, // keep existing supplier name
          stock_status: this.newStockStatus.trim() !== '' ? this.newStockStatus : existingItem.stock_status,
          featured_item: existingItem.featured_item, // keep existing featured value
          special_note: existingItem.special_note // keep existing note
        };

        // Send PUT request
        this.dataService.updateItem(this.targetName.trim(), updatedItem).subscribe({
          next: () => {
            this.message = 'Item updated successfully.';
            this.clearForm();
          },
          error: (err) => {
            console.log('Error updating item', err);
            this.message = 'Failed to update item.';
          }
        });
      },
      error: (err) => {
        console.log('Error finding item', err);
        this.message = 'Item not found.';
      }
    });
  }

  // Delete item using DELETE
  deleteItem() {

  if (this.targetName.trim() === '') {
    this.message = 'Please enter the target item name.';
    return;
  }

  // SPECIAL CASE: Prevent deletion of "Laptop"
  if (this.targetName.trim().toLowerCase() === 'laptop') {
    this.message = 'Laptop cannot be deleted (restricted item).';
    return;
  }

  // Normal delete for other items
  this.dataService.deleteItem(this.targetName.trim()).subscribe({
    next: () => {
      this.message = 'Item deleted successfully.';
      this.clearForm();
    },
    error: (err) => {
      console.log('Error deleting item', err);
      this.message = 'Failed to delete item.';
    }
  });
}

  // Reset the form fields
  clearForm() {
    this.targetName = '';
    this.newCategory = '';
    this.newQuantity = null;
    this.newPrice = null;
    this.newStockStatus = '';
  }

  // Show help message to user
  // Show help message to user
async showHelp() {
  const alert = await this.alertCtrl.create({
    header: 'Help',
    message: 'Use this page to update or delete an item by entering its exact name.',
    buttons: ['OK']
  });

  await alert.present();
}

}