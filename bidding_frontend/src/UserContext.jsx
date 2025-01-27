// import { createContext, useEffect, useState } from "react";


// export const AppContext = createContext()
// const AppContextProvider = (props) => {
//     const [userData, setUserData] = useState()

//     const user_id = localStorage.getItem('user_id')
//     useEffect(() => {
//         try {
//             const response = async fetch()
//             if (response.ok) {
//                 const data = await response.json()
//                 setUserData(userData)
//             }
//         } catch (error) {
//             console.error(error)
//         }

//     }, [user_id])

//     const value = {
//         userData, setUserData
//     }

//     return (
//         <AppContext.Provider value={{value}}>
//             {props.children}
//         </AppContext.Provider>
//     )
// }