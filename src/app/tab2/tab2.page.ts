import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { GlobalService } from '../global.service';
import { LocalstorageService } from "../services/localstorage.service";

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  products: any
  kategori: any
  search: any

  constructor(
    public http: HttpClient,
    public ActiveRoute: ActivatedRoute,
    public nav: NavController,
    public gb: GlobalService,
    private productFavorite: LocalstorageService,
  ) {
   
  }
  
  ionViewDidEnter() {
    //tangkap nilai parameter
    this.kategori = this.ActiveRoute.snapshot.paramMap.get("kategori")
    this.getProduct();
    console.log(this.kategori);
  }

  refresh(event){
    this.getProduct()
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  getProduct() {
    let param = this.kategori != null ? this.kategori : "";
    this.http.get(this.gb.API_URL+"product/" + param).toPromise()
      .then(res => {
        this.products = res
        this.initProductFav();
    })
  }

  getDetailProduct(mn: any) {
    this.nav.navigateForward(["single-product", { product: JSON.stringify(mn) }])
  }

  setFav(mn:any) {
    this._setLocalFav(mn);
  }

  _setLocalFav(mn:any) {
    this.productFavorite.favorite(mn?.kd_product);
    this.initProductFav();
  }

  initProductFav() {
    this.products = this.products.map(product => {
      let index = this.productFavorite.productFav.indexOf(product?.kd_product)
      if (index >= 0) {
        product['fav'] = 1;
      } else {
        product['fav'] = 0;
      }
      return product;
    })
  }

}
