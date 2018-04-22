import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-blog-ui',
  templateUrl: './blog-ui.component.pug',
  styleUrls: ['./blog-ui.component.css']
})
export class BlogUiComponent {
  /*adat: Todo;
   modal: Todo;
   datas: Array<Todo>;*/

   adat: object = {
    _id: '',
    title: '',
    content: '',
    picture: '',
    tags: [],
    _author: ''
  };

  modal: object = {
    _id: '',
    title: '',
    content: '',
    picture: '',
    _author: ''
  };
  searchWord = 'Search';

  datas: any;

  constructor(public http: Http) {
    this.getAll();
  }

  errorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.error('API error:' + res.error);
    } else {
      this.datas = res;
      this.sortPosts();
      console.log(this.datas);
    }
  }

    getUser() {
      this.http.get('http://localhost:8080/').subscribe(
        data => {
          console.log(JSON.parse(data['_body']));
        }
      );
    }

  getAll() {
    this.http.get('http://localhost:8080/blog/all').subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  create() {
    this.http.post('http://localhost:8080/blog/create', this.adat).subscribe(
      data => {
        this.errorHandling(data);
      });
  }

  update() {
    this.http.put(`http://localhost:8080/users/${this.modal['id']}`, this.modal)
      .subscribe(data => {
        this.errorHandling(data);
      });
  }

  deleteRow(id) {
    this.http.delete(`http://localhost:3000/users/${id}`)
      .subscribe(data => {
        this.errorHandling(data);
      });
  }

  modalChange(id) {
    const choosen = this.datas.filter(item => item.id == id)[0];
    this.modal = Object.assign({}, choosen);
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

  searchPostByTitle() {
    this.datas = this.datas.filter(post =>
     (JSON.stringify(post.title)).indexOf(this.searchWord) !== -1);
     console.log(this.datas);

  }
  changed(index, item) {
    return index;
  }


}
