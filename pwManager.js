window.addEventListener('DOMContentLoaded', function() {
    // Password Manager
    var webListEle = document.querySelector('#webList')
    var pwDetailEle = document.querySelector('#pwDetail')
    var searchBoxEle = document.querySelector('#searchBox')
    var catFilterEle = document.querySelector('#catFilter')
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
                    arrayOfWeb.push({
                        Web: doc.data().Web,
                        Type: doc.data().Type,
                    })
                    var sortedArrayOfWeb = arrayOfWeb.sort(function(a, b) {
                        if (a.Web > b.Web) {
                            return 1
                        } else if (a.Web < b.Web) {
                            return -1
                        } else {
                            return 0
                        }
                    })
                    var uniqueArrayOfWeb = Array.from(new Set(sortedArrayOfWeb.map(a => a.Web)))
                        .map(web => {
                            return sortedArrayOfWeb.find(a => a.Web === web)
                        })
                    uniqueArrayOfWeb.forEach((webObj) => {
                        var webDiv = document.createElement('div')
                        webDiv.className = `link web ${webObj.Type}`
                        webDiv.id = webObj.Web
                        webDiv.innerHTML = webObj.Web
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
                        pwListHeading.style.padding = '5px 15px'
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
                                            <span>電郵: </span>
                                            <div class='pw textField' style='width: 100%;'>${doc.data().Email}</div>
                                            <span>電話: </span>
                                            <div class='pw textField' style='width: 100%;'>${doc.data().Phone}</div>
                                            <span>備註: </span>
                                            <div class='pw textField' style='width: 100%;'>${doc.data().Memo}</div>
                                            `
                                    div.append(pwContent)
                                    var flexbox = document.createElement('div')
                                    flexbox.style.display = 'flex'
                                    flexbox.style.flexWrap = 'wrap'
                                    div.append(flexbox)
                                    var copyIDButton = document.createElement('button')
                                    copyIDButton.innerHTML = '複製ID'
                                    copyIDButton.style.margin = '2px'
                                    copyIDButton.style.flex = 1
                                    var copyPasswordButton = document.createElement('button')
                                    copyPasswordButton.innerHTML = '複製密碼'
                                    copyPasswordButton.style.margin = '2px'
                                    copyPasswordButton.style.flex = 1
                                    var brForFlex = document.createElement('div')
                                    brForFlex.style.flexBasis = '100%'
                                    brForFlex.style.height = '0'
                                    var modifyButton = document.createElement('button')
                                    modifyButton.innerHTML = '編輯'
                                    modifyButton.style.margin = '2px'
                                    modifyButton.style.flex = 1
                                    var deleteButton = document.createElement('button')
                                    deleteButton.innerHTML = '刪除'
                                    deleteButton.style.margin = '2px'
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
                                        var emailForModifyLabel = document.createElement('span')
                                        emailForModifyLabel.innerHTML = '電郵'
                                        var emailForModifyInput = document.createElement('div')
                                        emailForModifyInput.className = 'textField'
                                        emailForModifyInput.innerHTML = '電郵'
                                        emailForModifyInput.contentEditable = 'true'
                                        emailForModifyInput.style.width = '200px'
                                        var phoneForModifyLabel = document.createElement('span')
                                        phoneForModifyLabel.innerHTML = '電話'
                                        var phoneForModifyInput = document.createElement('div')
                                        phoneForModifyInput.className = 'textField'
                                        phoneForModifyInput.innerHTML = '電話'
                                        phoneForModifyInput.contentEditable = 'true'
                                        phoneForModifyInput.style.width = '200px'
                                        var memoForModifyLabel = document.createElement('span')
                                        memoForModifyLabel.innerHTML = '備註'
                                        var memoForModifyInput = document.createElement('textarea')
                                        memoForModifyInput.className = 'textField'
                                        memoForModifyInput.placeholder = '備註'
                                        memoForModifyInput.style.width = '200px'
                                        memoForModifyInput.rows = '3'
                                        memoForModifyInput.style.border = '0'
                                        memoForModifyInput.style.resize = 'none'
                                        var submitBtnForModify = document.createElement('button')
                                        submitBtnForModify.type = 'submit'
                                        submitBtnForModify.innerHTML = '儲存'
                                        submitBtnForModify.style.width = '80px'
                                        var cancelBtnForModify = document.createElement('button')
                                        cancelBtnForModify.innerHTML = '取消'
                                        cancelBtnForModify.style.width = '80px'
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
                                        emailForModifyInput.addEventListener('focus', () => {
                                            if (emailForModifyInput.innerHTML == '電郵') {
                                                emailForModifyInput.innerHTML = ''
                                                emailForModifyInput.style.outlineStyle = 'none'
                                            }
                                        })
                                        emailForModifyInput.addEventListener('focusout', () => {
                                            if (emailForModifyInput.innerHTML == '') {
                                                emailForModifyInput.innerHTML = '電郵'
                                            }
                                        })
                                        emailForModifyInput.addEventListener('keypress', (e) => {
                                            if (e.which == 13) {
                                                e.preventDefault()
                                            }
                                        })
                                        phoneForModifyInput.addEventListener('focus', () => {
                                            if (phoneForModifyInput.innerHTML == '電話') {
                                                phoneForModifyInput.innerHTML = ''
                                                phoneForModifyInput.style.outlineStyle = 'none'
                                            }
                                        })
                                        phoneForModifyInput.addEventListener('focusout', () => {
                                            if (phoneForModifyInput.innerHTML == '') {
                                                phoneForModifyInput.innerHTML = '電話'
                                            }
                                        })
                                        phoneForModifyInput.addEventListener('keypress', (e) => {
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
                                                Email: emailForModifyInput.innerHTML,
                                                Phone: phoneForModifyInput.innerHTML,
                                                Memo: memoForModifyInput.value,
                                                OriginalPw: doc.data().Password,
                                            }
                                            if ((!modifyData.LoginID || modifyData.LoginID == '登入ID') && (!modifyData.LoginPw || modifyData.LoginPw == '登入密碼') && (!modifyData.Email || modifyData.Email == '電郵') && (!modifyData.Phone || modifyData.Phone == '電話') && (!modifyData.Memo || modifyData.Memo == '')) {
                                                modifyStatus.style.display = 'block'
                                                modifyStatus.innerHTML = '請輸入資料!!!'
                                                setTimeout(() => {
                                                    modifyStatus.style.display = 'none'
                                                    modifyStatus.innerHTML = ''
                                                }, 3000);
                                            } else {
                                                let modifyItems = ''
                                                if (modifyData.LoginID && modifyData.LoginID != '登入ID') {
                                                    db.collection('Password').doc(doc.id).update({
                                                        ID: modifyData.LoginID,
                                                    })
                                                    modifyItems = modifyItems + '登入ID及'
                                                }
                                                if (modifyData.LoginPw && modifyData.LoginPw != '登入密碼') {
                                                    db.collection('Password').doc(doc.id).update({
                                                        Password: modifyData.LoginPw,
                                                    })
                                                    modifyItems = modifyItems + '登入密碼及'
                                                }
                                                if (modifyData.Email && modifyData.Email != '電郵') {
                                                    db.collection('Password').doc(doc.id).update({
                                                        Email: modifyData.Email,
                                                    })
                                                    modifyItems = modifyItems + '電郵及'
                                                }
                                                if (modifyData.Phone && modifyData.Phone != '電話') {
                                                    db.collection('Password').doc(doc.id).update({
                                                        Phone: modifyData.Phone,
                                                    })
                                                    modifyItems = modifyItems + '電話及'
                                                }
                                                if (modifyData.Memo) {
                                                    db.collection('Password').doc(doc.id).update({
                                                        Memo: modifyData.Memo,
                                                    })
                                                    modifyItems = modifyItems + '備註及'
                                                }
                                                if (doc.data().LastModify2 !== undefined) {
                                                    db.collection('Password').doc(doc.id).update({
                                                        LastModify3: doc.data().LastModify2,
                                                        LastModify2: doc.data().LastModify1,
                                                        LastModify1: modifyData.OriginalPw + ' - ' + date,
                                                    })
                                                } else if (doc.data().LastModify1 !== undefined) {
                                                    db.collection('Password').doc(doc.id).update({
                                                        LastModify2: doc.data().LastModify1,
                                                        LastModify1: modifyData.OriginalPw + ' - ' + date,
                                                    })
                                                } else {
                                                    db.collection('Password').doc(doc.id).update({
                                                        LastModify1: modifyData.OriginalPw + ' - ' + date,
                                                    })
                                                }
                                                modifyStatus.style.display = 'block'
                                                modifyStatus.innerHTML = modifyItems.substring(0, modifyItems.length - 1) + '已更新!!!'
                                                setTimeout(() => {
                                                    modifyStatus.style.display = 'none'
                                                    modifyStatus.innerHTML = ''
                                                    loginIDForModifyInput.innerHTML = '登入ID'
                                                    loginIDForModifyInput.style.color = '#aaaaaa'
                                                    loginPwForModifyInput.innerHTML = '登入密碼'
                                                    loginPwForModifyInput.style.color = '#aaaaaa'
                                                    emailForModifyInput.innerHTML = '電郵'
                                                    emailForModifyInput.style.color = '#aaaaaa'
                                                    phoneForModifyInput.innerHTML = '電話'
                                                    phoneForModifyInput.style.color = '#aaaaaa'
                                                    memoForModifyInput.value = ''
                                                    alertBoxBackground.parentNode.removeChild(alertBoxBackground)
                                                    var pwListRefresh = document.querySelector(`#${doc.data().Web}`)
                                                    try {
                                                        pwMgrBtnEle.forEach((ele) => {
                                                            ele.click()
                                                        })
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
                                        div.append(emailForModifyLabel)
                                        div.append(emailForModifyInput)
                                        div.append(phoneForModifyLabel)
                                        div.append(phoneForModifyInput)
                                        div.append(memoForModifyLabel)
                                        div.append(memoForModifyInput)
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
                                        alertText.style.width = '200px'
                                        alertText.style.textAlign = 'center'
                                        var deleteYesButton = document.createElement('button')
                                        deleteYesButton.innerHTML = '是'
                                        deleteYesButton.style.margin = '0 10px'
                                        deleteYesButton.style.width = '80px'
                                        var deleteNoButton = document.createElement('button')
                                        deleteNoButton.innerHTML = '否'
                                        deleteNoButton.style.margin = '0 10px'
                                        deleteNoButton.style.width = '80px'
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
                                    moveUpBtn.style.marginLeft = '5px'
                                    moveUpBtn.style.textAlign = 'center'
                                    moveUpBtn.innerHTML = '△'
                                    var positionIndex = document.createElement('div')
                                    positionIndex.className = 'pwContent'
                                    positionIndex.id = `${doc.data().Web}${doc.data().Index}`
                                    positionIndex.style.width = 'calc(30px + 1rem)'
                                    positionIndex.style.padding = '10px 0'
                                    positionIndex.style.marginLeft = '5px'
                                    positionIndex.style.textAlign = 'center'
                                    positionIndex.innerHTML = doc.data().Index
                                    var moveDownBtn = document.createElement('div')
                                    moveDownBtn.className = 'pwContent link'
                                    moveDownBtn.style.width = 'calc(30px + 1rem)'
                                    moveDownBtn.style.padding = '10px 0'
                                    moveDownBtn.style.marginLeft = '5px'
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
            catFilterEle.addEventListener('change', () => {
                var webs = document.querySelectorAll('.web')
                webs.forEach((web) => {
                    if (catFilterEle[catFilterEle.selectedIndex].value == '全部類型') {
                        web.style.display = 'block'
                    } else {
                        if (web.className.includes(catFilterEle[catFilterEle.selectedIndex].value)) {
                            web.style.display = 'block'
                        } else {
                            web.style.display = 'none'
                        }
                    }
                })
            })
        })
    })
})