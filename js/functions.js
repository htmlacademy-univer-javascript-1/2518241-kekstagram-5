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


// Cтрока короче 20 символов
fun1('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
fun1('проверяемая строка', 18); // true
// Строка длиннее 10 символов
fun1('проверяемая строка', 10);

// Строка является палиндромом
fun2('топот'); // true
// Несмотря на разный регистр, тоже палиндром
fun2('ДовОд'); // true
// Это не палиндром
fun2('Кекс'); // false
