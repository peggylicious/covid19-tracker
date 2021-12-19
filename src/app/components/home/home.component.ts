import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/modals/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})

export class HomeComponent implements OnInit {
  constructor(private dataService: DataServiceService) {}
  private allResults;
  totalConfirmed = 0;
  totalDeaths = 0;
  totalActive = 0
  totalRecovered = 0;
  totalData : GlobalDataSummary[];

  public pieChart: GoogleChartInterface = {
    chartType: GoogleChartType.PieChart,
    dataTable: [
      ['Task', 'Hours per Day'],
      ['Work',     11],
      ['Eat',      2],
      ['Commute',  2],
      ['Watch TV', 2],
      ['Sleep',    7]
    ],
    //firstRowIsData: true,
    options: {'title': 'Tasks'},
  };

  ngOnInit(): void {
    this.getTotalData()
  }

  getTotalData(){
    this.dataService.getGlobalData().subscribe({
      next: (result) => {
        this.totalData = result;
        for(let x = 0; x <= result.length; x++){
          if(result[x]){
            this.totalConfirmed += result[x].confirmed
            this.totalDeaths += result[x].deaths
            this.totalRecovered += result[x].recovered
            this.totalActive += result[x].active
          }
        }
        console.log("Total confirmed", this.totalConfirmed)
        console.log("Total deaths", this.totalDeaths)
        console.log("Total recovered", this.totalRecovered)
        console.log("Total active", this.totalActive)

      },
    });
  } 
}
