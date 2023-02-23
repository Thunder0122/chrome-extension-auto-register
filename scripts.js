$(document).ready(function() {
    window.localStorage.setItem('bookType', bookType)
    $('#login-email').val(email)
    $('#login-password').val(password)
    $('#login-form > button[type=submit]').trigger('click')
    
    //window.location.href = "https://prenotami.esteri.it/Services"
})