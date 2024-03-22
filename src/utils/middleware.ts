// import axios from 'axios';

// interface dispatch {
//   type: string;
//   params: string;
// }
// function apiMiddleware({ dispatch, getState }: { dispatch: dispatch, getState: any }) {
//   return next => action => {
//     if (action.type === 'FETCH_DATA') {
//       const { url } = action.payload;
//       axios.get(url)
//         .then(response => {
//           dispatch({
//             type: 'FETCH_DATA_SUCCESS',
//             payload: {
//               data: response.data
//             }
//           });
//         })
//         .catch(error => {
//           dispatch({
//             type: 'FETCH_DATA_FAILURE',
//             payload: {
//               error: error.message
//             }
//           });
//         });
//     }
//     return next(action);
//   };
// }
export {};
// export default apiMiddleware;