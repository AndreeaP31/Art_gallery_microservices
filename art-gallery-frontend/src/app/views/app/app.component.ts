import { Component, OnInit } from '@angular/core';
import { AppViewModel } from '../../view-models/app.view-model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Art Gallery';
  
  constructor(private viewModel: AppViewModel) {}
  
  ngOnInit(): void {
    // Subscribe to view model observables
    this.viewModel.title$.subscribe(title => this.title = title);
  }
  
  switchLanguage(language: string): void {
    this.viewModel.switchLanguage(language);
  }
}