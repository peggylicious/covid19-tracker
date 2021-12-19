import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-card',
  templateUrl: './dashboard-card.component.html',
  styleUrls: ['./dashboard-card.component.css']
})
export class DashboardCardComponent implements OnInit {
  @Input() totalConfirmed
  @Input() totalRecovered
  @Input() totalDeaths
  @Input() totalActive
  constructor() { }

  ngOnInit(): void {
  }

}
