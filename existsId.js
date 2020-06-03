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

module.exports.existId = existId;
