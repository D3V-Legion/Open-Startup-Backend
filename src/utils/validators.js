function validateFields(fields) {
  const { email, name, lastname, password } = fields;
  if (!email || !name || !lastname || !password) {
    return false;
  } else {
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

module.exports = { validateFields, validateEmail, validatePassword };
