import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  profile: any = []
  user: any = []

  constructor(
    public nav:NavController
  ) {
    
  }

  ionViewDidEnter(){
    this.getProfile()
  }

  getProfile() {
    this.user = JSON.parse(localStorage.getItem("login"))
  }

  goTo(url:any){
    this.nav.navigateForward(url)
  }

  logout(){
    localStorage.clear()
    this.nav.navigateRoot("/")
  }

}
