window.addEventListener('DOMContentLoaded', function() {
    // Login Section
    var emailForLoginEle = document.querySelector('#emailForLogin')
    var pwForLoginEle = document.querySelector('#pwForLogin')
    var loginBtnForLoginEle = document.querySelector('#loginBtnForLogin')
    var loginMessageEle = document.querySelector('#loginMessage')
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            var email = firebase.auth().currentUser.email
            homeScreenEle.style.display = 'block'
            welcomeMessageEle.innerHTML = '歡迎回來, ' + email.split('@')[0]
            logoutBtnEle.forEach((ele) => {
                ele.style.display = 'flex'
            })
            iconEle.forEach((ele) => {
                ele.style.display = 'flex'
            })
        } else {
            loginScreenEle.style.display = 'block'
        }
    });
    emailForLoginEle.addEventListener('keypress', (e) => {
        if (e.which == 13) {
            e.preventDefault()
        }
    })
    loginBtnForLoginEle.addEventListener('click', function(event) {
        event.preventDefault()
        var loginFormData = {
            loginEmail: emailForLoginEle.value,
            loginPassword: pwForLoginEle.value,
        }

        function signInWithEmailPassword() {
            if (loginFormData.loginEmail == '電郵' || loginFormData.loginEmail == '') {
                loginMessageEle.className = 'box'
                loginMessageEle.innerHTML = '請輸入電郵'
                setTimeout(() => {
                    loginMessageEle.className = ''
                    loginMessageEle.innerHTML = ''
                }, 3000);
            } else if (loginFormData.loginPassword == '密碼' || loginFormData.loginPassword == '') {
                loginMessageEle.className = 'box'
                loginMessageEle.innerHTML = '請輸入密碼'
                setTimeout(() => {
                    loginMessageEle.className = ''
                    loginMessageEle.innerHTML = ''
                }, 3000);
            } else {
                firebase.auth().signInWithEmailAndPassword(loginFormData.loginEmail, loginFormData.loginPassword)
                    .then((user) => {
                        homeScreenEle.style.display = 'block'
                        loginScreenEle.style.display = 'none'
                        pwMgrScreenEle.style.display = 'none'
                        pwSaveScreenEle.style.display = 'none'
                        pwCreateScreenEle.style.display = 'none'
                        welcomeMessageEle.innerHTML = '歡迎回來, ' + loginFormData.loginEmail.split('@')[0]
                        iconEle.forEach((ele) => {
                            ele.style.display = 'flex'
                        })
                    })
                    .catch((error) => {
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        loginMessageEle.className = 'box'
                        loginMessageEle.innerHTML = errorMessage
                        setTimeout(() => {
                            loginMessageEle.className = ''
                            loginMessageEle.innerHTML = ''
                        }, 3000);
                    });
            }
        }
        signInWithEmailPassword()
    })

    // Logout Section
    logoutBtnEle.forEach((ele) => {
        ele.addEventListener('click', function() {
            firebase.auth().signOut().then(function() {
                location.reload()
            }).catch(function(error) {});
        })
    })
})