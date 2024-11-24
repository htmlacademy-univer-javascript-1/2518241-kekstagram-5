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


const fun3 = function(begin, end, start, long) {
  const rBegin = +begin.split(':');
  const timeBegin = 60 * rBegin[0] + rBegin[1];
  const rEnd = +end.split(':');
  const timeEnd = 60 * rEnd[0] + rEnd[1];
  const rStart = +start.split(':');
  const timeStart1 = 60 * rStart[0] + rStart[1];
  const timeStartLong = timeStart1 + long;
  if (timeStart1 >= timeBegin && timeStartLong <= timeEnd) {
    return true;
  }
  return false;
};

fun3('08:00', '17:30', '14:00', 90); // true
fun3('8:0', '10:0', '8:0', 120); // true
fun3('08:00', '14:30', '14:00', 90); // false
fun3('14:00', '17:30', '08:0', 90); // false
fun3('8:00', '17:30', '08:00', 900); // false

fun3('9:00', '17:30', '08:00', 900); // false

