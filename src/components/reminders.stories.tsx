import Reminders from "./reminders";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'

const queryClient = new QueryClient()

const reminders = [{name:"mockData name",notes:"mockData notes",status: "done"},{name:"mockData name",notes:"mockData notes",status: "done"} ]

export default {
    component: Reminders,
    title: "Reminders",
    tags: ['autodocs'],
    decorators: [
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <ChakraProvider>
                    {Story()}
                </ChakraProvider>
            </QueryClientProvider>
        )
    ],

}


export const Default = () => <Reminders reminders={reminders}/>