import { shuffleOptions } from "./shuffleOptions";

export const generateOptions = (currentAnswer, optionsAmount) => {

    const generateRandomOption = () => {
        return Math.floor(Math.random()*(currentAnswer*optionsAmount));
    }

    const randomOptions = () => {

        let options = [];

        if(options.length <= optionsAmount) {
            for (let i = 0; i < optionsAmount; i++) {

                let actualRandomNumber = generateRandomOption();
    
                if(currentAnswer === actualRandomNumber || options.includes(actualRandomNumber)) {
                    optionsAmount += 1;
                } else {
                    options.push(actualRandomNumber); 
                }
                          
            }
        }

        return [currentAnswer, ...options]
    }

    return shuffleOptions(randomOptions())
}