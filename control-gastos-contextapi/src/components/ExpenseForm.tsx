import { categories } from "../data/category"
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { useState } from "react"
import { DraftExpense, Value } from "../types"
import { ErrorMessage } from "./ErrorMessage"
import { useBudget } from "../hooks/useBudget"




const ExpenseForm = () => {

    const [expense, setExpense] = useState<DraftExpense>({
        amount: 0,
        expensename: '',
        category: '',
        date: new Date()
    })

    const [error, setError] = useState('')

    const { dispatch } = useBudget()

    const handleChangeDate = (value : Value) => {
        setExpense({
            ...expense,
            date: value
        })
    }

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLSelectElement> ) => {
        const {name, value} = e.target
        const isAmount = ['amount'].includes(name)
        setExpense({
            ...expense,
            [name] : isAmount ? Number(value) : value
        })
    }

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //validar
        if (Object.values(expense).includes('')) {
            setError('Todos los campos son obligatorios')
            return
        }

        //Agregar gasto
        dispatch({type: 'add-expense', payload: {expense}})
    }

  return (
    <form className=" space-y-5" onSubmit={ handleSubmit }>
        <legend className=" uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2">
            Nuevo Gasto
        </legend>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <div className=" flex flex-col gap-2">
            <label 
                htmlFor="expensename"
                className=" text-xl font-black">
                Nombre Gasto:
            </label>
            <input 
                type="text" 
                id="expensename"
                placeholder="Nombre del gasto"
                className=" bg-slate-100 p-2"
                name="expensename"
                value={expense.expensename}
                onChange={handleChange}
            />
        </div>

        <div className=" flex flex-col gap-2">
            <label 
                htmlFor="amount"
                className=" text-xl font-black">
                Cantidad:
            </label>
            <input 
                type="number" 
                id="amount"
                placeholder="Agregar la cantidad del gasto: ej. 300"
                className=" bg-slate-100 p-2"
                name="amount"
                //value={expense.amount}
                onChange={handleChange}
            />
        </div>

        <div className=" flex flex-col gap-2">
            <label 
                htmlFor="category"
                className=" text-xl font-black">
                Categoria:
            </label>
            <select 
                id="category"
                //placeholder="Agregar la cantidad del gasto: ej. 300"
                className=" bg-slate-100 p-2"
                name="category"
                value={expense.category}
                onChange={handleChange}
            >
                <option value="">-- Seleccione --</option>
                {categories.map(category => (
                    <option
                        key={category.id}
                        value={category.id}
                    >
                        {category.name}
                    </option>
                ))}
            </select>
        </div>

        <div className=" flex flex-col gap-2">
            <label 
                htmlFor="amount"
                className=" text-xl font-black">
                Fecha Gastos:
            </label>
            <DatePicker
                className=" bg-slate-100 p-2 border-0"
                value={expense.date}
                onChange={handleChangeDate}
            />
        </div>

        <input 
            type="submit"
            className=" bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
            value={'Registrar Gasto'} 
        />

    </form>
  )
}

export default ExpenseForm
