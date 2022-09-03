import React, { createContext, useEffect, useState } from 'react'
export const UserContext = createContext()

const UserProvider = ({children}) => {

    const [users, setUsers] = useState([]);
    const [userToEdit, setUserToEdit] = useState({});
    const [activeUserEdit, setactiveUserEdit] = useState(false);

    useEffect(() => {
        getUsers()
    }, []);

    const getUsers = () => {
        fetch("http://localhost:3000/Users")
        .then(users => users.json())
        .then(res=> setUsers(res))
        .catch(error => console.log(error))
    }

    const editUser = (user) => { 
        setactiveUserEdit(true)
        setUserToEdit(user)
    }

    const saveUsers = async(user) => {
        const {nombres, apellidos, edad} = user
        
        if (activeUserEdit) {
            try {
                const options = {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombres,
                        apellidos,
                        edad
                    })
                }

                fetch(`http://localhost:3000/Users/${userToEdit.id}`, options)
                const userEdit = users.map(item => item.id === userToEdit.id ? {...item, nombres:user.nombres, apellidos: user.apellidos, edad: user.edad} : item);   
                setUsers(userEdit)
                
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
            
                const options = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        nombres,
                        apellidos,
                        edad
                    })
                }
        
                const res = await fetch("http://localhost:3000/Users", options)
                const data = await res.json()
                setUsers([...users, data]);
                
            } catch (error) {
                console.log(error);
            }
        }
        
    }

    const deleteUser = async(user) => { 
        const isDelete = window.confirm(`Deseas eliminar el Usuario ${user.nombres} ?`)

        if (isDelete) {
            try {
                const options = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    }
                    
                }
    
                fetch(`http://localhost:3000/Users/${user.id}`, options)
                    const arrayDelete = users.filter(item => item.id !== user.id);   
                    setUsers(arrayDelete)
            } catch (error) {
                console.log(error);
            }
        }
        

    }

    

    
  return (
    <UserContext.Provider value={{users, saveUsers, editUser, activeUserEdit, userToEdit, deleteUser}}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider