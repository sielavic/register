import {net} from "../net/net.js"//net.js
export class registerModel{
    constructor() {
        let name = document.querySelector('.register #name');
        let mail = document.querySelector('.register #email');
        let pass = document.querySelector('.register #password');
        let submit = document.querySelector('.register .submit');

        submit.addEventListener('click', e => {

            const formData = new FormData();
            formData.append('name', name.value);
            formData.append('email', mail.value);
            formData.append('password', pass.value);

            let method = {
                method: 'POST',
                body: formData
            }

            net.get('/api/register', method, e => {
                //Validate
                    for (var i = 0; i < e.length; i++) {
                        if (e[i]['fail_email']){
                            var fail_email = e[i]['fail_email'];
                        }
                        if (e[i]['fail_pass']){
                            var fail_pass = e[i]['fail_pass'];
                        }
                        if (e[i]['fail_name']){
                            var fail_name = e[i]['fail_name'];
                        }
                        }

                if ( fail_email != undefined){
                    mail.classList.add('fail')
                }else {
                    mail.classList.remove('fail')
                }
                if ( fail_pass != undefined){
                    pass.classList.add('fail')
                }else {
                    pass.classList.remove('fail')
                }
                if ( fail_name != undefined){
                    name.classList.add('fail')
                }else {
                    name.classList.remove('fail')
                }
                //Finish
                console.log('jhgjhg',e);
            })

        })
    }
}
