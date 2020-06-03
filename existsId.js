existId = (arr, id) => {
  let exists = false;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      exists = true;

      break;
    }
  }
  return exists;
};

existIdGrade = (arr, id) => {
  let exists = false;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].studentId === id) {
      exists = true;

      break;
    }
  }
  return exists;
};

module.exports.existId = existId;
module.exports.existIdGrade = existIdGrade;
