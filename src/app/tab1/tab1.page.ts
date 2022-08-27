import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  user: any = []
  products: any 

  constructor(
    public http: HttpClient,
    public nav: NavController,
    public gb: GlobalService
  ) {
    this.getProfile()
    this.getProduct()

    if(!this.user){ this.nav.navigateRoot("/") }
  }

  ionViewDidEnter(){
    this.getProfile()
    this.getProduct()
  }

  getProfile() {
    this.user = JSON.parse(localStorage.getItem("login"))
  }

  async getProduct() {
    this.http.get(this.gb.API_URL+"product_favorite").toPromise()
      .then(res => {
        this.products = res
      })
  }

  goProduct(kat:any) {
    //pergi ke halaman tabs/tab2
    //this.route.navigateByUrl("tabs/tab2")
    this.nav.navigateForward(["tabs/tab2", { kategori: kat }])
  }

  getDetailProduct(mn: any) {
    this.nav.navigateForward(["single-product", { product: JSON.stringify(mn) }])
  }

  goProfile(){
    this.nav.navigateForward("tabs/tab3")
  }

}
