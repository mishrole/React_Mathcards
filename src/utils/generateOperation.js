export const generateOperation = () => {

    const generateRandomNumber = () => {
        return Math.floor(Math.random()*21);
    }

    return [generateRandomNumber(), generateRandomNumber()]
}