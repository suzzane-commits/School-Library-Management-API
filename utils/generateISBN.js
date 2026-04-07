const generateISBN = () => {
  const prefix = "978"; 

  const randomPart = Math.floor(
    1000000000 + Math.random() * 9000000000
  ); 

  return `${prefix}${randomPart}`;
};

module.exports = generateISBN;