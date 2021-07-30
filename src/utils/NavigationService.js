import { CommonActions, StackActions } from '@react-navigation/native';
import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function reset(name, params) {
  let resetCourse='Home';
    navigationRef.current?.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [
            {
              name:resetCourse ,
            },
            {
              name: name,
              params: params,
            },
          ],
        })
      );
}
export function resetFirst(name, params) {
    navigationRef.current?.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: name,
              params: params,
            },
          ],
        })
      );
}

// export function push(name, params) {
//   navigationRef.current?.push(name, params);
// }


export function push (name, params){
  navigationRef.current?.dispatch(
    StackActions.push(name,params)
  )
}


export function goBack() {
  navigationRef.current?.dispatch(
    CommonActions.goBack()
  )
}


// let _navigator;

// function setTopLevelNavigator(navigatorRef) {
//     _navigator = navigatorRef;
// }   

// function navigate(name, params) {
//     _navigator.dispatch(
//         CommonActions.navigate({
//             name,
//             params,
//         })
//     );
// }

// function push(routeName, params) {
//     _navigator.dispatch(
//         StackActions.push({
//             routeName,
//             params,
//         })
//     );
// }

// function goBack() {
//     _navigator.dispatch(
//         CommonActions.back()
//     );
// }
// function resetFirst(routeName, params) {
//     _navigator.dispatch(
//         StackActions.reset({
//             index: 0,
//             actions: [
//                 CommonActions.navigate({ routeName,params}),
//             ],
//           })
//     )
// }

// export default {
//     navigate,
//     setTopLevelNavigator,
//     goBack,
//     resetFirst,
//     push
// };
