import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  login: any = {}
  result: any = {}

  constructor(
    public http: HttpClient,
    public nav: NavController,
    public gb: GlobalService
  ) { }

  ngOnInit() {
    if (localStorage.getItem("login")) { this.nav.navigateRoot("tabs/tab1") }
  }

  async goLogin(){
    // Validasi
    if(!this.login.email){
      this.gb.notif("Email Can't Empty !",'warning')
      return
    }

    if(!this.gb.validateEmail(this.login.email)){
      this.gb.notif("Email Invalid !",'warning')
      return
    }

    if(!this.login.password){
      this.gb.notif("Password Can't Empty !",'warning')
      return
    }

    // Show Loading
    this.gb.show_loading()

    let headers: any = new HttpHeaders()
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')

    await this.http.post(this.gb.API_URL+"login", JSON.stringify(this.login), headers).toPromise()
      .then(res => {
        this.result = res
        if (this.result.error == "0") {
          // Jika request tidak ada error atau berhasil
          localStorage.setItem("login", JSON.stringify(this.result.data.user))
          localStorage.setItem("member", JSON.stringify(this.result.data.member))
          this.gb.notif(this.result.mess,'success',1500)
          this.nav.navigateRoot("tabs/tab1")
        } else {
          this.gb.notif(this.result.mess,'danger',1500)
        }

        //hilangkan loading
        this.gb.hide_loading();
        
        console.log(this.result)
      })
  }

  goRegistrasi(){
    this.nav.navigateForward("registrasi")
  }

}
