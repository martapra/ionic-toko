import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public API_URL:any="http://localhost:8000/api/"

  constructor(
    public toast:ToastController,
    public loading:LoadingController
  ) { }

  async notif(text:any,type:any,timeout:any=1000){
    const toast = await this.toast.create({
      message: text,
      duration: timeout,
      color:type
    });
    toast.present();
  }

  show_loading(){
    this.loading.create({
      message: 'Please wait...',
    }).then(response=>{
      response.present()
    })
  }

  hide_loading(){
    this.loading.dismiss()
  }

  validateEmail(email: any) {
    const format = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return format.test(email);
  }

}
