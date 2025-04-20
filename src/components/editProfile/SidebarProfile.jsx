import { List } from "@chakra-ui/react"

const SidebarProfile = () => {
    // const fx = {
    //     base: "sm", sm: "md", md: "lg", lg: "xl"
    // }
    return (
        <List.Root as="ul" listStyleType='none' bgColor="white" color="black"
            display="flex"
            flexDirection={{ base: "row", md: "column" }}
            alignItems="center"
            columnGap={{ base: "4", md: "0" }}
            rowGap={{ base: "0", md: "6" }} >

            <List.Item fontSize={{ base: "0.9rem", md: "1.15rem" }} p="1% 5%" borderRadius="50px" bgColor="blue.50" color="blue.600" fontWeight="bold" >
                My Profile
            </List.Item>

            <List.Item fontSize={{ base: "0.9rem", md: "1.1rem" }} color="tomato" _hover={{
                p: "1% 5%",
                borderRadius: "50px",
                bgColor: "red.700",
                color: "white",
                cursor: "pointer",

            }}>Delete Account</List.Item>
        </List.Root>
    )
}

export default SidebarProfile
