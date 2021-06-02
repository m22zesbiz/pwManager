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
                while (webSelectionForPwSaveEle.children[1]) {
                    webSelectionForPwSaveEle.removeChild(webSelectionForPwSaveEle.lastChild)
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

    formEle = [webIfOtherForPwSaveEle, loginIDForPwSaveEle, loginPwForPwSaveEle, emailForPwSaveEle, phoneForPwSaveEle]
    formEle.forEach(ele => {
        ele.addEventListener('keypress', e => {
            if (e.which == 13) {
                e.preventDefault()
                pwSaveBtnEle.click()
            }
        })
    })

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
            webIfOtherForPwSaveEle.value = ''
            loginIDForPwSaveEle.value = ''
            loginPwForPwSaveEle.value = ''
            emailForPwSaveEle.value = ''
            phoneForPwSaveEle.value = ''
            memoForPwSaveEle.value = ''
            refreshWebSelectionForPwSave()
        })
    })

    saveBtnForPwSaveEle.addEventListener('click', () => {
        var savePwDataForPwSave = {
            Web: webSelectionForPwSaveEle[webSelectionForPwSaveEle.selectedIndex].value,
            WebIfOther: webIfOtherForPwSaveEle.value,
            Type: catForPwSaveEle[catForPwSaveEle.selectedIndex].value,
            LoginID: loginIDForPwSaveEle.value,
            LoginPw: loginPwForPwSaveEle.value,
            Email: emailForPwSaveEle.value,
            Phone: phoneForPwSaveEle.value,
            Memo: memoForPwSaveEle.value,
        }
        if ((savePwDataForPwSave.Web == 'Other' || savePwDataForPwSave.Web == '請選擇網頁') && savePwDataForPwSave.WebIfOther == '') {
            savingStatusForPwSaveEle.className = 'box'
            savingStatusForPwSaveEle.innerHTML = '欠缺網頁名稱!'
            setTimeout(() => {
                savingStatusForPwSaveEle.className = ''
                savingStatusForPwSaveEle.innerHTML = ''
            }, 3000);
        } else if ((savePwDataForPwSave.Web == 'Other' || savePwDataForPwSave.Web == '請選擇網頁') && (savePwDataForPwSave.WebIfOther.includes('@') || savePwDataForPwSave.WebIfOther.startsWith('0') || savePwDataForPwSave.WebIfOther.startsWith('1') || savePwDataForPwSave.WebIfOther.startsWith('2') || savePwDataForPwSave.WebIfOther.startsWith('3') || savePwDataForPwSave.WebIfOther.startsWith('4') || savePwDataForPwSave.WebIfOther.startsWith('5') || savePwDataForPwSave.WebIfOther.startsWith('6') || savePwDataForPwSave.WebIfOther.startsWith('7') || savePwDataForPwSave.WebIfOther.startsWith('8') || savePwDataForPwSave.WebIfOther.startsWith('9'))) {
            savingStatusForPwSaveEle.className = 'box'
            savingStatusForPwSaveEle.innerHTML = '網頁名稱無效!'
            setTimeout(() => {
                savingStatusForPwSaveEle.className = ''
                savingStatusForPwSaveEle.innerHTML = ''
            }, 3000);
        } else if (savePwDataForPwSave.Type == '請選擇類型') {
            savingStatusForPwSaveEle.className = 'box'
            savingStatusForPwSaveEle.innerHTML = '尚未選擇類型!'
            setTimeout(() => {
                savingStatusForPwSaveEle.className = ''
                savingStatusForPwSaveEle.innerHTML = ''
            }, 3000);
        } else if (savePwDataForPwSave.LoginID == '') {
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
            if (savePwDataForPwSave.Web != 'Other' && savePwDataForPwSave.Web != '請選擇網頁') {
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
                        webIfOtherForPwSaveEle.value = ''
                        loginIDForPwSaveEle.value = ''
                        loginPwForPwSaveEle.value = ''
                        emailForPwSaveEle.value = ''
                        phoneForPwSaveEle.value = ''
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
                    webIfOtherForPwSaveEle.value = ''
                    loginIDForPwSaveEle.value = ''
                    loginPwForPwSaveEle.value = ''
                    emailForPwSaveEle.value = ''
                    phoneForPwSaveEle.value = ''
                    memoForPwSaveEle.value = ''
                    refreshWebSelectionForPwSave()
                }, 3000);
            }
        }
    })
})