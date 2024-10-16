const fun1 = function(str, len) {
  if (str.length <= len) {
    return true;
  }
  return false;
};

const fun2 = function(str) {
  str.replaceAll(' ','');
  str.toLowerCase();
  let newstr = '';
  for (let i = (str.length - 1); i >= 0; i--) {
    newstr += str[i];
  }

  if (newstr === str) {
    return true;
  }
  return false;
};
