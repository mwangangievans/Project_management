import { render_users } from "../admin.js";
export class Users {
    constructor() {
        //    ================================================render data====================================
        this.display_all_users = (data) => {
            render_users.innerHTML = "";
            render_users.innerHTML = data.map((item) => {
                return ` <tr>
      <td>${item.user_name}</td>
      <td>${item.user_email}</td> 
      <td>${item.user_role}</td>
      <td> <button data-id="${item.user_id}" class="deletebtnuser" ">Delete</button></span>

  </tr>`;
            })
                .join("");
            this.addListeners();
        };
        this.deleteUser = (id) => {
            const token = localStorage.getItem('token');
            const prom = new Promise((resolve, reject) => {
                fetch('http://localhost:5000/user/delete/' + id, { method: "DELETE", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', token } })
                    .then(result => {
                    resolve(result.json());
                }).catch(error => {
                    reject(error);
                });
            }).then(data => {
                console.log(data);
                this.pull_user_data();
            }).catch(error => {
                console.log(error);
            });
        };
    }
    //    ==============================================pull all projects======================
    pull_user_data() {
        const token = localStorage.getItem('token');
        const prom = new Promise((resolve, reject) => {
            fetch('http://localhost:5000/user/all-users', { method: "GET", headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', token } })
                .then(result => {
                resolve(result.json());
            }).catch(error => {
                reject(error);
            });
        }).then(data => {
            console.log(data);
            this.display_all_users(data);
        }).catch(error => {
            console.log(error);
        });
    }
    addListeners() {
        // ============================
        const deletebtns = document.getElementsByClassName("deletebtnuser");
        console.log(deletebtns);
        for (const del of deletebtns) {
            del.addEventListener("click", (e) => {
                const id = del.getAttribute("data-id");
                console.log(id);
                if (id)
                    this.deleteUser((id));
            });
        }
    }
}
//   ================================================delete project===========================================
