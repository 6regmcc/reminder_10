import Reminder from "./reminder";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'

const queryClient = new QueryClient()

export default {
    component: Reminder,
    title: "Reminder",
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

export const Default = {
    args: {
        name: "storyname",
        notes: "storybook notes",
        status: "story statgus"
    }
}