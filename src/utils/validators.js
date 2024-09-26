function validateUserRegisterFields(fields) {
  const { email, firstname, lastname, password } = fields;
  if (!email || !firstname || !lastname || !password) {
    return false;
  } else {
    email.trim();
    firstname.trim();
    lastname.trim();
    password.trim();
    return true;
  }
}

function validateUserLoginFields(fields) {
  const { email, password } = fields;
  if (!email || !password) {
    return false;
  } else {
    email.trim();
    password.trim();
    return true;
  }
}

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  let flag = 0;
  if (password.length < 8) flag++;
  if (!password.match(/[a-z]/)) flag++;
  if (!password.match(/[A-Z]/)) flag++;
  if (!password.match(/[0-9]/)) flag++;

  if (flag > 0) return false;
  else return true;
}

module.exports = {
  validateUserLoginFields,
  validateUserRegisterFields,
  validateEmail,
  validatePassword,
};
