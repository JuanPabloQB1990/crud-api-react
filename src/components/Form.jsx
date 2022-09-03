import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/UserProvider'

const initialForm = {
    nombres: "",
    apellidos: "",
    edad: ""
}

const Form = () => {

    const [form, setForm] = useState(initialForm);
    const {saveUsers, activeUserEdit, userToEdit} = useContext(UserContext)

    useEffect(() => {
        if (activeUserEdit) {
            setForm(userToEdit)
        } else {
            setForm(initialForm)
        }
    }, [activeUserEdit, userToEdit]);

    const handleChange = (e) => { 
        e.preventDefault()
        setForm({ ...form, [e.target.name] : e.target.value})

     }

    const handleSubmit = (e) => {
        e.preventDefault()
        saveUsers(form)
        setForm(initialForm)
    }

  return (
    <div>
        <h1 className="text-center">Formulario</h1>
        <form onSubmit={handleSubmit} className="formulario">
            <label htmlFor="nombres">Nombres:</label>
            <input type="text" name="nombres" id="nombres" onChange={handleChange} value={form.nombres}/>
            <label htmlFor="apellidos">Apellidos:</label>
            <input type="text" name="apellidos" id="apellidos" onChange={handleChange} value={form.apellidos}/>
            <label htmlFor="edad">Edad:</label>
            <input type="number" name="edad" id="edad" onChange={handleChange} value={form.edad}/>
            <div className="d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-primary" type="submit">{activeUserEdit ? "Editar" : "Guardar"}</button>
            </div>
        </form>
    </div>
  )
}

export default Form