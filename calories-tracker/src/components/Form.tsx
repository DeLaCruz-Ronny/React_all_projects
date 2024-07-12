import { Dispatch, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid'
import { categories } from "../data/categories";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from "../reducers/activity-reducer";

type formProp = {
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
};

const initialState1: Activity = {
    id: uuidv4(),
    category: 1,
    name: "",
    calories: 0,
}

export const Form = ({ dispatch, state }: formProp) => {
  const [activity, setActivity] = useState<Activity>(initialState1);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeId )[0]
      setActivity(selectedActivity)
    }
  }, [state.activeId])

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== "" && calories > 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-activity", payload: { newActivity: activity } });
    setActivity({...initialState1, id: uuidv4()});
  };

  return (
    <form
      className=" space-y-5 bg-white shadow p-10 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className=" font-bold">
          Categorias:
        </label>
        <select
          id="category"
          value={activity.category}
          onChange={handleChange}
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
        >
          {categories.map((categori) => (
            <option value={categori.id} key={categori.id}>
              {categori.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className=" font-bold">
          Actividad:
        </label>
        <input
          type="text"
          id="name"
          className=" border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicios, Pesas, etc"
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className=" font-bold">
          Calorias:
        </label>
        <input
          type="number"
          id="calories"
          className=" border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias. Ej. 300, 400, etc"
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
        disabled={!isValidActivity()}
      />
    </form>
  );
};
