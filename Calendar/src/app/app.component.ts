import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'testing';
  @ViewChild("datesList", {read: ElementRef}) datesList:ElementRef;
  @ViewChild("monthsList", {read: ElementRef}) monthsList:ElementRef;
  @ViewChild("yearsList", {read: ElementRef}) yearsList:ElementRef;

  days;
  twentyEight;
  twentyNine;
  thirty;
  thirtyOne;
  dates;
  months;
  years;
  
  today;
  date;
  month;
  year;
  currentYear;
  grid;

  weekIndex;
  dateIndex;

  dispMonths;
  monthValue;

  getDateStatus(date)
  {
  	if( (new Date(this.year, this.month, date+1)) < this.today )
  	{return true;}
  	else
  	{return false;}
  }

  getMonthStatus(month)
  {
  	if( (new Date(this.year, month+1, 0)) < this.today )
  	{return true;}
  	else
  	{return false;}
  }

  setDates()
  {
  	// this.month = this.months.indexOf({month: this.monthValue, selected: false});
  	this.month = this.months.indexOf(this.monthValue);
  	let num = new Date(this.year, this.month+1, 0).getDate();
  	if(num === 31){this.dates = this.thirtyOne;}
  	else if(num === 30){this.dates = this.thirty;}
  	else if(num === 28){this.dates = this.twentyEight;}
  	else if(num === 29){this.dates = this.twentyNine;}
  	this.date = undefined;
  	if(this.weekIndex>=0 && this.dateIndex >=0)
  	{this.grid[this.weekIndex][this.dateIndex].selected = false;}
  	this.getGrid();
  	this.weekIndex = undefined;
  	this.dateIndex = undefined;
  }

  setMonths()
  {
  	this.dispMonths = [];
  	let limit = this.months.length+1;
  	for( let i = 1; i < limit; i++ )
  	{
  		let date = new Date(this.year, i, 1);
  		if(date >= this.today)
  		{this.dispMonths.push(this.months[i-1]);}
  	}
  	this.setDates();
  }

  getGrid()
  {
  	this.grid = [[], [], [], [], [], []];
  	let week = 0;
  	let date = new Date(this.year, this.month, 1);
  	let day = date.getDay();
  	let i = 0;
  	let limit = this.dates.length;
  	while (week < 6 && i < limit)
  	{
  		this.grid[week][day]=this.dates[i];
  		i++;
  		day++;
  		if(day > 6){week++; day=0;}
  	}
  }

  setDate(week, date)
  {
  	if(this.weekIndex>=0 && this.dateIndex >=0)
  	{this.grid[this.weekIndex][this.dateIndex].selected = false;}

  	this.weekIndex = week;
  	this.dateIndex = date;
  	this.grid[week][date].selected = true;
  	this.date = this.grid[week][date].date;
  }

  ngOnInit()
  {  	
  	this.twentyNine = this.twentyEight.concat([{date: 29, selected: false}]);
  	this.thirty = this.twentyNine.concat([{date: 30, selected: false}]);
  	this.thirtyOne = this.thirty.concat([{date: 31, selected: false}]);
  	
  	this.today = new Date();
  	this.year = this.today.getFullYear();
  	this.currentYear = this.year;
  	let yearLimit = this.year+21;
  	for(let x = this.year; x < yearLimit; x++)
  	{this.years.push({year: x, selected: false});}
  	// this.setYear(0);
  	this.setMonths();
  	
  	this.month = this.today.getMonth();
  	this.monthValue = this.months[this.month];
  	// this.setMonth(this.month);
  	this.setDates();

  	this.date = this.today.getDate();
  	let flagx = false;
  	for(let w = 0; w < this.grid.length; w++)
  	{
  		for (let d = 0; d < this.grid[w].length; d++)
  		{
  			if(this.grid[w][d] && this.grid[w][d].date === this.date)
  			{
  				this.grid[w][d].selected = true;
  				this.weekIndex = w;
  				this.dateIndex = d;
  				flagx = true;
  			}
  		}
  		if(flagx)
  		{break;}
  	}
  	console.log(this.month);
  	// this.setDate(this.date-1);
  }

  constructor()
  {
  	this.twentyEight = [ { date: 1, selected: false}, { date: 2, selected: false}, { date: 3, selected: false}, { date: 4, selected: false}, { date: 5, selected: false}, { date: 6, selected: false}, { date: 7, selected: false}, { date: 8, selected: false}, { date: 9, selected: false}, { date: 10, selected: false}, { date: 11, selected: false}, { date: 12, selected: false}, { date: 13, selected: false}, { date: 14, selected: false}, { date: 15, selected: false}, { date: 16, selected: false}, { date: 17, selected: false}, { date: 18, selected: false}, { date: 19, selected: false}, { date: 20, selected: false}, { date: 21, selected: false}, { date: 22, selected: false}, { date: 23, selected: false}, { date: 24, selected: false}, { date: 25, selected: false}, { date: 26, selected: false}, { date: 27, selected: false}, { date: 28, selected: false} ];
  	// this.months = [ { month: "January", selected: false}, { month: "February", selected: false}, { month: "March", selected: false}, { month: "April", selected: false}, { month: "May", selected: false}, { month: "June", selected: false}, { month: "July", selected: false}, { month: "August", selected: false}, { month: "September", selected: false}, { month: "October", selected: false}, { month: "November", selected: false}, { month: "December", selected: false} ];
  	this.months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  	this.dispMonths = this.months;
  	this.years = [];
  	this.days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  	// this.grid = [this.days, [], [], [], [], []];
  	this.grid = [[], [], [], [], []];
  }
}


	// setYear(index) {
  // 	this.years[this.year-this.currentYear].selected = false;
  // 	this.year = this.years[index].year;
  // 	this.years[index].selected = true;
  // }

  // dayDates(index) 
  // {
  // 	let final = [];
  // 	for(let i = 0; i < this.dates.length; i++)
  // 	{
  // 		let date = new Date(this.year, this.month, this.dates[i].date);
  // 		let day = date.getDay();
  // 		if(day === index)
  // 		{final.push(this.dates[i].date);}
  // 		else
  // 		{final.push(undefined);}
  // 	}
  // 	return final;
  // }

  // setMonth(month) {
  // 	this.months[this.month].selected = false;
  // 	this.month = month;
  // 	this.months[month].selected = true;
  // 	this.setDates();
  	
  // 	if(this.date && this.dates[this.date-1])
  // 	{this.dates[this.date-1].selected = false;}
  // 	this.date = undefined;
  // 	this.getGrid();
  // }

  // setDate(index) {
  // 	if(this.date && this.dates[this.date-1])
  // 	{this.dates[this.date-1].selected = false;}
  // 	this.date = this.dates[index].date;
  // 	this.dates[index].selected = true;
  // }

  // getDateColor(x) {
  // 	if( (new Date(this.year, this.month, x+1)) < this.today )
  // 	{return "gray";}
  // 	else
  // 	{return "black";}
  // }