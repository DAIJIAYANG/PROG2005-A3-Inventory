import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private url = 'https://prog2005.it.scu.edu.au/ArtGalley';

  constructor(private http: HttpClient) {}

  // GET all items
  getAllItems(): Observable<InventoryItem[]> {
    return this.http.get<InventoryItem[]>(this.url);
  }

  // GET single item
  getItem(name: string): Observable<InventoryItem> {
    return this.http.get<InventoryItem>(`${this.url}/${name}`);
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