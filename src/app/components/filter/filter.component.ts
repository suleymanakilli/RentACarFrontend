import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  brands:Brand[]
  colors:Color[]
  selectedBrand:Brand
  selectedColor:Color

  constructor(public filterService:FilterService,private router:Router) { }

  ngOnInit(): void {
    this.getBrands()
    this.getColors()
  }

  getBrands(){
    this.filterService.getBrands().subscribe(response=>{
      this.brands=response.data
      this.brands.unshift({id: 0,brandName:"--Choose One--"})
      this.selectedBrand=this.brands[0]
    })
  }
  getColors(){
    this.filterService.getColors().subscribe(response=>{
      this.colors=response.data
      this.colors.unshift({id: 0,colorName:"--Choose One--"})
      this.selectedColor=this.colors[0]
    })
  }
  routeByFilter(){
    var array=['cars/getcardetailsbyfilter/',this.selectedBrand.id,this.selectedColor.id]
    this.router.navigate(array);
  }
  clearFilter(){
    this.selectedBrand=this.brands[0];
    this.selectedColor=this.colors[0];
    this.routeByFilter()
  }



}
