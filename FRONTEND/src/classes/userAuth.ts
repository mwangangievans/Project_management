export const role_display = document.getElementById("role") as HTMLElement


export class Users {
    static getUser() {
        return new Users()
    }

    // login function....
    loginUser(email: string, password: string) {
        const prom = new Promise<{ error?: string, token?: string, message?: string }>((resolve, reject) => {
            fetch('http://localhost:5000/user/login', {
                headers:
                {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(
                    {
                        "email": email,
                        "password": password
                    })
            }).then(res => {
                resolve(res.json())
            }).then(err => {
                reject(err)
            })
        })
        prom.then(data => {
            data.token ? localStorage.setItem('token', data.token) : ''
            console.log(data);

            this.redict()
        }).catch(err => {
            console.log(err);
            return false
        })
    }

    // registration function.....
    register(name: string, email: string, password: string) {
        const prom = new Promise<any>((resolve, reject) => {
            fetch('http://localhost:5000/user/signup', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    "email": email,
                    "name": name,
                    "password": password
                })
            }).then(res => {
                resolve(res.json())
                // console.log(res);

            }).catch(err => {
                reject(err)
            })
        })

        prom.then(data => {
            // console.log(data);
            return data


        })

            .catch(err => console.log(err));

        return prom


    }

    redict() {

        const token = localStorage.getItem('token') as string
        if (!token) {
            return false
        }

        new Promise<{ name: string, role: string }>((resolve, reject) => {
            fetch('http://localhost:5000/user/check-user', {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'token': token
                },
                method: "GET",
            }).then(res => resolve(res.json())).then(err => reject(err))
        }).then(data => {
            console.log(data);
            localStorage.setItem('name', data.name)
            localStorage.setItem('role', data.role) 

            const role = localStorage.getItem('role') as string
            console.log(role);
            


            if (role === "Admin") {
                location.href = 'admin.html'

            } if(role === "user") {
                location.href = 'user.html'
            }

        })
    }

}
