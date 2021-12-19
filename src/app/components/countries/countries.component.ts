import { Component, OnInit } from '@angular/core';
import { GlobalDataSummary } from 'src/app/modals/global-data';
import { DataServiceService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.css'],
})
export class CountriesComponent implements OnInit {
  constructor(private dataService: DataServiceService) {}
  data : GlobalDataSummary[];
  allCountries:String[] = [];
  totalConfirmed = 0;
  totalDeaths = 0;
  totalActive = 0
  totalRecovered = 0;
  totalData : GlobalDataSummary[];
  ngOnInit(): void {
    this.getCountries();
    // setTimeout(this.getCountryData, 4000)
  }
  getCountries() {
    this.dataService.getGlobalData().subscribe(result=>{
      this.data = result;
      this.data.forEach(cases=>{
        this.allCountries.push(cases.country)
      })
      console.log(this.data)
      console.log(this.allCountries)
    }
      // {
      //   next: (result) => console.log(result),
      // }
    );
  }
  getCountryData(country){
    let selectedCountry = this.data.filter(currentValue=>{
      return currentValue.country === country
    })
    this.totalConfirmed = selectedCountry[0]?.confirmed
    this.totalRecovered = selectedCountry[0]?.recovered
    this.totalDeaths = selectedCountry[0]?.deaths
    this.totalActive = selectedCountry[0]?.active
  }
}
