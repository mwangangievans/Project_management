import { Projects } from "./classes/projects.js"
import { Users} from "./classes/users.js"
import {Project_interface} from "./interfaces/interfaces.js"
const salamu= document.getElementById('salamu') as HTMLElement
const role_display = document.getElementById("role") as HTMLElement
const register_section = document.getElementById("register-section") as HTMLElement 
const login_section = document.getElementById("login-section") as HTMLElement 
const admin_user_dashboard = document.getElementById("admin-user-dashboard") as HTMLBodyElement
export const poject_list = document.getElementById("poject_list") as HTMLElement 
const logout = document.getElementById("logout") as HTMLElement 
const project_tab = document.getElementById("project_tab") as HTMLElement 
export const reder_div = document.getElementById("reder_div") as HTMLElement
export const render_users = document.getElementById("render_users") as HTMLElement
export const assign_btn = document.getElementById("assign-btn") as HTMLElement
export const assignment = document.getElementById("assignment") as HTMLElement






const token = localStorage.getItem('token') as string
const project_instance = new Projects();
const user_instance = new Users();


logout.addEventListener("click",()=>{


  if(token){
      localStorage.clear()  
  }
  location.href = 'index.html'
  login_section.style.display="block"
})


window.onload = () =>{
  const token = localStorage.getItem('token') as string

  
  if (!token) {
    location.href = 'index.html'    
  console.log("reloaded...");
}

  console.log("reloaded...");
  project_instance.pull_data()
  user_instance.pull_user_data()
}




// =================================modal===========================
// Get the modal
var modal = document.getElementById("myModal") as HTMLDivElement

// Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
assign_btn.onclick = function() {
  project_instance.assignProject
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal

span.addEventListener("click",()=>{
  modal.style.display = "none";

})

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}








    