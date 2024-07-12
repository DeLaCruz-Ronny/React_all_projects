import { useMemo } from "react"
import type { Activity } from "../types"
import { CaloryDisplay } from "./CaloryDisplay"

type CaloriesTrackerProps = {
    activities: Activity[]
}
 
 export const CaloriesTracker = ({activities}: CaloriesTrackerProps) => {

    //Contadores
    const caloriesConsumed = useMemo(() => activities.reduce((total, activity) => activity.category === 1 ? total + activity.calories : total, 0) , [activities])

    const caloriesBorned = useMemo(() => activities.reduce((total, activity) => activity.category === 2 ? total + activity.calories : total, 0) , [activities])

    const netCalories = useMemo(() => caloriesConsumed - caloriesBorned, [activities])

   return (
     <>
        <h2 className=" text-4xl font-black text-white text-center">Resumen de Calorias</h2>

        <div className=" flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
            <CaloryDisplay
                calories={caloriesConsumed}
                text="Consumidas" 
            />

            <CaloryDisplay
                calories={caloriesBorned}
                text="Ejercicio" 
            />

            <CaloryDisplay
                calories={netCalories}
                text="Diferencia" 
            />
        </div>
     </>
   )
 }
 