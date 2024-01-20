import Reminder from "./reminder";
import {Container} from "@chakra-ui/react";
type reminder = {
    name: string
    notes: string | null
    status: string
    id: number
}

type reminders = Array<reminder>

export default function Reminders ({reminders}:reminders) {
    const sortedReminders = reminders.sort((a,b) => a.id - b.id )
    return (
        <Container>
            {

                sortedReminders.map((reminder) => {

                return <Reminder key={reminder.id} name={reminder.name} notes={reminder.notes} status={reminder.status} id={reminder.id}/>
            })}
        </Container>
    )
}