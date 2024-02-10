import {createContext, ReactNode, useContext} from "react";
import firebase from "firebase/compat";
import UserInfo = firebase.UserInfo;

const UserContext = createContext<UserInfo>(null);
const UserDispatcherContext = createContext<React.Dispatch<Action>>(()=>{});

type Action = {
    type : "sign-in" | "sign-out",
    [property: string] : any
}

function userReducer(user:UserInfo, action:Action){
    if(action.type === 'sign-in'){
        return action.user;
    }else {
        return null;
    }
}

function userProvider({children}:{children: ReactNode}){
   const [user, userDispatcher] = userReducer(userReducer,null);
   return (<UserContext.Provider value={user}>
       <UserDispatcherContext.Provider value={userDispatcher}>
           {children}
       </UserDispatcherContext.Provider>
   </UserContext.Provider>);
}

export function useUser(){
    return useContext(UserDispatcherContext);
}