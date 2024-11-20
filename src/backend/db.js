const { v4: uuidv4 } = require("uuid");

const db = () => {
  let numObj = [];

  const getNums = () => {
    return numObj;
  };

  const createNum = (num) => {
    const newNum = { id: uuidv4(), num: num };
    numObj.push(newNum);
    console.log(`Creating num ${newNum.num} with id: ${newNum.id}`);
  };

  const findNum = (id) => {
    return numObj.find((numObj) => numObj.id === id);
  };

  const deleteNum = (id) => {
    numObj = numObj.filter((numObj) => numObj.id !== id);
    console.log(`Deleting num: ${id}`);
  };

  return { getNums, createNum, findNum, deleteNum };
};

module.exports = db;
