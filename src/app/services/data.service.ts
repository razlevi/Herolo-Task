import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http:Http) { 
    console.log('Data Service Connection ran....');
  }

  getArticles() {
    return this.http.get('./assets/data.json').map(res => res.json());
  }

  editArticle(article) {
    // here goes the code for http request of edit article.
    let data = {success:true, message: 'Successfully edited!'};
    return data;
  }

  deleteArticle(id) {
    // here goes the code for http request of delete article.
    let data = {success:true, message: 'Successfully deleted!'};
    return data;
  }

  addArticle(article) {
    // here goes the code for http request of edit article.
    let data = {success:true, message: 'Successfully added!'};
    return data;
  }
  
}
