import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.page.html',
  styleUrls: ['./single-product.page.scss'],
})
export class SingleProductPage implements OnInit {

  products: any = []

  constructor(
    public ActiveRoute: ActivatedRoute
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    //get data product dari parameter
    this.products = JSON.parse(this.ActiveRoute.snapshot.paramMap.get("product"))
    console.log(this.products)
  }
  
}
