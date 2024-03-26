
//Debe haber comunicación entre el back y el front para que se utilice la misma regex.
const regexEmail=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
const regexPassword=/^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/;

function ValidateEmail(candidateEmail) {
    return regexEmail.test(candidateEmail)
}

function ValidatePassword(candidatePassword) {
    return regexPassword.test(candidatePassword)
}

module.exports={ValidateEmail, ValidatePassword};