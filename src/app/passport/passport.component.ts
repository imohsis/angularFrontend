import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Component({
 selector: 'app-passport',
 templateUrl: './passport.component.html',
 styleUrls: ['./passport.component.css']
})

export class PassportComponent implements OnInit {

 private books = []; // books to show on HTML
 private newBook = { }; // object to send POST request to Laravel back-end
 private oAuthURL = "http://localhost:8000/oauth/token"; // Passport authentication URL
 private apiURL = "http://localhost:8000/api/books"; // API URL, defined in /routes/api.php in Laravel back-end

 private accessToken = []; // variable to store the access token
 private headers = new Headers(); // headers for each request
 private options = new RequestOptions({ headers: this.headers });

 /* data to get Passport authentication */
 private postData = {
   grant_type: "password",
   client_id: '3',   // the client ID generate before
   client_secret: "jc9QeuxuO1VuxJJ8ZaHFvTN3CbfL4SR7joNXxP5b",   // the client secret generated before
   username: "precioustheguy@yahoo.com", // an gmailUser in Laravel database
   password: "theresa", // the user's password
   scope:'*'
 }

 constructor(private http: Http) {
   // all headers for JSON requests
   this.headers.append('Content-Type', 'application/json');
   this.headers.append('Accept', 'application/json');
 }

 ngOnInit(): void {
   // get authentication token
   this.getToken()
      .subscribe(data => {
         // set headers with Bearer token and save the token to access_token
         this.setToken(data);

         setTimeout(() => {
           this.getBooks()
               // make the request and store all books to "books" array
               .subscribe( res => {
                 this.books = res.books;    //this is the data that i need to loop over....
                // console.log(this.books)
               });
          }, 100);
  });
 }

 getToken() {
   return this.http.post(this.oAuthURL, this.postData)// (this.headers) this was added here as a parameter
                   .map(response => response.json().access_token);
 }   

 setToken(token) {
   this.headers.append('Authorization', 'Bearer ' + token); // add the Authentication header
   this.accessToken = token;  // save the access_token
 }

 getBooks() {
   return this.http.get(this.apiURL, this.options)
              .map(response => response.json());
 }
 addBook() {
  this.http.post(this.apiURL, JSON.stringify(this.newBook), this.options)
           .subscribe(data => {
               console.log(data);

              this.getBooks()
                  .subscribe(data => this.books = data.books     );
  });
}

}





































































































// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-passport',
//   templateUrl: './passport.component.html',
//   styleUrls: ['./passport.component.css']
// })
// export class PassportComponent implements OnInit {

//   constructor() { }

//   ngOnInit() {
//   }

// }
