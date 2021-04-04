export const shuffleOptions = (options) => {
    return options.sort(() => Math.random() - 0.5);
}