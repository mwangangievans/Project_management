import {Project_interface} from "../interfaces/interfaces"
import{reder_div ,assignment} from "../admin.js"
export class Projects {

   constructor(){
   }

//    ==============================================pull all projects======================

pull_data (){  
  
    const  token = localStorage.getItem('token') as string;
  const prom = new Promise<Project_interface[]>((resolve,reject)=>{
  
    fetch('http://localhost:5000/project/all-projects', {method: "GET",headers: {'Accept': 'application/json','Content-Type': 'application/json',token}})
    .then(result=>{
      resolve(result.json())   
    }).catch(error=>{
        reject(error)
    })
  }).then(data=>{ 
  
    this.display_all_projects(data)
  }
  
  ).catch(error=>{
    console.log(error);
    
  })
   }

//    ================================================render data====================================
   display_all_projects = (data:Project_interface[])=>{
                reder_div.innerHTML="";      
                reder_div.innerHTML= data.map((item) => {                             
                    return ` <tr>
                                <td>${item.project_name}</td>
                                <td>${new Date(item.completion_date).toDateString()}</td> 
                                <td>${item.project_description}</td>
                                <td>${item.Assigned_to}</td>
                                <td>${item.Is_completed ?"Completed":"Uncompleted"}</td>
                               <td> <button data-id="${item.project_id}" class="deletebtns" ">Delete</button></span>
                                </td>
                            </tr>`;
                })
                .join("");
                this.addListeners();
   
      }

      deleteProject = (id:string)=>{
        console.log("assign...clicked");
        
        const  token = localStorage.getItem('token') as string;
        const prom = new Promise<Project_interface[]>((resolve,reject)=>{
        
          fetch('http://localhost:5000/project/delete/'+id, {method: "DELETE",headers: {'Accept': 'application/json','Content-Type': 'application/json',token}})
          .then(result=>{
            resolve(result.json())   
          }).catch(error=>{
              reject(error)
          })
        }).then(data=>{
        console.log(data);
        this.pull_data()
        }
        
        ).catch(error=>{
          console.log(error);
          
        })
        
      }
      

      addListeners(){

                const Assigns = document.getElementsByClassName("Assign");
                
                
                for (const Assign of Assigns) {
                Assign.addEventListener("click", (e) => {
                    const id = Assign.getAttribute("data-id");
                    
                    if (id) this.deleteProject((id));
                });
                }

                // ============================
                const deletebtns = document.getElementsByClassName("deletebtns");
                
                for (const del of deletebtns) {
                del.addEventListener("click", (e) => {
                    const id = del.getAttribute("data-id");
                    
                    if (id) this.deleteProject((id));
                });
                }
      }


        assignProject = (data:Project_interface[])=>{
          reder_div.innerHTML="";      
          reder_div.innerHTML= data.map((item) => {                             
             
          })
          .join("");
          this.addListeners();
        }
}

   

//   ================================================delete project===========================================




