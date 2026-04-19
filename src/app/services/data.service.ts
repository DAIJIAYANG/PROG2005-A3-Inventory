// Allows this service to be injected into other components
import { Injectable } from '@angular/core';

// Used to send HTTP requests (GET, POST, PUT, DELETE) to the backend server
import { HttpClient } from '@angular/common/http';

// Represents asynchronous data returned from API calls
import { Observable } from 'rxjs';

// Defines the structure of an inventory item object used in the application
export interface InventoryItem {
  item_name: string;
  category: string;
  quantity: number;
  price: number;
  supplier_name: string;
  stock_status: string;
  featured_item: number;
  special_note?: string;
}

// Marks this class as a service available throughout the app
@Injectable({
  providedIn: 'root'
})
export class DataService {

  // Base URL of the remote REST API
  private url = 'https://prog2005.it.scu.edu.au/ArtGalley';

  constructor(private http: HttpClient) {}

  // GET all items
  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.url);
  }

  // GET single item
  getItem(name: string): Observable<InventoryItem[]> {
  return this.http.get<InventoryItem[]>(`${this.url}/${name}`);
}

  // POST add item
  addItem(item: InventoryItem) {
    return this.http.post(this.url, item);
  }

  // PUT update item
  updateItem(name: string, item: InventoryItem) {
    return this.http.put(`${this.url}/${name}`, item);
  }

  // DELETE item
  deleteItem(name: string) {
    return this.http.delete(`${this.url}/${name}`);
  }
}