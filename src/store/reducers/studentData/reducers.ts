export const setIsFirstTime = (state:{isFirstTime:boolean}, action:{payload:any}) => {
    state.isFirstTime = action.payload;
};
