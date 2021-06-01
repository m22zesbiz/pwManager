window.addEventListener('DOMContentLoaded', function() {
    // Logout Section
    logoutBtnEle.forEach((ele) => {
        ele.addEventListener('click', function() {
            firebase.auth().signOut().then(function() {
                location.reload()
            }).catch(function(error) {});
        })
    })
})