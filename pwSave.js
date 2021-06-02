window.addEventListener('DOMContentLoaded', function() {
    // Password Saver
    var webSelectionForPwSaveEle = document.querySelector('#webSelectionForPwSave')
    var webIfOtherForPwSaveEle = document.querySelector('#webIfOtherForPwSave')
    var catForPwSaveEle = document.querySelector('#catForPwSave')
    var loginIDForPwSaveEle = document.querySelector('#loginIDForPwSave')
    var loginPwForPwSaveEle = document.querySelector('#loginPwForPwSave')
    var emailForPwSaveEle = document.querySelector('#emailForPwSave')
    var phoneForPwSaveEle = document.querySelector('#phoneForPwSave')
    var memoForPwSaveEle = document.querySelector('#memoForPwSave')
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
            emailForPwSaveEle.innerHTML = '電郵'
            emailForPwSaveEle.style.color = '#aaaaaa'
            phoneForPwSaveEle.innerHTML = '電話'
            phoneForPwSaveEle.style.color = '#aaaaaa'
            memoForPwSaveEle.value = ''
            refreshWebSelectionForPwSave()
            webIfOtherForPwSaveEle.addEventListener('focus', () => {
                if (webIfOtherForPwSaveEle.innerHTML == '其他網頁...') {
                    webIfOtherForPwSaveEle.innerHTML = ''
                    webIfOtherForPwSaveEle.style.outlineStyle = 'none'
                    if (window.matchMedia('(prefers-color-scheme: dark)')) {
                        webIfOtherForPwSaveEle.style.color = '#ffffff'
                    } else {
                        webIfOtherForPwSaveEle.style.color = '#000000'
                    }
                }
            })
            webIfOtherForPwSaveEle.addEventListener('focusout', () => {
                if (webIfOtherForPwSaveEle.innerHTML == '') {
                    webIfOtherForPwSaveEle.innerHTML = '其他網頁...'
                    webIfOtherForPwSaveEle.style.color = '#aaaaaa'
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
                    if (window.matchMedia('(prefers-color-scheme: dark)')) {
                        loginIDForPwSaveEle.style.color = '#ffffff'
                    } else {
                        loginIDForPwSaveEle.style.color = '#000000'
                    }
                }
            })
            loginIDForPwSaveEle.addEventListener('focusout', () => {
                if (loginIDForPwSaveEle.innerHTML == '') {
                    loginIDForPwSaveEle.innerHTML = '登入ID'
                    loginIDForPwSaveEle.style.color = '#aaaaaa'
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
                    if (window.matchMedia('(prefers-color-scheme: dark)')) {
                        loginPwForPwSaveEle.style.color = '#ffffff'
                    } else {
                        loginPwForPwSaveEle.style.color = '#000000'
                    }
                }
            })
            loginPwForPwSaveEle.addEventListener('focusout', () => {
                if (loginPwForPwSaveEle.innerHTML == '') {
                    loginPwForPwSaveEle.innerHTML = '登入密碼'
                    loginPwForPwSaveEle.style.color = '#aaaaaa'
                }
            })
            loginPwForPwSaveEle.addEventListener('keypress', (e) => {
                if (e.which == 13) {
                    e.preventDefault()
                }
            })
            emailForPwSaveEle.addEventListener('focus', () => {
                if (emailForPwSaveEle.innerHTML == '電郵') {
                    emailForPwSaveEle.innerHTML = ''
                    emailForPwSaveEle.style.outlineStyle = 'none'
                    if (window.matchMedia('(prefers-color-scheme: dark)')) {
                        emailForPwSaveEle.style.color = '#ffffff'
                    } else {
                        emailForPwSaveEle.style.color = '#000000'
                    }
                }
            })
            emailForPwSaveEle.addEventListener('focusout', () => {
                if (emailForPwSaveEle.innerHTML == '') {
                    emailForPwSaveEle.innerHTML = '電郵'
                    emailForPwSaveEle.style.color = '#aaaaaa'
                }
            })
            emailForPwSaveEle.addEventListener('keypress', (e) => {
                if (e.which == 13) {
                    e.preventDefault()
                }
            })
            phoneForPwSaveEle.addEventListener('focus', () => {
                if (phoneForPwSaveEle.innerHTML == '電話') {
                    phoneForPwSaveEle.innerHTML = ''
                    phoneForPwSaveEle.style.outlineStyle = 'none'
                    if (window.matchMedia('(prefers-color-scheme: dark)')) {
                        phoneForPwSaveEle.style.color = '#ffffff'
                    } else {
                        phoneForPwSaveEle.style.color = '#000000'
                    }
                }
            })
            phoneForPwSaveEle.addEventListener('focusout', () => {
                if (phoneForPwSaveEle.innerHTML == '') {
                    phoneForPwSaveEle.innerHTML = '電話'
                    phoneForPwSaveEle.style.color = '#aaaaaa'
                }
            })
            phoneForPwSaveEle.addEventListener('keypress', (e) => {
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
            Type: catForPwSaveEle[catForPwSaveEle.selectedIndex].value,
            LoginID: loginIDForPwSaveEle.innerHTML,
            LoginPw: loginPwForPwSaveEle.innerHTML,
            Email: emailForPwSaveEle.innerHTML,
            Phone: phoneForPwSaveEle.innerHTML,
            Memo: memoForPwSaveEle.value,
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
                        Type: savePwDataForPwSave.Type,
                        ID: savePwDataForPwSave.LoginID,
                        Password: savePwDataForPwSave.LoginPw,
                        Email: savePwDataForPwSave.Email,
                        Phone: savePwDataForPwSave.Phone,
                        Memo: savePwDataForPwSave.Memo,
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
                        emailForPwSaveEle.innerHTML = '電郵'
                        emailForPwSaveEle.style.color = '#aaaaaa'
                        phoneForPwSaveEle.innerHTML = '電話'
                        phoneForPwSaveEle.style.color = '#aaaaaa'
                        memoForPwSaveEle.value = ''
                        refreshWebSelectionForPwSave()
                    }, 3000);
                })
            } else {
                db.collection('Password').add({
                    Web: savePwDataForPwSave.WebIfOther,
                    Type: savePwDataForPwSave.Type,
                    ID: savePwDataForPwSave.LoginID,
                    Password: savePwDataForPwSave.LoginPw,
                    Email: savePwDataForPwSave.Email,
                    Phone: savePwDataForPwSave.Phone,
                    Memo: savePwDataForPwSave.Memo,
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
                    emailForPwSaveEle.innerHTML = '電郵'
                    emailForPwSaveEle.style.color = '#aaaaaa'
                    phoneForPwSaveEle.innerHTML = '電話'
                    phoneForPwSaveEle.style.color = '#aaaaaa'
                    memoForPwSaveEle.value = ''
                    refreshWebSelectionForPwSave()
                }, 3000);
            }
        }
    })
})