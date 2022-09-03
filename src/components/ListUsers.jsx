import React, { useContext } from 'react'
import { UserContext } from '../context/UserProvider'


const ListUsers = () => {

    const {users, editUser, deleteUser} = useContext(UserContext)



  return (
    <div>
        <h1 className="text-center">Usuarios</h1>
        {
          users.length > 0 ? (users.map(user => (
                <div className="list-users" key={user.id}>
                    <h2>{user.nombres} {user.apellidos}</h2>
                    <p>{user.edad}</p>
                    <button className="btn btn-danger" onClick={()=> deleteUser(user)}>Elminar</button>
                    <button className="btn btn-warning mx-2" onClick={()=>editUser(user)}>Editar</button>
                </div>
            ))) : (
                <h3 className="text-center my-5">No Existen Usuarios</h3>
            )

        }
    </div>
  )
}

export default ListUsers