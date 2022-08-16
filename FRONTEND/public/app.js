import { Users } from './classes/userAuth.js';
const Login = document.getElementById("Login-btn");
const hero_section = document.getElementById("main");
const login_section = document.getElementById("login-section");
const register_section = document.getElementById("register-section");
const register_btn = document.getElementById("register-btn");
const home_tab = document.getElementById("home-tab");
const user_email = document.getElementById("user_email");
const user_password = document.getElementById("user_password");
const submit = document.getElementById("submit");
const validation_message = document.getElementById("validation-message");
const validation_email = document.getElementById("validation-email");
// registration inputs...
const register_EMAIL = document.getElementById("register_EMAIL");
const register_NAEME = document.getElementById("register_NAEME");
const register_PASSWORD = document.getElementById("register_PASSWORD");
const register_form_data = document.getElementById("register-form-data");
const validation_message_register = document.getElementById("validation-message-register");
const validation_email_register = document.getElementById("validation-email-register");
const validation_userExist = document.getElementById("validation-userExist");
const registerSuccess = document.getElementById("registerSuccess");
// role_display.innerHTML += token
// Create a class to haddle login and registration...
Login.addEventListener('click', () => {
    hero_section.style.display = "none";
    login_section.style.display = "block";
});
register_btn.addEventListener('click', () => {
    hero_section.style.display = "none";
    register_section.style.display = "block";
});
submit.addEventListener('click', (e) => {
    e.preventDefault();
    const pass = user_password.value;
    const email_ = user_email.value;
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email_.match(validRegex)) {
        if (pass == '' || email_ == '') {
            validation_message.style.display = "block";
            setTimeout(() => {
                validation_message.style.display = "none";
                user_password.value = "";
                user_email.value = "";
            }, 5000);
            return false;
        }
        else {
            Users.getUser().loginUser(email_, pass);
        }
    }
    else {
        validation_email.style.display = "block";
        setTimeout(() => {
            validation_email.style.display = "none";
            user_password.value = "";
            user_email.value = "";
        }, 5000);
        return false;
    }
});
// clear fields after registration
const clearRegisterFields = () => {
    register_PASSWORD.value = "";
    register_EMAIL.value = "";
    register_NAEME.value = "";
};
// clear fields after login
const clearLoginFields = () => {
    register_PASSWORD.value = "";
    register_EMAIL.value = "";
    register_NAEME.value = "";
};
// register user.....
register_form_data.addEventListener('click', (e) => {
    e.preventDefault();
    const pass = register_PASSWORD.value;
    const email_ = register_EMAIL.value;
    const name = register_NAEME.value;
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (email_.match(validRegex)) {
        if (pass == '' || email_ == '' || name == '') {
            validation_message_register.style.display = "block";
            setTimeout(() => {
                validation_message_register.style.display = "none";
                clearRegisterFields();
            }, 5000);
            return false;
        }
        else {
            Users.getUser().register(name, email_, pass).then(data => {
                if (data.userExist) {
                    validation_userExist.innerHTML = "";
                    validation_userExist.style.display = "block";
                    validation_userExist.innerHTML += data.userExist;
                    setTimeout(() => {
                        validation_userExist.style.display = "none";
                        clearRegisterFields();
                        return false;
                    }, 5000);
                }
                else {
                    registerSuccess.innerHTML = "";
                    registerSuccess.style.display = "block";
                    registerSuccess.innerHTML += data.registerSuccess;
                    setTimeout(() => {
                        registerSuccess.style.display = "none";
                        register_section.style.display = "none";
                        login_section.style.display = "block";
                        user_email.value = register_EMAIL.value;
                        user_password.value = register_PASSWORD.value;
                        clearRegisterFields();
                    }, 5000);
                }
            });
        }
    }
    else {
        validation_email_register.style.display = "block";
        setTimeout(() => {
            validation_message_register.style.display = "none";
            clearRegisterFields();
        }, 5000);
        return false;
    }
});
