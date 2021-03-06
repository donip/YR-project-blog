import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
declare var $: any;
declare var jquery: any;

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
    _author: '',
    user: ''
  };

  comments: any;
  modal: object = {
    _id: '',
    title: '',
    content: '',
    picture: '',
    _author: '',
    user: ''
  };
  searchWord = '';
  newComment = {
    sentTo: '',
    sentBy: '',
    content: ''
  };

  datas: any;
  datas2: any;

  constructor(public http: Http) {
    this.getAll();
    this.getComments();
  }

  errorHandling(res) {
    res = JSON.parse(res['_body']);
    if (res.error) {
      console.error('API error:' + res.error);
    } else {
      this.datas = res;
      this.datas2 = res;
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

  getComments() {
    this.http.get('http://localhost:8080/comment/all').subscribe(
      data => {
        data = JSON.parse(data['_body']);
        if (data['error']) {
          console.error(data['error']);
        } else {
          this.comments = data;
          console.log(this.comments);
        }
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
    const word = this.searchWord.toLocaleLowerCase();
    this.datas = this.datas2.filter(post =>
     (JSON.stringify(post.title)).toLocaleLowerCase().indexOf(word) !== -1);
     console.log(this.datas.length + ' találat');

  }

  readCookie(index) {
    const c = document.cookie.split('; ');
    const id = JSON.stringify(c.filter(data => data.startsWith(`${index}=`))).substr(9);
    const result = id.substr(0, id.indexOf('"'));
    return result;
  }

  sendComment(id) {
    if (this.newComment.content.length < 2) {
      window.alert('Minimum 2');
    } else {
      const selector = `.com${id}`;
      this.newComment.sentBy = this.readCookie('usernm');
      if (this.newComment.sentBy === '') {
        window.alert('Hozzászólás írásához jelentkezz be!');
      } else {
      this.newComment.sentTo = id;
      this.http.post('http://localhost:8080/comment/create', this.newComment).subscribe(
        data => {
          $(selector).prepend(`
          <div class="comments">
          <div class="row">
          <kbd class="bg-light text-info" style="margin-right: 10px; height: 2em;">${this.newComment.sentBy}:</kbd>
          <p class="card-text">${this.newComment.content}</p>
          <span class="ml-auto"</span><button class="btn btn-default btn-sm">x</button></span>
          </div></div>`);
            this.newComment.content = '';
        });
      }
    }
  }

  deleteComment(id, name) {
    if (this.readCookie('usernm') === name) {
      if (window.confirm('Biztosan törlöd a hozzászólást?')) {
        this.http.delete(`http://localhost:8080/comment/delete/${id}`).subscribe(
        data => {
          console.log(data);
          location.reload();
        });
      }
    } else {
      window.alert('Csak a saját kommentjeidet törölheted!');
    }
  }


  filterComments(id) {
    const result = this.comments.filter(comment => comment.sentTo === id);
    return result;
  }


}
