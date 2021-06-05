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
            searchBoxEle.value = ''
            catFilterEle.selectedIndex = 0
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
                        pwListHeading.className = 'flexbox'
                        var pwListTitle = document.createElement('input')
                        pwListTitle.className = 'pwContent'
                        pwListTitle.style.padding = '5px 15px'
                        pwListTitle.style.flex = '1'
                        pwListTitle.placeholder = '請輸入新網頁名稱'
                        pwListTitle.readOnly = true
                        pwListTitle.value = div.innerHTML
                        var webNameModifyBtn = document.createElement('span')
                        webNameModifyBtn.className = 'pwContent link'
                        webNameModifyBtn.style.width = 'calc(30px + 1rem)'
                        webNameModifyBtn.style.padding = '10px 0'
                        webNameModifyBtn.style.margin = '5px'
                        webNameModifyBtn.style.textAlign = 'center'
                        webNameModifyBtn.innerHTML = '改'
                        pwDetailEle.append(pwListHeading)
                        pwListHeading.append(pwListTitle)
                        pwListHeading.append(webNameModifyBtn)
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
                                            <div id='${"I" + doc.data().ID + "D"}' class='pw textField'>${doc.data().ID}</div>
                                            <span>登入密碼: </span>
                                            <div id='${"Pass" + doc.data().Password + "word"}' class='pw textField'>${doc.data().Password}</div>
                                            <span>電郵: </span>
                                            <div class='pw textField'>${doc.data().Email}</div>
                                            <span>電話: </span>
                                            <div class='pw textField'>${doc.data().Phone}</div>
                                            <span>備註: </span>
                                            <div class='pw textField' style="white-space: pre-line">${doc.data().Memo}</div>
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
                                    flexbox.append(copyIDButton)
                                    flexbox.append(copyPasswordButton)
                                    flexbox.append(brForFlex)
                                    flexbox.append(modifyButton)
                                    flexbox.append(deleteButton)
                                    copyIDButton.addEventListener('click', function() {
                                        copyDivToClipboard("I" + doc.data().ID + "D")
                                    })
                                    copyPasswordButton.addEventListener('click', function() {
                                        copyDivToClipboard("Pass" + doc.data().Password + "word")
                                    })
                                    modifyButton.addEventListener('click', () => {
                                        var alertBoxBackground = document.createElement('div')
                                        alertBoxBackground.className = 'alertBoxBackground'
                                        var div = document.createElement('div')
                                        div.className = 'flexbox alertBox'
                                        var loginIDForModifyLabel = document.createElement('span')
                                        loginIDForModifyLabel.innerHTML = '登入ID'
                                        var loginIDForModifyInput = document.createElement('input')
                                        loginIDForModifyInput.className = 'textField'
                                        loginIDForModifyInput.placeholder = '登入ID'
                                        loginIDForModifyInput.style.width = '200px'
                                        var loginPwForModifyLabel = document.createElement('span')
                                        loginPwForModifyLabel.innerHTML = '登入密碼'
                                        var loginPwForModifyInput = document.createElement('input')
                                        loginPwForModifyInput.className = 'textField'
                                        loginPwForModifyInput.placeholder = '登入密碼'
                                        loginPwForModifyInput.style.width = '200px'
                                        var emailForModifyLabel = document.createElement('span')
                                        emailForModifyLabel.innerHTML = '電郵'
                                        var emailForModifyInput = document.createElement('input')
                                        emailForModifyInput.className = 'textField'
                                        emailForModifyInput.placeholder = '電郵'
                                        emailForModifyInput.style.width = '200px'
                                        var phoneForModifyLabel = document.createElement('span')
                                        phoneForModifyLabel.innerHTML = '電話'
                                        var phoneForModifyInput = document.createElement('input')
                                        phoneForModifyInput.className = 'textField'
                                        phoneForModifyInput.placeholder = '電話'
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
                                        submitBtnForModify.addEventListener('click', () => {
                                            var date = new Date()
                                            var modifyData = {
                                                LoginID: loginIDForModifyInput.value,
                                                LoginPw: loginPwForModifyInput.value,
                                                Email: emailForModifyInput.value,
                                                Phone: phoneForModifyInput.value,
                                                Memo: memoForModifyInput.value,
                                                OriginalPw: doc.data().Password,
                                            }
                                            if ((!modifyData.LoginID || modifyData.LoginID == '') && (!modifyData.LoginPw || modifyData.LoginPw == '') && (!modifyData.Email || modifyData.Email == '') && (!modifyData.Phone || modifyData.Phone == '') && (!modifyData.Memo || modifyData.Memo == '')) {
                                                modifyStatus.style.display = 'block'
                                                modifyStatus.innerHTML = '請輸入資料!!!'
                                                setTimeout(() => {
                                                    modifyStatus.style.display = 'none'
                                                    modifyStatus.innerHTML = ''
                                                }, 3000);
                                            } else {
                                                var modifyItems = ''
                                                if (modifyData.LoginID) {
                                                    db.collection('Password').doc(doc.id).update({
                                                        ID: modifyData.LoginID,
                                                    })
                                                    modifyItems = modifyItems + '登入ID及'
                                                }
                                                if (modifyData.LoginPw) {
                                                    db.collection('Password').doc(doc.id).update({
                                                        Password: modifyData.LoginPw,
                                                    })
                                                    modifyItems = modifyItems + '登入密碼及'
                                                }
                                                if (modifyData.Email) {
                                                    db.collection('Password').doc(doc.id).update({
                                                        Email: modifyData.Email,
                                                    })
                                                    modifyItems = modifyItems + '電郵及'
                                                }
                                                if (modifyData.Phone) {
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
                                                    loginIDForModifyInput.value = ''
                                                    loginPwForModifyInput.value = ''
                                                    emailForModifyInput.value = ''
                                                    phoneForModifyInput.value = ''
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
                                            loginIDForModifyInput.value = ''
                                            loginPwForModifyInput.value = ''
                                            emailForModifyInput.value = ''
                                            phoneForModifyInput.value = ''
                                            memoForModifyInput.value = ''
                                            alertBoxBackground.parentNode.removeChild(alertBoxBackground)
                                        })
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
                                        pwMgrScreenEle.append(alertBoxBackground)
                                        alertBoxBackground.append(div)
                                        div.append(alertText)
                                        div.append(deleteYesButton)
                                        div.append(deleteNoButton)
                                        deleteYesButton.addEventListener('click', () => {
                                            db.collection('Password').doc(doc.id).delete()
                                            var pwListRefresh = document.querySelector(`#${doc.data().Web}`)
                                            alertBoxBackground.parentNode.removeChild(alertBoxBackground)
                                            setTimeout(() => {
                                                try {
                                                    pwMgrBtnEle.forEach((ele) => {
                                                        ele.click()
                                                    })
                                                    pwListRefresh.click()
                                                } catch (err) {}
                                            }, 100);
                                        })
                                        deleteNoButton.addEventListener('click', () => {
                                            alertBoxBackground.parentNode.removeChild(alertBoxBackground)
                                        })
                                    })
                                    var moveBtnContainer = document.createElement('div')
                                    moveBtnContainer.className = 'flexbox movingBtnContainer'
                                    moveBtnContainer.style.display = 'none'
                                    moveBtnContainer.id = 'movingBtnContainer'
                                    moveBtnContainer.style.flexDirection = 'column'
                                    var moveUpBtn = document.createElement('div')
                                    moveUpBtn.className = 'pwContent link'
                                    moveUpBtn.style.width = 'calc(30px + 1rem)'
                                    moveUpBtn.style.padding = '10px 0'
                                    moveUpBtn.style.margin = '5px'
                                    moveUpBtn.style.textAlign = 'center'
                                    moveUpBtn.innerHTML = '△'
                                    var positionIndex = document.createElement('div')
                                    positionIndex.className = 'pwContent'
                                    positionIndex.id = `${doc.data().Web}${doc.data().Index}`
                                    positionIndex.style.width = 'calc(30px + 1rem)'
                                    positionIndex.style.padding = '10px 0'
                                    positionIndex.style.margin = '5px'
                                    positionIndex.style.textAlign = 'center'
                                    positionIndex.innerHTML = doc.data().Index
                                    var moveDownBtn = document.createElement('div')
                                    moveDownBtn.className = 'pwContent link'
                                    moveDownBtn.style.width = 'calc(30px + 1rem)'
                                    moveDownBtn.style.padding = '10px 0'
                                    moveDownBtn.style.margin = '5px'
                                    moveDownBtn.style.textAlign = 'center'
                                    moveDownBtn.innerHTML = '▽'
                                    flexboxContainer.append(moveBtnContainer)
                                    moveBtnContainer.append(moveUpBtn)
                                    moveBtnContainer.append(positionIndex)
                                    moveBtnContainer.append(moveDownBtn)
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
                                }
                            })
                        })
                        var originalWebName = pwListTitle.value
                        webNameModifyBtn.addEventListener('click', () => {
                            if (webNameModifyBtn.innerHTML == '改') {
                                webNameModifyBtn.innerHTML = '✔︎'
                                pwListTitle.readOnly = false
                                pwListTitle.value = ''
                                var moveBtnContainerEle = document.querySelectorAll('.movingBtnContainer')
                                moveBtnContainerEle.forEach(ele => {
                                    ele.style.display = 'block'
                                })
                            } else if (webNameModifyBtn.innerHTML == '✔︎') {
                                webNameModifyBtn.innerHTML = '改'
                                pwListTitle.readOnly = true
                                if (pwListTitle.value.length < 1 || pwListTitle.value == '請輸入新網頁名稱' || pwListTitle.value.includes('@') || pwListTitle.value.startsWith('0') || pwListTitle.value.startsWith('1') || pwListTitle.value.startsWith('2') || pwListTitle.value.startsWith('3') || pwListTitle.value.startsWith('4') || pwListTitle.value.startsWith('5') || pwListTitle.value.startsWith('6') || pwListTitle.value.startsWith('7') || pwListTitle.value.startsWith('8') || pwListTitle.value.startsWith('9')) {
                                    pwListTitle.value = originalWebName
                                    var moveBtnContainerEle = document.querySelectorAll('.movingBtnContainer')
                                    moveBtnContainerEle.forEach(ele => {
                                        ele.style.display = 'none'
                                    })
                                } else {
                                    db.collection('Password').where('Web', '==', originalWebName).get().then(snapshot => {
                                        snapshot.forEach(doc => {
                                            db.collection('Password').doc(doc.id).update({
                                                Web: pwListTitle.value,
                                                OriginalWeb: originalWebName,
                                            })
                                        })
                                    })
                                    setTimeout(() => {
                                        try {
                                            pwMgrBtnEle.forEach((ele) => {
                                                ele.click()
                                            })
                                        } catch (err) {}
                                    }, 1000);
                                }
                            }
                        })
                    })
                })
            })
            var events = ['input', 'change', 'cut', 'copy', 'paste', 'keypress']
            events.forEach((event) => {
                searchBoxEle.addEventListener(event, () => {
                    var webs = document.querySelectorAll('.web')
                    webs.forEach((web) => {
                        if (searchBoxEle.value == '') {
                            web.style.display = 'block'
                        } else {
                            if (!web.innerHTML.toLowerCase().includes(searchBoxEle.value.toLowerCase())) {
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