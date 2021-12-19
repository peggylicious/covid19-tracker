import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators'
import { GlobalDataSummary } from 'src/app/modals/global-data';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

    private globalDataUrl = 'https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_daily_reports/12-31-2020.csv';
  constructor(private http: HttpClient) { }

  getGlobalData(){
    return this.http.get(this.globalDataUrl, {responseType: 'text'}).pipe(
      map(result =>{ 
        let resultArray = result.split('\n');
        if (resultArray[resultArray.length - 1] === '') {
          resultArray.pop();
        }
        let firstChildArray = resultArray[0];

        let firstChildArraySlice = resultArray[0].split(',')
        // let otherChildrenArray = resultArray.slice(1);
        let splitChildren;
        let newArrray = [];
        let data: GlobalDataSummary[] = [];
        let totalObj = {}

        // Loop through all resultsexcept title
        for (let i = 1; i < resultArray.length; i++) {
          
          let myObj = {};
          splitChildren = resultArray[i].split(/,(?!\s)/g);
          
          // Create new array
          //  The splice method is being used to ensure array stays as fetched
          // Push can be used but does not guarantee orderliness of array i.e array contents can appear at any index and not as fetched from API
          newArrray.splice(i-1,0,splitChildren)
          
          let countries = {
            country: newArrray[i-1][3],
            confirmed: +newArrray[i-1][7],
            deaths: +newArrray[i-1][8],
            recovered: +newArrray[i-1][9],
            active: +newArrray[i-1][10]
          }
          // console.log(countries)
          let temp : GlobalDataSummary = totalObj[countries.country];
          if(temp){
            temp.confirmed = temp.confirmed + countries.confirmed
            temp.deaths = temp.deaths + countries.deaths
            temp.recovered = temp.recovered + countries.recovered
            temp.active = temp.active + countries.active

            totalObj[countries.country] = temp
          }else{
            totalObj[countries.country] = countries

          }
          
        }
        // console.log(totalObj)
        // console.log(Object.values(totalObj))
        return <GlobalDataSummary[]>Object.values(totalObj)
       })
    )
  }
}
