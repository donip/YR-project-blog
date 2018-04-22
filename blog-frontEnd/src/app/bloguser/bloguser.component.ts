import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-bloguser',
  templateUrl: './bloguser.component.pug',
  styleUrls: ['./bloguser.component.css']
})
export class BloguserComponent {

  datas: any;
  datas2: any;

  newPost = {
    title: '',
    _author: '',
    content: '',
    picture: ''
  };

    searchWord = '';
  constructor(public http: Http) {
    this.getAll();
  }


  errorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.error('API error:' + res.error);
    } else {
      const userId = this.readCookie('userid');
      this.datas = res.filter(post => post['_author'] === userId);
      this.datas2 = res.filter(post => post['_author'] === userId);
      this.sortPosts();
      console.log(this.datas);
    }
  }

  getAll() {
    this.http.get('http://localhost:8080/blog/all').subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  sortPosts() {
    this.datas = this.datas.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1; }
      if (a.updatedAt < b.updatedAt) {
        return 1; }
      return 0;
    });
  }

  readCookie(index) {
    const c = document.cookie.split('; ');
    const id = JSON.stringify(c.filter(data => data.startsWith(`${index}=`))).substr(9);
    const result = id.substr(0, id.indexOf('"'));
    return result;
  }

  searchPostByTitle() {
    const word = this.searchWord.toLocaleLowerCase();
    this.datas = this.datas2.filter(post =>
     (JSON.stringify(post.title)).toLocaleLowerCase().indexOf(word) !== -1);
     console.log(this.datas.length + ' találat');

  }

  createPost() {
    if (this.readCookie('userid') !== '') {
    this.newPost._author = this.readCookie('userid');
    console.log(this.newPost);
    this.http.post('http://localhost:8080/blog/createpost', this.newPost).subscribe(
      data => {
        console.log(data);
      });
    } else {
      console.log('Nincs bejelentkezve');
    }
  }

}
