import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  productFav: Array<any> = []

  constructor() {
    this.loadFavorite();
  }

  favorite(key) {
    let index = this.productFav.indexOf(key);
    if (index >= 0) {
      this.removeFavorite(key);
    } else {
      this.addFavorite(key);
    }
  }

  addFavorite(key) {
    this.productFav.push(key)
    this.saveFavorite();
  }

  removeFavorite(key) {
    let index = this.productFav.indexOf(key);
    if (index >= 0) {
      this.productFav.splice( index, 1 );
      this.saveFavorite();
    }
  }

  saveFavorite() {
    localStorage.setItem('product-fav', JSON.stringify(this.productFav))
  }

  loadFavorite() {
    let productFav = localStorage.getItem('product-fav')
    if(productFav) {
      this.productFav = JSON.parse(productFav);
    }
  }
}