import Reminders from "../components/reminders";
import { useQuery } from '@tanstack/react-query'

export default function HomePage () {
    const  fetchTodoList = async ():Promise<[]> => {
        const response = await fetch("http://127.0.0.1:8000/todos")
        const todos = await response.json()
        //console.log(todos)
        return todos

    }

    const {isLoading, isError, data, error} = useQuery({queryKey: ["todos"], queryFn: fetchTodoList})

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }



    //console.log(data)
    return (
        <Reminders reminders={data}/>
    )
}