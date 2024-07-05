import { useState } from "react"
import type { MenuItem, OrderItem } from '../types/index'

export default function useOrder(){

    const [order, setOrder] = useState<OrderItem[]>([])
    const [tip, setTip] = useState(0)


    const addItem = (item: MenuItem) =>{
        //Aqui validamos si la orden ya existe, si ya existe le actualizamos la cantidad
        const itemExist = order.find(orderItem => orderItem.id === item.id)
        if (itemExist) {
            //Para actuaizarle la cantidad validamos por el id
            const updateOrder = order.map( orderItem => orderItem.id === item.id ? {...orderItem, quantity: orderItem.quantity + 1} : orderItem)
            setOrder(updateOrder)
        }else{
            //Si la orden no existe se agrega como nueva
            const newItem = {...item, quantity: 1}
            setOrder([...order, newItem])
        }
    }

    const placeOrder = () => {
        setOrder([])
        setTip(0)
    }

    const removeItem = (id: MenuItem['id']) => {
        setOrder(order.filter(item => item.id !== id))
    }

    // console.log(order)

    return {
        addItem,
        order,
        removeItem,
        tip,
        setTip,
        placeOrder
    }
}