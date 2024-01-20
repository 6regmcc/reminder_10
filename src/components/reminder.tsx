import {Card, CardBody, Checkbox, HStack, Text, Button, Flex, Spacer, Box} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons'
import React from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";





type todo = {
    name: string
    notes: string | null
    status: string

}

export default function Reminder ({name, notes, status, id}: todo) {
    const queryClient = useQueryClient()

    let updatedStatus


    const done = {
        bg: 'red.200',
        textDecoration: 'line-through'
    }
    const [statusState, setChecked] = React.useState(status)
    const [nameState, setName] = React.useState(name)
    const [notesState, setNotes] = React.useState(notes)

    const updateReminder = (updatedReminder: todo) => {
        return fetch(`http://127.0.0.1:8000/todos/${id}` ,{
            method: "PUT",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedReminder)

        }).then((res) => res.json())

    }

    const updateReminderMutation = useMutation({

        mutationFn: updateReminder,

        onSuccess: (data) => {

            queryClient.setQueryData(["todos"],()=>{
                const cacheData = queryClient.getQueriesData( {queryKey: ["todos"]})
                const updatedData = cacheData[0][1].map((todo) => {
                     if (todo.id === id) {
                         return data
                     }else {
                         return todo
                     }
                })
                return updatedData
            }
            )
        },

        onSettled: () => {

            queryClient.invalidateQueries({queryKey: ["todos"]})
        }

        }
    )








    const handleCheck = () => {

        status === "done" ?  updatedStatus = "pending" : updatedStatus = "done"
        console.log(updatedStatus)
        updateReminderMutation.mutate( {name:nameState, notes: notesState, status: updatedStatus})
        queryClient.refetchQueries()

        //setChecked(!checked)
    }

    return (
        <Card my={4} maxWidth="500px" sx={(status === 'done') ? done : {}}>
            <CardBody >

                <Flex gap='6' alignItems='center'>
                    <Box >
                        <Checkbox  isChecked={status === 'done'} onChange={handleCheck}></Checkbox>
                    </Box>
                    <Box  >
                        <Text alignContent={"center"} justifyContent={"center"}>{name}</Text>
                    </Box>
                    <Spacer />
                    <Box>
                        <Button><DeleteIcon /></Button>
                    </Box>
                </Flex>
                <HStack  spacing='20px' >
                </HStack>
            </CardBody>
        </Card>
    )
}
