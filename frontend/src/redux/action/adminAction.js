// import adminAPI from "api/adminAPI";

import adminAPI from "../../api/adminAPI";

export const adminAccountInfo = (user) => {
    return async (dispatch) => {
        
       dispatch({
        type: 'LOGGIN_REQUEST',

       })
       adminAPI.login(user).then((result)=>{
      

        dispatch({
            type: 'LOGGIN_SUCCESS',
            payload: {
                data: result.data,
                token: result.data.token
            }
        })
       }).catch((err)=>{
        dispatch({
            type: 'LOGGIN_FAIL',
            payload: {
                err: err.response.data.message
            }
        })
       })
    };
};
