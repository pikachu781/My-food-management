import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
selector: 'app-profile',
templateUrl: './profile.component.html',
styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

profile:any={};

constructor(private http:HttpClient){}

ngOnInit(){
this.loadProfile();
}

// ✅ load profile using logged-in userId
loadProfile(){

const userId = localStorage.getItem("userId");

if(userId){
  this.http.get("http://localhost:8080/profile/" + userId)
  .subscribe((res:any)=>{
    this.profile=res;
  })
}

}
updateProfile(name:string,email:string,phone:string,address:string){

const userId = Number(localStorage.getItem("userId"));

let data:any = {
  id: userId
};

// ✅ only add fields if user typed something
if(name) data.name = name;
if(email) data.email = email;
if(phone) data.phone = phone;
if(address) data.address = address;

console.log("Sending:", data);

this.http.post("http://localhost:8080/profile/update",data)
.subscribe((res:any)=>{

this.profile = res;

alert("Profile Updated");

})

}
}