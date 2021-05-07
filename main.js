var homeScreenEle = document.querySelector('#homeScreen')
var loginScreenEle = document.querySelector('#loginScreen')
var pwMgrScreenEle = document.querySelector('#pwMgrScreen')
var pwSaveScreenEle = document.querySelector('#pwSaveScreen')
var pwCreateScreenEle = document.querySelector('#pwCreateScreen')
var welcomeMessageEle = document.querySelector('#welcomeMessage')
var webNameEle = document.querySelector('#webName')
var webNameSplitEle = document.querySelector('#webNameSplit')
var iconEle = document.querySelectorAll('.icon')
var logoutBtnEle = document.querySelectorAll('.logoutBtn')
var homeBtnEle = document.querySelectorAll('.homeBtn')
var pwMgrBtnEle = document.querySelectorAll('.pwMgrBtn')
var pwSaveBtnEle = document.querySelectorAll('.pwSaveBtn')
var pwCreateBtnEle = document.querySelectorAll('.pwCreateBtn')
const db = firebase.firestore()
window.addEventListener('DOMContentLoaded', function() {
    function copyDivToClipboard(eleID) {
        var range = document.createRange();
        range.selectNodeContents(document.getElementById(eleID));
        window.getSelection().removeAllRanges(); // clear current selection
        window.getSelection().addRange(range); // to select text
        document.execCommand("copy");
        window.getSelection().removeAllRanges(); // to deselect
    }

    // Header Section
    var widthOver650px = window.matchMedia("(min-width: 650px)")
    if (matchMedia) {
        widthOver650px.addListener(WidthChange)
        WidthChange(widthOver650px)
    }

    function WidthChange(width) {
        if (width.matches) {
            webNameEle.style.display = 'block'
            webNameEle.style.width = '310px'
            webNameSplitEle.style.display = 'block'
        } else {
            webNameEle.style.display = 'none'
            webNameSplitEle.style.display = 'none'
        }
    }

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
            webNameEle.style.display = 'block'
            webNameSplitEle.style.display = 'block'
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
                        if (!window.matchMedia("(min-width: 650px)").matches) {
                            webNameEle.style.display = 'none'
                            webNameSplitEle.style.display = 'none'
                        }
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

    // Home Section
    var countdownEle = document.querySelector('#countdown')
    homeBtnEle.forEach((ele) => {
        ele.addEventListener('click', () => {
            homeScreenEle.style.display = 'none'
            loginScreenEle.style.display = 'none'
            pwMgrScreenEle.style.display = 'none'
            pwSaveScreenEle.style.display = 'none'
            pwCreateScreenEle.style.display = 'none'
            setTimeout(() => {
                homeScreenEle.style.display = 'block'
                loginScreenEle.style.display = 'none'
                pwMgrScreenEle.style.display = 'none'
                pwSaveScreenEle.style.display = 'none'
                pwCreateScreenEle.style.display = 'none'
            }, 500);
        })
    })

    function countdown() {
        var date = Math.floor(Date.now() / 1000)
        var sec = date % 60
        var min = (date - sec) / 60
        var hrs = (min - min % 60) / 60
        var day = (hrs - hrs % 24) / 24
        var startDate = new Date(2018, 4, 12) / 1000
        var secForStartDate = startDate % 60
        var minForStartDate = (startDate - secForStartDate) / 60
        var hrsForStartDate = (minForStartDate - minForStartDate % 60) / 60
        var dayForStartDate = (hrsForStartDate - hrsForStartDate % 24) / 24
        countdownEle.innerHTML = `與BB豬已一起渡過${day - dayForStartDate}日`
    }
    countdown()
    setInterval(() => {
        countdown()
    }, 1000);

    // Password Manager
    var webListEle = document.querySelector('#webList')
    var pwDetailEle = document.querySelector('#pwDetail')
    var searchBoxEle = document.querySelector('#searchBox')
    pwMgrBtnEle.forEach((ele) => {
        ele.addEventListener('click', function() {
            homeScreenEle.style.display = 'none'
            loginScreenEle.style.display = 'none'
            pwMgrScreenEle.style.display = 'none'
            pwSaveScreenEle.style.display = 'none'
            pwCreateScreenEle.style.display = 'none'
            setTimeout(() => {
                homeScreenEle.style.display = 'none'
                loginScreenEle.style.display = 'none'
                pwMgrScreenEle.style.display = 'block'
                pwSaveScreenEle.style.display = 'none'
                pwCreateScreenEle.style.display = 'none'
            }, 500);
            searchBoxEle.innerHTML = '搜尋...'
            while (pwDetailEle.firstChild) {
                pwDetailEle.removeChild(pwDetailEle.firstChild)
            }
            db.collection('Password').where('User', '==', firebase.auth().currentUser.email.split('@')[0]).get().then(function(snapshot) {
                var arrayOfWeb = []
                snapshot.forEach((doc) => {
                    while (webListEle.firstChild) {
                        webListEle.removeChild(webListEle.firstChild)
                    }
                    arrayOfWeb.push(doc.data().Web)
                    var uniqueArrayOfWeb = new Set(arrayOfWeb.sort())
                    uniqueArrayOfWeb.forEach((web) => {
                        var webDiv = document.createElement('div')
                        webDiv.className = 'link web'
                        webDiv.id = web
                        webDiv.innerHTML = web
                        webListEle.append(webDiv)
                    })
                })
                var webEle = document.querySelectorAll('.web')
                webEle.forEach((div) => {
                    div.addEventListener('click', function() {
                        while (pwDetailEle.firstChild) {
                            pwDetailEle.removeChild(pwDetailEle.firstChild)
                        }
                        var pwListHeading = document.createElement('div')
                        pwListHeading.className = 'pwContent'
                        pwListHeading.style.flex = '1'
                        pwListHeading.innerHTML = div.innerHTML
                        pwDetailEle.append(pwListHeading)
                        db.collection('Password').where('Web', '==', div.innerHTML.replace('&amp;', '&')).orderBy('Index').get().then(function(snapshot) {
                            snapshot.forEach((doc) => {
                                if (firebase.auth().currentUser.email.split('@')[0] == doc.data().User) {
                                    var flexboxContainer = document.createElement('div')
                                    flexboxContainer.className = 'flexbox'
                                    pwDetailEle.append(flexboxContainer)
                                    var div = document.createElement('div')
                                    div.className = 'pwContent'
                                    div.style.flex = '1'
                                    flexboxContainer.append(div)
                                    var pwContent = document.createElement('div')
                                    pwContent.innerHTML = `
                                            <span>登入ID: </span>
                                            <div id='${doc.data().ID}' class='pw textField' style='width: 100%;'>${doc.data().ID}</div>
                                            <span>登入密碼: </span>
                                            <div id='${doc.data().Password}' class='pw textField' style='width: 100%;'>${doc.data().Password}</div>
                                            `
                                    div.append(pwContent)
                                    var flexbox = document.createElement('div')
                                    flexbox.style.display = 'flex'
                                    flexbox.style.flexWrap = 'wrap'
                                    div.append(flexbox)
                                    var copyIDButton = document.createElement('button')
                                    copyIDButton.innerHTML = '複製ID'
                                    copyIDButton.style.margin = '5px'
                                    copyIDButton.style.flex = 1
                                    var copyPasswordButton = document.createElement('button')
                                    copyPasswordButton.innerHTML = '複製密碼'
                                    copyPasswordButton.style.margin = '5px'
                                    copyPasswordButton.style.flex = 1
                                    var brForFlex = document.createElement('div')
                                    brForFlex.style.flexBasis = '100%'
                                    brForFlex.style.height = '0'
                                    var modifyButton = document.createElement('button')
                                    modifyButton.innerHTML = '編輯'
                                    modifyButton.style.margin = '5px'
                                    modifyButton.style.flex = 1
                                    var deleteButton = document.createElement('button')
                                    deleteButton.innerHTML = '刪除'
                                    deleteButton.style.margin = '5px'
                                    deleteButton.style.flex = 1
                                    copyIDButton.addEventListener('click', function() {
                                        copyDivToClipboard(doc.data().ID)
                                    })
                                    copyPasswordButton.addEventListener('click', function() {
                                        copyDivToClipboard(doc.data().Password.replace('&amp;', '&'))
                                    })
                                    modifyButton.addEventListener('click', () => {
                                        var alertBoxBackground = document.createElement('div')
                                        alertBoxBackground.className = 'alertBoxBackground'
                                        var div = document.createElement('div')
                                        div.className = 'flexbox alertBox'
                                        var loginIDForModifyLabel = document.createElement('span')
                                        loginIDForModifyLabel.innerHTML = '登入ID'
                                        var loginIDForModifyInput = document.createElement('div')
                                        loginIDForModifyInput.className = 'textField'
                                        loginIDForModifyInput.innerHTML = '登入ID'
                                        loginIDForModifyInput.contentEditable = 'true'
                                        loginIDForModifyInput.style.width = '200px'
                                        var loginPwForModifyLabel = document.createElement('span')
                                        loginPwForModifyLabel.innerHTML = '登入密碼'
                                        var loginPwForModifyInput = document.createElement('div')
                                        loginPwForModifyInput.className = 'textField'
                                        loginPwForModifyInput.innerHTML = '登入密碼'
                                        loginPwForModifyInput.contentEditable = 'true'
                                        loginPwForModifyInput.style.width = '200px'
                                        var submitBtnForModify = document.createElement('button')
                                        submitBtnForModify.type = 'submit'
                                        submitBtnForModify.innerHTML = '儲存'
                                        submitBtnForModify.style.width = '50%'
                                        var cancelBtnForModify = document.createElement('button')
                                        cancelBtnForModify.innerHTML = '取消'
                                        cancelBtnForModify.style.width = '50%'
                                        var modifyStatus = document.createElement('div')
                                        modifyStatus.style.display = 'none'
                                        loginIDForModifyInput.addEventListener('focus', () => {
                                            if (loginIDForModifyInput.innerHTML == '登入ID') {
                                                loginIDForModifyInput.innerHTML = ''
                                                loginIDForModifyInput.style.outlineStyle = 'none'
                                            }
                                        })
                                        loginIDForModifyInput.addEventListener('focusout', () => {
                                            if (loginIDForModifyInput.innerHTML == '') {
                                                loginIDForModifyInput.innerHTML = '登入ID'
                                            }
                                        })
                                        loginIDForModifyInput.addEventListener('keypress', (e) => {
                                            if (e.which == 13) {
                                                e.preventDefault()
                                            }
                                        })
                                        loginPwForModifyInput.addEventListener('focus', () => {
                                            if (loginPwForModifyInput.innerHTML == '登入密碼') {
                                                loginPwForModifyInput.innerHTML = ''
                                                loginPwForModifyInput.style.outlineStyle = 'none'
                                            }
                                        })
                                        loginPwForModifyInput.addEventListener('focusout', () => {
                                            if (loginPwForModifyInput.innerHTML == '') {
                                                loginPwForModifyInput.innerHTML = '登入密碼'
                                            }
                                        })
                                        loginPwForModifyInput.addEventListener('keypress', (e) => {
                                            if (e.which == 13) {
                                                e.preventDefault()
                                            }
                                        })
                                        submitBtnForModify.addEventListener('click', () => {
                                            event.preventDefault()
                                            var date = new Date()
                                            var modifyData = {
                                                LoginID: loginIDForModifyInput.innerHTML,
                                                LoginPw: loginPwForModifyInput.innerHTML,
                                                OriginalPw: doc.data().Password,
                                            }
                                            if ((!modifyData.LoginID || modifyData.LoginID == '登入ID') && (!modifyData.LoginPw || modifyData.LoginPw == '登入密碼')) {
                                                modifyStatus.style.display = 'block'
                                                modifyStatus.innerHTML = '請輸入ID或密碼!!!'
                                                setTimeout(() => {
                                                    modifyStatus.style.display = 'none'
                                                    modifyStatus.innerHTML = ''
                                                }, 3000);
                                            } else if (!modifyData.LoginPw || modifyData.LoginPw == '登入密碼') {
                                                db.collection('Password').doc(doc.id).update({
                                                    ID: modifyData.LoginID
                                                })
                                                modifyStatus.style.display = 'block'
                                                modifyStatus.innerHTML = 'ID已更新!!!'
                                                setTimeout(() => {
                                                    modifyStatus.style.display = 'none'
                                                    modifyStatus.innerHTML = ''
                                                    loginIDForModifyInput.innerHTML = '登入ID'
                                                    loginIDForModifyInput.style.color = '#aaaaaa'
                                                    loginPwForModifyInput.innerHTML = '登入密碼'
                                                    loginPwForModifyInput.style.color = '#aaaaaa'
                                                    alertBoxBackground.parentNode.removeChild(alertBoxBackground)
                                                    var pwListRefresh = document.querySelector(`#${doc.data().Web}`)
                                                    try {
                                                        pwMgrBtnEle.forEach((ele) => {
                                                            ele.click()
                                                        })
                                                        pwListRefresh.click()
                                                    } catch (err) {}
                                                }, 3000);
                                            } else if (!modifyData.LoginID || modifyData.LoginID == '登入ID') {
                                                console.log(doc.data().LastModify1 !== undefined)
                                                console.log(doc.data().LastModify2 !== undefined)
                                                if (doc.data().LastModify2 !== undefined) {
                                                    db.collection('Password').doc(doc.id).update({
                                                        Password: modifyData.LoginPw,
                                                        LastModify3: doc.data().LastModify2,
                                                        LastModify2: doc.data().LastModify1,
                                                        LastModify1: modifyData.OriginalPw + ' - ' + date,
                                                    })
                                                } else if (doc.data().LastModify1 !== undefined) {
                                                    db.collection('Password').doc(doc.id).update({
                                                        Password: modifyData.LoginPw,
                                                        LastModify2: doc.data().LastModify1,
                                                        LastModify1: modifyData.OriginalPw + ' - ' + date,
                                                    })
                                                } else {
                                                    db.collection('Password').doc(doc.id).update({
                                                        Password: modifyData.LoginPw,
                                                        LastModify1: modifyData.OriginalPw + ' - ' + date,
                                                    })
                                                }
                                                modifyStatus.style.display = 'block'
                                                modifyStatus.innerHTML = '密碼已更新!!!'
                                                setTimeout(() => {
                                                    modifyStatus.style.display = 'none'
                                                    modifyStatus.innerHTML = ''
                                                    loginIDForModifyInput.innerHTML = '登入ID'
                                                    loginIDForModifyInput.style.color = '#aaaaaa'
                                                    loginPwForModifyInput.innerHTML = '登入密碼'
                                                    loginPwForModifyInput.style.color = '#aaaaaa'
                                                    alertBoxBackground.parentNode.removeChild(alertBoxBackground)
                                                    var pwListRefresh = document.querySelector(`#${doc.data().Web}`)
                                                    pwMgrBtnEle.forEach((ele) => {
                                                        ele.click()
                                                    })
                                                    try {
                                                        pwListRefresh.click()
                                                    } catch (err) {}
                                                }, 3000);
                                            } else {
                                                if (doc.data().LastModify2 == true) {
                                                    db.collection('Password').doc(doc.id).update({
                                                        ID: modifyData.LoginID,
                                                        Password: modifyData.LoginPw,
                                                        LastModify3: doc.data().LastModify2,
                                                        LastModify2: doc.data().LastModify1,
                                                        LastModify1: modifyData.OriginalPw + ' - ' + date,
                                                    })
                                                } else if (doc.data().LastModify1 == true) {
                                                    db.collection('Password').doc(doc.id).update({
                                                        ID: modifyData.LoginID,
                                                        Password: modifyData.LoginPw,
                                                        LastModify2: doc.data().LastModify1,
                                                        LastModify1: modifyData.OriginalPw + ' - ' + date,
                                                    })
                                                } else {
                                                    db.collection('Password').doc(doc.id).update({
                                                        ID: modifyData.LoginID,
                                                        Password: modifyData.LoginPw,
                                                        LastModify1: modifyData.OriginalPw + ' - ' + date,
                                                    })
                                                }
                                                modifyStatus.style.display = 'block'
                                                modifyStatus.innerHTML = 'ID及密碼已更新!!!'
                                                setTimeout(() => {
                                                    modifyStatus.style.display = 'none'
                                                    modifyStatus.innerHTML = ''
                                                    loginIDForModifyInput.innerHTML = '登入ID'
                                                    loginIDForModifyInput.style.color = '#aaaaaa'
                                                    loginPwForModifyInput.innerHTML = '登入密碼'
                                                    loginPwForModifyInput.style.color = '#aaaaaa'
                                                    alertBoxBackground.parentNode.removeChild(alertBoxBackground)
                                                    var pwListRefresh = document.querySelector(`#${doc.data().Web}`)
                                                    pwMgrBtnEle.forEach((ele) => {
                                                        ele.click()
                                                    })
                                                    try {
                                                        pwListRefresh.click()
                                                    } catch (err) {}
                                                }, 3000);
                                            }
                                        })
                                        cancelBtnForModify.addEventListener('click', () => {
                                            loginIDForModifyInput.innerHTML = '登入ID'
                                            loginIDForModifyInput.style.color = '#aaaaaa'
                                            loginPwForModifyInput.innerHTML = '登入密碼'
                                            loginPwForModifyInput.style.color = '#aaaaaa'
                                            alertBoxBackground.parentNode.removeChild(alertBoxBackground)
                                        })
                                        pwMgrScreenEle.append(alertBoxBackground)
                                        alertBoxBackground.append(div)
                                        div.append(loginIDForModifyLabel)
                                        div.append(loginIDForModifyInput)
                                        div.append(loginPwForModifyLabel)
                                        div.append(loginPwForModifyInput)
                                        div.append(submitBtnForModify)
                                        div.append(cancelBtnForModify)
                                        div.append(modifyStatus)
                                    })
                                    deleteButton.addEventListener('click', function() {
                                        var alertBoxBackground = document.createElement('div')
                                        alertBoxBackground.className = 'alertBoxBackground'
                                        var div = document.createElement('div')
                                        div.className = 'flexbox alertBox'
                                        var alertText = document.createElement('div')
                                        alertText.innerHTML = '注意!!! <br>是否確認刪除密碼?<br>動作將無法復原!!!'
                                        alertText.style.whiteSpace = 'nowrap'
                                        alertText.style.padding = '0 5px'
                                        alertText.style.textAlign = 'center'
                                        var deleteYesButton = document.createElement('button')
                                        deleteYesButton.innerHTML = '是'
                                        deleteYesButton.style.margin = '5px'
                                        deleteYesButton.style.flex = '1'
                                        var deleteNoButton = document.createElement('button')
                                        deleteNoButton.innerHTML = '否'
                                        deleteNoButton.style.margin = '5px'
                                        deleteNoButton.style.flex = '1'
                                        deleteYesButton.addEventListener('click', () => {
                                            var pwListRefresh = document.querySelector(`#${doc.data().Web}`)
                                            db.collection('Password').doc(doc.id).delete()
                                            alertBoxBackground.parentNode.removeChild(alertBoxBackground)
                                            setTimeout(() => {
                                                pwMgrBtnEle.forEach((ele) => {
                                                    ele.click()
                                                })
                                                try {
                                                    pwListRefresh.click()
                                                } catch (err) {}
                                            }, 100);
                                        })
                                        deleteNoButton.addEventListener('click', () => {
                                            alertBoxBackground.parentNode.removeChild(alertBoxBackground)
                                        })
                                        pwMgrScreenEle.append(alertBoxBackground)
                                        alertBoxBackground.append(div)
                                        div.append(alertText)
                                        div.append(deleteYesButton)
                                        div.append(deleteNoButton)
                                    })
                                    flexbox.append(copyIDButton)
                                    flexbox.append(copyPasswordButton)
                                    flexbox.append(brForFlex)
                                    flexbox.append(modifyButton)
                                    flexbox.append(deleteButton)
                                    var moveBtnContainer = document.createElement('div')
                                    moveBtnContainer.className = 'flexbox'
                                    moveBtnContainer.style.flexDirection = 'column'
                                    var moveUpBtn = document.createElement('div')
                                    moveUpBtn.className = 'pwContent link'
                                    moveUpBtn.style.width = 'calc(30px + 1rem)'
                                    moveUpBtn.style.padding = '10px 0'
                                    moveUpBtn.style.textAlign = 'center'
                                    moveUpBtn.innerHTML = '△'
                                    var positionIndex = document.createElement('div')
                                    positionIndex.className = 'pwContent'
                                    positionIndex.id = `${doc.data().Web}${doc.data().Index}`
                                    positionIndex.style.width = 'calc(30px + 1rem)'
                                    positionIndex.style.padding = '10px 0'
                                    positionIndex.style.textAlign = 'center'
                                    positionIndex.innerHTML = doc.data().Index
                                    var moveDownBtn = document.createElement('div')
                                    moveDownBtn.className = 'pwContent link'
                                    moveDownBtn.style.width = 'calc(30px + 1rem)'
                                    moveDownBtn.style.padding = '10px 0'
                                    moveDownBtn.style.textAlign = 'center'
                                    moveDownBtn.innerHTML = '▽'
                                    moveUpBtn.addEventListener('click', () => {
                                        if (doc.data().Index !== 1) {
                                            db.collection('Password').where('Web', '==', doc.data().Web).where('Index', '==', Number(doc.data().Index) - 1).limit(1).get().then((snapshot) => {
                                                snapshot.forEach((doc) => {
                                                    db.collection('Password').doc(doc.id).update({
                                                        Index: Number(doc.data().Index) + 1
                                                    })
                                                })
                                            })
                                            db.collection('Password').doc(doc.id).update({
                                                Index: Number(doc.data().Index) - 1
                                            })
                                        }
                                        var pwListRefresh = document.querySelector(`#${doc.data().Web}`)
                                        setTimeout(() => {
                                            pwListRefresh.click()
                                        }, 500);
                                    })
                                    moveDownBtn.addEventListener('click', () => {
                                        db.collection('Password').where('Web', '==', doc.data().Web).where('Index', '==', Number(doc.data().Index) + 1).limit(1).get().then((snapshot) => {
                                            snapshot.forEach((doc) => {
                                                db.collection('Password').doc(doc.id).update({
                                                    Index: Number(doc.data().Index) - 1
                                                })
                                            })
                                        })
                                        db.collection('Password').doc(doc.id).update({
                                            Index: Number(doc.data().Index) + 1
                                        })
                                        var pwListRefresh = document.querySelector(`#${doc.data().Web}`)
                                        setTimeout(() => {
                                            pwListRefresh.click()
                                        }, 500);
                                    })
                                    flexboxContainer.append(moveBtnContainer)
                                    moveBtnContainer.append(moveUpBtn)
                                    moveBtnContainer.append(positionIndex)
                                    moveBtnContainer.append(moveDownBtn)
                                }
                            })
                        })
                    })
                })
            })
            searchBoxEle.addEventListener('focus', () => {
                if (searchBoxEle.innerHTML == '搜尋...') {
                    searchBoxEle.innerHTML = ''
                    searchBoxEle.style.outlineStyle = 'none'
                }
            })
            searchBoxEle.addEventListener('focusout', () => {
                if (searchBoxEle.innerHTML == '') {
                    searchBoxEle.innerHTML = '搜尋...'
                }
            })
            searchBoxEle.addEventListener('keypress', (e) => {
                if (e.which == 13) {
                    e.preventDefault()
                }
            })
            var events = ['input', 'change', 'cut', 'copy', 'paste', 'keypress']
            events.forEach((event) => {
                searchBoxEle.addEventListener(event, () => {
                    var webs = document.querySelectorAll('.web')
                    webs.forEach((web) => {
                        if (searchBoxEle.innerHTML == '') {
                            web.style.display = 'block'
                        } else {
                            if (!web.innerHTML.toLowerCase().includes(searchBoxEle.innerHTML.toLowerCase())) {
                                web.style.display = 'none'
                            } else {
                                web.style.display = 'block'
                            }
                        }
                    })
                })
            })
        })
    })

    // Password Saver
    var webSelectionForPwSaveEle = document.querySelector('#webSelectionForPwSave')
    var webIfOtherForPwSaveEle = document.querySelector('#webIfOtherForPwSave')
    var loginIDForPwSaveEle = document.querySelector('#loginIDForPwSave')
    var loginPwForPwSaveEle = document.querySelector('#loginPwForPwSave')
    var saveBtnForPwSaveEle = document.querySelector('#saveBtnForPwSave')
    var savingStatusForPwSaveEle = document.querySelector('#savingStatusForPwSave')

    function refreshWebSelectionForPwSave() {
        db.collection('Password').where('User', '==', firebase.auth().currentUser.email.split('@')[0]).get().then(function(snapshot) {
            var arrayOfWeb = []
            snapshot.forEach((doc) => {
                while (webSelectionForPwSaveEle.firstChild) {
                    webSelectionForPwSaveEle.removeChild(webSelectionForPwSaveEle.firstChild)
                }
                arrayOfWeb.push(doc.data().Web)
                var uniqueArrayOfWeb = new Set(arrayOfWeb.sort())
                uniqueArrayOfWeb.forEach((web) => {
                    var webOption = document.createElement('option')
                    webOption.innerHTML = web
                    webOption.value = web
                    webSelectionForPwSaveEle.append(webOption)
                })
            })
            var webOtherOption = document.createElement('option')
            webOtherOption.innerHTML = '其他'
            webOtherOption.value = 'Other'
            webSelectionForPwSaveEle.append(webOtherOption)
        })
    }
    pwSaveBtnEle.forEach((ele) => {
        ele.addEventListener('click', function() {
            homeScreenEle.style.display = 'none'
            loginScreenEle.style.display = 'none'
            pwMgrScreenEle.style.display = 'none'
            pwSaveScreenEle.style.display = 'none'
            pwCreateScreenEle.style.display = 'none'
            setTimeout(() => {
                homeScreenEle.style.display = 'none'
                loginScreenEle.style.display = 'none'
                pwMgrScreenEle.style.display = 'none'
                pwSaveScreenEle.style.display = 'block'
                pwCreateScreenEle.style.display = 'none'
            }, 500);
            webIfOtherForPwSaveEle.innerHTML = '其他網頁...'
            webIfOtherForPwSaveEle.style.color = '#aaaaaa'
            loginIDForPwSaveEle.innerHTML = '登入ID'
            loginIDForPwSaveEle.style.color = '#aaaaaa'
            loginPwForPwSaveEle.innerHTML = '登入密碼'
            loginPwForPwSaveEle.style.color = '#aaaaaa'
            refreshWebSelectionForPwSave()
            webIfOtherForPwSaveEle.addEventListener('focus', () => {
                if (webIfOtherForPwSaveEle.innerHTML == '其他網頁...') {
                    webIfOtherForPwSaveEle.innerHTML = ''
                    webIfOtherForPwSaveEle.style.outlineStyle = 'none'
                }
            })
            webIfOtherForPwSaveEle.addEventListener('focusout', () => {
                if (webIfOtherForPwSaveEle.innerHTML == '') {
                    webIfOtherForPwSaveEle.innerHTML = '其他網頁...'
                }
            })
            webIfOtherForPwSaveEle.addEventListener('keypress', (e) => {
                if (e.which == 13) {
                    e.preventDefault()
                }
            })
            loginIDForPwSaveEle.addEventListener('focus', () => {
                if (loginIDForPwSaveEle.innerHTML == '登入ID') {
                    loginIDForPwSaveEle.innerHTML = ''
                    loginIDForPwSaveEle.style.outlineStyle = 'none'
                }
            })
            loginIDForPwSaveEle.addEventListener('focusout', () => {
                if (loginIDForPwSaveEle.innerHTML == '') {
                    loginIDForPwSaveEle.innerHTML = '登入ID'
                }
            })
            loginIDForPwSaveEle.addEventListener('keypress', (e) => {
                if (e.which == 13) {
                    e.preventDefault()
                }
            })
            loginPwForPwSaveEle.addEventListener('focus', () => {
                if (loginPwForPwSaveEle.innerHTML == '登入密碼') {
                    loginPwForPwSaveEle.innerHTML = ''
                    loginPwForPwSaveEle.style.outlineStyle = 'none'
                }
            })
            loginPwForPwSaveEle.addEventListener('focusout', () => {
                if (loginPwForPwSaveEle.innerHTML == '') {
                    loginPwForPwSaveEle.innerHTML = '登入密碼'
                }
            })
            loginPwForPwSaveEle.addEventListener('keypress', (e) => {
                if (e.which == 13) {
                    e.preventDefault()
                }
            })
        })
    })
    saveBtnForPwSaveEle.addEventListener('click', () => {
        event.preventDefault()
        var savePwDataForPwSave = {
            Web: webSelectionForPwSaveEle[webSelectionForPwSaveEle.selectedIndex].value,
            WebIfOther: webIfOtherForPwSaveEle.innerHTML,
            LoginID: loginIDForPwSaveEle.innerHTML,
            LoginPw: loginPwForPwSaveEle.innerHTML,
        }
        if (savePwDataForPwSave.Web == 'Other' && (savePwDataForPwSave.WebIfOther == '其他網頁...' || savePwDataForPwSave.WebIfOther == '')) {
            savingStatusForPwSaveEle.className = 'box'
            savingStatusForPwSaveEle.innerHTML = '欠缺網頁名稱!'
            setTimeout(() => {
                savingStatusForPwSaveEle.className = ''
                savingStatusForPwSaveEle.innerHTML = ''
            }, 3000);
        } else if (savePwDataForPwSave.Web == 'Other' && (savePwDataForPwSave.WebIfOther.includes('@') || savePwDataForPwSave.WebIfOther.startsWith('0') || savePwDataForPwSave.WebIfOther.startsWith('1') || savePwDataForPwSave.WebIfOther.startsWith('2') || savePwDataForPwSave.WebIfOther.startsWith('3') || savePwDataForPwSave.WebIfOther.startsWith('4') || savePwDataForPwSave.WebIfOther.startsWith('5') || savePwDataForPwSave.WebIfOther.startsWith('6') || savePwDataForPwSave.WebIfOther.startsWith('7') || savePwDataForPwSave.WebIfOther.startsWith('8') || savePwDataForPwSave.WebIfOther.startsWith('9'))) {
            savingStatusForPwSaveEle.className = 'box'
            savingStatusForPwSaveEle.innerHTML = '欠缺網頁無效!'
            setTimeout(() => {
                savingStatusForPwSaveEle.className = ''
                savingStatusForPwSaveEle.innerHTML = ''
            }, 3000);
        } else if (savePwDataForPwSave.LoginID == '登入ID' || savePwDataForPwSave.LoginID == '') {
            savingStatusForPwSaveEle.className = 'box'
            savingStatusForPwSaveEle.innerHTML = '欠缺登入ID!'
            setTimeout(() => {
                savingStatusForPwSaveEle.className = ''
                savingStatusForPwSaveEle.innerHTML = ''
            }, 3000);
        } else if (savePwDataForPwSave.LoginPw == '') {
            savingStatusForPwSaveEle.className = 'box'
            savingStatusForPwSaveEle.innerHTML = '欠缺登入密碼!'
            setTimeout(() => {
                savingStatusForPwSaveEle.className = ''
                savingStatusForPwSaveEle.innerHTML = ''
            }, 3000);
        } else {
            if (savePwDataForPwSave.Web !== 'Other') {
                var numOfPwForPwSave
                db.collection('Password').where('Web', '==', savePwDataForPwSave.Web).orderBy('Index', 'desc').limit(1).get().then((snapshot) => {
                    snapshot.forEach((doc) => {
                        numOfPwForPwSave = doc.data().Index + 1
                    })
                    db.collection('Password').add({
                        Web: savePwDataForPwSave.Web,
                        ID: savePwDataForPwSave.LoginID,
                        Password: savePwDataForPwSave.LoginPw,
                        User: firebase.auth().currentUser.email.split('@')[0],
                        Index: numOfPwForPwSave,
                    })
                    savingStatusForPwSaveEle.innerHTML = '密碼已儲存!'
                    savingStatusForPwSaveEle.className = 'box'
                    setTimeout(() => {
                        savingStatusForPwSaveEle.innerHTML = ''
                        savingStatusForPwSaveEle.className = ''
                        webIfOtherForPwSaveEle.innerHTML = '其他網頁...'
                        webIfOtherForPwSaveEle.style.color = '#aaaaaa'
                        loginIDForPwSaveEle.innerHTML = '登入ID'
                        loginIDForPwSaveEle.style.color = '#aaaaaa'
                        loginPwForPwSaveEle.innerHTML = '登入密碼'
                        loginPwForPwSaveEle.style.color = '#aaaaaa'
                        refreshWebSelectionForPwSave()
                    }, 3000);
                })
            } else {
                db.collection('Password').add({
                    Web: savePwDataForPwSave.WebIfOther,
                    ID: savePwDataForPwSave.LoginID,
                    Password: savePwDataForPwSave.LoginPw,
                    User: firebase.auth().currentUser.email.split('@')[0],
                    Index: 1,
                })
                savingStatusForPwSaveEle.innerHTML = '密碼已儲存!'
                savingStatusForPwSaveEle.className = 'box'
                setTimeout(() => {
                    savingStatusForPwSaveEle.innerHTML = ''
                    savingStatusForPwSaveEle.className = ''
                    webIfOtherForPwSaveEle.innerHTML = '其他網頁...'
                    webIfOtherForPwSaveEle.style.color = '#aaaaaa'
                    loginIDForPwSaveEle.innerHTML = '登入ID'
                    loginIDForPwSaveEle.style.color = '#aaaaaa'
                    loginPwForPwSaveEle.innerHTML = '登入密碼'
                    loginPwForPwSaveEle.style.color = '#aaaaaa'
                    refreshWebSelectionForPwSave()
                }, 3000);
            }
        }
    })

    // Password Creator
    var pwGenFormEle = document.querySelector('#pwGenForm')
    var pwGenSubmitEle = document.querySelector('#pwGenSubmit')
    var showPwForGenEle = document.querySelector('#showPwForGen')
    var copyGenPwEle = document.querySelector('#copyGenPw')
    var webSelectionForGenPwEle = document.querySelector('#webSelectionForGenPw')
    var webIfOtherForGenPwEle = document.querySelector('#webIfOtherForGenPw')
    var loginIDForGenPwEle = document.querySelector('#loginIDForGenPw')
    var saveBtnForGenPwEle = document.querySelector('#saveBtnForGenPw')
    var savingStatusEle = document.querySelector('#savingStatusForGenPw')

    function refreshWebSelectionForPwGen() {
        db.collection('Password').where('User', '==', firebase.auth().currentUser.email.split('@')[0]).get().then(function(snapshot) {
            var arrayOfWeb = []
            snapshot.forEach((doc) => {
                while (webSelectionForGenPwEle.firstChild) {
                    webSelectionForGenPwEle.removeChild(webSelectionForGenPwEle.firstChild)
                }
                arrayOfWeb.push(doc.data().Web)
                var uniqueArrayOfWeb = new Set(arrayOfWeb.sort())
                uniqueArrayOfWeb.forEach((web) => {
                    var webOption = document.createElement('option')
                    webOption.innerHTML = web
                    webOption.value = web
                    webSelectionForGenPwEle.append(webOption)
                })
            })
            var webOtherOption = document.createElement('option')
            webOtherOption.innerHTML = '其他'
            webOtherOption.value = 'Other'
            webSelectionForGenPwEle.append(webOtherOption)
        })
    }
    pwCreateBtnEle.forEach((ele) => {
        ele.addEventListener('click', function() {
            homeScreenEle.style.display = 'none'
            loginScreenEle.style.display = 'none'
            pwMgrScreenEle.style.display = 'none'
            pwSaveScreenEle.style.display = 'none'
            pwCreateScreenEle.style.display = 'none'
            setTimeout(() => {
                homeScreenEle.style.display = 'none'
                loginScreenEle.style.display = 'none'
                pwMgrScreenEle.style.display = 'none'
                pwSaveScreenEle.style.display = 'none'
                pwCreateScreenEle.style.display = 'block'
            }, 500);
            webIfOtherForGenPwEle.innerHTML = '其他網頁...'
            webIfOtherForGenPwEle.style.color = '#aaaaaa'
            loginIDForGenPwEle.innerHTML = '登入ID'
            loginIDForGenPwEle.style.color = '#aaaaaa'
            refreshWebSelectionForPwGen()
            pwGenFormEle.reset()
            pwGenSubmitEle.addEventListener('click', () => {
                var numOfDigits = pwGenFormEle.numOfDigits.value
                if (numOfDigits == '') {
                    event.preventDefault()
                    pwGenFormEle.reset()
                } else {
                    event.preventDefault()
                    var char = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789~!@#$%^&*'
                    var charNoSymbols = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
                    var lowerCaseString = 'abcdefghijklmnopqrstuvwxyz'
                    var upperCaseString = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                    var numString = '0123456789'
                    var symbolString = '~!@#$%^&*'
                    var lowerCaseArray = lowerCaseString.split('')
                    var upperCaseArray = upperCaseString.split('')
                    var numArray = numString.split('')
                    var symbolArray = symbolString.split('')
                    var pwGen = ''
                    var genContainsSymbolsValue = document.querySelector('#genContainsSymbols').checked

                    function contains(target, pattern) {
                        var value = 0;
                        pattern.forEach(function(word) {
                            value = value + target.includes(word);
                        });
                        return (!Boolean(value))
                    }
                    if (genContainsSymbolsValue) {
                        while (contains(pwGen, lowerCaseArray) || contains(pwGen, upperCaseArray) || contains(pwGen, numArray)) {
                            pwGen = ''
                            while (pwGen.length < Number(numOfDigits)) {
                                var pwGenIndex = Math.floor(Math.random() * char.length)
                                pwGen += charNoSymbols.charAt(pwGenIndex)
                            }
                        }
                    } else {
                        while (contains(pwGen, lowerCaseArray) || contains(pwGen, upperCaseArray) || contains(pwGen, numArray) || contains(pwGen, symbolArray)) {
                            pwGen = ''
                            while (pwGen.length < Number(numOfDigits)) {
                                var pwGenIndex = Math.floor(Math.random() * char.length)
                                pwGen += char.charAt(pwGenIndex)
                            }
                        }
                    }
                    showPwForGenEle.innerHTML = pwGen
                    copyGenPwEle.addEventListener('click', copyDivToClipboard('showPwForGen'))
                }
            })
            webIfOtherForGenPwEle.addEventListener('focus', () => {
                if (webIfOtherForGenPwEle.innerHTML == '其他網頁...') {
                    webIfOtherForGenPwEle.innerHTML = ''
                    webIfOtherForGenPwEle.style.outlineStyle = 'none'
                }
            })
            webIfOtherForGenPwEle.addEventListener('focusout', () => {
                if (webIfOtherForGenPwEle.innerHTML == '') {
                    webIfOtherForGenPwEle.innerHTML = '其他網頁...'
                }
            })
            webIfOtherForGenPwEle.addEventListener('keypress', (e) => {
                if (e.which == 13) {
                    e.preventDefault()
                }
            })
            loginIDForGenPwEle.addEventListener('focus', () => {
                if (loginIDForGenPwEle.innerHTML == '登入ID') {
                    loginIDForGenPwEle.innerHTML = ''
                    loginIDForGenPwEle.style.outlineStyle = 'none'
                }
            })
            loginIDForGenPwEle.addEventListener('focusout', () => {
                if (loginIDForGenPwEle.innerHTML == '') {
                    loginIDForGenPwEle.innerHTML = '登入ID'
                }
            })
            loginIDForGenPwEle.addEventListener('keypress', (e) => {
                if (e.which == 13) {
                    e.preventDefault()
                }
            })
        })
    })
    saveBtnForGenPwEle.addEventListener('click', () => {
        event.preventDefault()
        var savePwDataForGenPw = {
            Web: webSelectionForGenPwEle[webSelectionForGenPwEle.selectedIndex].value,
            WebIfOther: webIfOtherForGenPwEle.innerHTML,
            LoginID: loginIDForGenPwEle.innerHTML,
            LoginPw: showPwForGenEle.innerHTML,
        }
        if (savePwDataForGenPw.LoginPw == '') {
            savingStatusEle.className = 'box'
            savingStatusEle.innerHTML = '請先創建密碼!'
            setTimeout(() => {
                savingStatusEle.className = ''
                savingStatusEle.innerHTML = ''
            }, 3000);
        } else if (savePwDataForGenPw.Web == 'Other' && (savePwDataForGenPw.WebIfOther == '其他網頁...' || savePwDataForGenPw.WebIfOther == '')) {
            savingStatusEle.className = 'box'
            savingStatusEle.innerHTML = '欠缺網頁名稱!'
            setTimeout(() => {
                savingStatusEle.className = ''
                savingStatusEle.innerHTML = ''
            }, 3000);
        } else if (savePwDataForGenPw.Web == 'Other' && (savePwDataForGenPw.WebIfOther.includes('@') || savePwDataForGenPw.WebIfOther.startsWith('0') || savePwDataForGenPw.WebIfOther.startsWith('1') || savePwDataForGenPw.WebIfOther.startsWith('2') || savePwDataForGenPw.WebIfOther.startsWith('3') || savePwDataForGenPw.WebIfOther.startsWith('4') || savePwDataForGenPw.WebIfOther.startsWith('5') || savePwDataForGenPw.WebIfOther.startsWith('6') || savePwDataForGenPw.WebIfOther.startsWith('7') || savePwDataForGenPw.WebIfOther.startsWith('8') || savePwDataForGenPw.WebIfOther.startsWith('9'))) {
            savingStatusEle.className = 'box'
            savingStatusEle.innerHTML = '欠缺網頁無效!'
            setTimeout(() => {
                savingStatusEle.className = ''
                savingStatusEle.innerHTML = ''
            }, 3000);
        } else if (savePwDataForGenPw.LoginID == '登入ID' || savePwDataForGenPw.LoginID == '') {
            savingStatusEle.className = 'box'
            savingStatusEle.innerHTML = '欠缺登入ID!'
            setTimeout(() => {
                savingStatusEle.className = ''
                savingStatusEle.innerHTML = ''
            }, 3000);
        } else {
            if (savePwDataForGenPw.Web !== 'Other') {
                var numOfPwForGenPw
                db.collection('Password').where('Web', '==', savePwDataForGenPw.Web).orderBy('Index', 'desc').limit(1).get().then((snapshot) => {
                    snapshot.forEach((doc) => {
                        numOfPwForGenPw = doc.data().Index + 1
                    })
                    db.collection('Password').add({
                        Web: savePwDataForGenPw.Web,
                        ID: savePwDataForGenPw.LoginID,
                        Password: savePwDataForGenPw.LoginPw,
                        User: firebase.auth().currentUser.email.split('@')[0],
                        Index: numOfPwForGenPw,
                    })
                    savingStatusEle.innerHTML = '密碼已儲存!'
                    savingStatusEle.className = 'box'
                    setTimeout(() => {
                        savingStatusEle.innerHTML = ''
                        savingStatusEle.className = ''
                        webIfOtherForGenPwEle.innerHTML = '其他網頁...'
                        webIfOtherForGenPwEle.style.color = '#aaaaaa'
                        loginIDForGenPwEle.innerHTML = '登入ID'
                        loginIDForGenPwEle.style.color = '#aaaaaa'
                        refreshWebSelectionForPwGen()
                    }, 3000);
                })
            } else {
                db.collection('Password').add({
                    Web: savePwDataForGenPw.WebIfOther,
                    ID: savePwDataForGenPw.LoginID,
                    Password: savePwDataForGenPw.LoginPw,
                    User: firebase.auth().currentUser.email.split('@')[0],
                    Index: 1,
                })
                savingStatusEle.innerHTML = '密碼已儲存!'
                savingStatusEle.className = 'box'
                setTimeout(() => {
                    savingStatusEle.innerHTML = ''
                    savingStatusEle.className = ''
                    webIfOtherForGenPwEle.innerHTML = '其他網頁...'
                    webIfOtherForGenPwEle.style.color = '#aaaaaa'
                    loginIDForGenPwEle.innerHTML = '登入ID'
                    loginIDForGenPwEle.style.color = '#aaaaaa'
                    refreshWebSelectionForPwGen()
                }, 3000);
            }
        }
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