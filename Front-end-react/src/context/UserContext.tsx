import {createContext, ReactNode, useContext, useReducer} from "react";
import {User} from "firebase/auth";

const UserContext = createContext<User | null>(null);
const UserDispatcherContext = createContext<React.Dispatch<Action>>(()=>{});

type Action = {
    type : "sign-in" | "sign-out",
    [property: string] : any
}

function userReducer(user:User, action:Action){
    if(action.type === 'sign-in'){
        return action.user;
    }else {
        return null;
    }
}

export function UserProvider({children}:{children: ReactNode}){
   const [user, userDispatcher] = useReducer(userReducer,null);
   return (<UserContext.Provider value={user}>
       <UserDispatcherContext.Provider value={userDispatcher}>
           {children}
       </UserDispatcherContext.Provider>
   </UserContext.Provider>);
}

export function useUser(){
    return useContext(UserContext);
}

export function useUserDispatcher(){
    return useContext(UserDispatcherContext);
}