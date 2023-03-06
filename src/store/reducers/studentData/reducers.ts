export const setIsStudentFromPlatform = (state:{isStudentFromPlatform:boolean}, action:{payload:any}) => {
    state.isStudentFromPlatform = action.payload;
};

export const setIsFirstTime = (state:{isFirstTime:boolean}, action:{payload:any}) => {
    state.isFirstTime = action.payload;
};
