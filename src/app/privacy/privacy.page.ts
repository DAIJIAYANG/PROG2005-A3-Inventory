import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // <-- Key point: Import the Ionic UI engine
@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule] // <-- Key point: Inform the page about the use of these engines
})
export class PrivacyPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}