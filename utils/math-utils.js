export const getRandomNumber = (maxNumber) =>  Number((Math.random() * maxNumber).toFixed(2))

export const getRandomBoolean = () => Math.random() < 0.5;