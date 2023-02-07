import React from 'react'
import {
    Flex,
    Heading,
    Text,
    Icon
} from '@chakra-ui/react'

export default function NavHoverBox({ title, icon, description }) {
    return (
        <>
            <Flex
                h="100%"
                w="100%"
                py={2}
                flexDir="column"
                alignItems="center"
                justify="center"
                color="#fff"
                textAlign="center"
            >
                <Icon as={icon} fontSize="3xl" mb={4} />
                <Heading size="md" fontWeight="normal">{title}</Heading>
                <Text>{description}</Text>
            </Flex>
        </>
    )
}