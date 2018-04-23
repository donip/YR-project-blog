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
    picture: '',
    user: ''
  };

  filepath = 'default.jpg';

  chosen: any;
  modal = {
    title: '',
    content: '',
    picture: '',
    _author: '',
    tags: ''
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

  changePic(file) {
    this.newPost.picture = file.value.substring(12);
  }
  changePicModal(file) {
    this.modal.picture = file.value.substring(12);
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
    if (this.readCookie('userid') !== '' && this.readCookie('usernm') !== '') {
    this.newPost._author = this.readCookie('userid');
    this.newPost.user = this.readCookie('usernm');
    console.log(this.newPost);
    this.http.post('http://localhost:8080/blog/createpost', this.newPost).subscribe(
      data => {
        console.log(data);
        if(data['success']) {
          location.reload();
        }
      });
    } else {
      console.log('Nincs bejelentkezve');
    }
  }

  editModal(id) {
    this.chosen = this.datas.filter(item => item._id === id)[0];
    this.modal = Object.assign({}, this.chosen);
  }

  editPost() {
    this.http.put(`http://localhost:8080/blog/editpost/${this.chosen._id}`, this.modal).subscribe(
      data => {
        console.log(data);
        this.getAll();
      });
  }

  deletePost() {
    window.confirm('Biztosan törlöd a bejegyzést?')
    this.http.delete(`http://localhost:8080/blog/deletepost/${this.chosen._id}`).subscribe(
      data => {
        console.log(data);
        this.getAll();
      });
  }

}
