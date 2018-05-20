import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  articles;
  currentArticleNo;
  currentArticle = [];
  editForm;
  addForm;
  processing = false;
  messageClass;
  message;
  isDelete = false;

  constructor(
    private dataService:DataService, 
    private formBuilder: FormBuilder
  ) { 
  } 

  ngOnInit() {
    this.getArticles();
    this.createAddForm();
    this.createEditForm();
  }

  getArticles() {
    this.dataService.getArticles().subscribe(data => {
      this.articles = data;
      this.currentArticle = this.articles[0];
    });
  }

  createEditForm() {
    this.editForm = this.formBuilder.group({
      title: [this.currentArticle['Title'], Validators.compose([
        Validators.required
      ])],
      author: [this.currentArticle['Author'], Validators.compose([
        Validators.required
      ])],
      date:[this.currentArticle['Date']]
    });
    this.editForm.controls.title.errors = false;
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      title: ['', Validators.compose([
        Validators.required
      ])],
      author: ['', Validators.compose([
        Validators.required
      ])],
      date: ['', Validators.compose([
        Validators.required,
      ])]
    });
  }

  // alphaValidation(controls){
  //   const regExp = new RegExp(/^[a-zA-Z]+$/);
  //   if (regExp.test(controls.value)){
  //     return null;
  //   } else {
  //     return { 'alphaValidation': true };
  //   }
  // }

  disableEditForm(){
    this.editForm.controls['title'].disable();
    this.editForm.controls['author'].disable();
    this.editForm.controls['date'].disable();
  }

  enableEditForm(){
    this.editForm.controls['title'].enable();
    this.editForm.controls['author'].enable();
    this.editForm.controls['date'].enable();
  }

  disableAddForm(){
    this.addForm.controls['title'].disable();
    this.addForm.controls['author'].disable();
    this.addForm.controls['date'].disable();
  }

  enableAddForm(){
    this.addForm.controls['title'].enable();
    this.addForm.controls['author'].enable();
    this.addForm.controls['date'].enable();
  }
  
  onEditForm(date) {
    this.processing = true;
    this.disableEditForm();

    const article ={
      title: this.editForm.get('title').value,
      author: this.editForm.get('author').value,
      date: date
    };
    let isNew = true;
    this.articles.map((curArticle, index) => {
      if ((curArticle.Title).toLowerCase() == (article.title).toLowerCase() && this.currentArticleNo != index) {
        this.messageClass = 'alert alert-danger';
        this.message = 'Your title already exists';
        this.processing = false;
        setTimeout( () => {
          this.message = null;
          this.enableEditForm();
        }, 2000);
        isNew = false;
      }
    });
    if (isNew) {
      this.articles[this.currentArticleNo].Title = article.title;
      this.articles[this.currentArticleNo].Author = article.author;
      this.articles[this.currentArticleNo].Date = article.date;
      
      let data = this.dataService.editArticle(article);
      if (!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.processing = false;
      }
      setTimeout( () => {
        this.message = null;
        // this.editForm.reset();
        this.enableEditForm();
      }, 2000);
    }
  }
  
  onAddForm() {
    this.processing = true;
    this.disableAddForm();
    let numberOfArticle = this.articles.length;
    const article ={
      id: numberOfArticle,
      Title: this.addForm.get('title').value,
      Author: this.addForm.get('author').value,
      Date: this.addForm.get('date').value
    };
    let isNew = true;
    this.articles.map((curArticle, index) => {
      if ((curArticle.Title).toLowerCase() == (article.Title).toLowerCase()) {
        this.messageClass = 'alert alert-danger';
        this.message = 'Your title already exists';
        this.processing = false;
        setTimeout( () => {
          this.message = null;
          this.addForm.reset();
          this.enableAddForm();
        }, 2000);
        isNew = false;
      }
    });
    if (isNew) {
      this.articles.push(article);
      let data = this.dataService.addArticle(article);
      if (!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
        this.processing = false;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.processing = false;
      }
      setTimeout( () => {
        this.message = null;
        this.addForm.reset();
        this.enableAddForm();
      }, 2000);
    }
  }

  onDelete(id){
    this.currentArticleNo = id;
    if(window.confirm('Are sure you want to delete this item ?')){
      this.articles.splice(id, 1);
      let data = this.dataService.deleteArticle(id + 1);
      if (!data.success){
        this.messageClass = 'alert alert-danger';
        this.message = data.message;
      } else {
        this.messageClass = 'alert alert-success';
        this.message = data.message;
        this.isDelete = true;
      }
      setTimeout( () => {
        this.message = null;
        this.isDelete = false;
      }, 2000);
    }
  }

  changeCurrentArticle(i) {
    this.currentArticleNo = i;
    this.currentArticle = this.articles[i];
    this.createEditForm();
  }

}