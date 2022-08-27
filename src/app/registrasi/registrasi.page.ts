import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { GlobalService } from "../global.service";

@Component({
  selector: 'app-registrasi',
  templateUrl: './registrasi.page.html',
  styleUrls: ['./registrasi.page.scss'],
})
export class RegistrasiPage implements OnInit {

  reg:any={}
  result:any={}

  constructor(
    public http:HttpClient,
    public nav:NavController,
    public gb:GlobalService
  ) { }

  ngOnInit() {
  }

  async registrasi(){

    // Validasi
    if(!this.reg.name){
      this.gb.notif("Name Can't Empty !",'warning')
      return
    }

    if(!this.reg.email){
      this.gb.notif("Email Can't Empty !",'warning')
      return
    }

    if(!this.gb.validateEmail(this.reg.email)){
      this.gb.notif("Email Invalid !",'warning')
      return
    }

    if(!this.reg.password){
      this.gb.notif("Password Can't Empty !",'warning')
      return
    }

    // Show Loading
    this.gb.show_loading()

    let headers: any = new HttpHeaders()
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json')

    await this.http.post(this.gb.API_URL+"registrasi", JSON.stringify(this.reg), headers).toPromise()
      .then(res => {
        this.result = res
        if (this.result.error == "0") {
          // Jika request tidak ada error atau berhasil
          localStorage.setItem("login", JSON.stringify(this.result.data))
          this.gb.notif(this.result.mess,'success',1500)
          this.nav.navigateRoot("tabs/tab1")
        } else {
          this.gb.notif(this.result.mess,'danger',1500)
        }

        // Hilangkan Loading
        this.gb.hide_loading();

        console.log(this.result)
      })
  }

}