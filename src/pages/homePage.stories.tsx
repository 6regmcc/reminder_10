import HomePage from "./homePage";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ChakraProvider } from '@chakra-ui/react'

const queryClient = new QueryClient()



export default {
    component: HomePage,
    title: "HomePage",
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

}