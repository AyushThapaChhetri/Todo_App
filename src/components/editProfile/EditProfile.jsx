
import { Provider } from "../ui/provider"
import { Box, Button, Flex, Text } from "@chakra-ui/react"
import SidebarProfile from "./SidebarProfile"
import MyProfile from "./myProfile"
import { useEffect, useState } from "react"
import api from "../../utils/api"
// import { IoIosArrowBack } from "react-icons/io";
// import { DecorativeBox } from "./ui/DecorativeBox"


const EditProfile = () => {
    // const [isShortScreen] = useMediaQuery("(max-height: 800px)");
    const [user, setUser] = useState({
        fullName: "",
        email: "",
        gender: "",
        dob: "",
        createdAt: "",
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("user/me");
                // console.log("User fetched:", response.data);
                setUser(response.data.data); // assuming response.data has the user info
            }
            catch (error) {
                console.error("Error fetching profile: ", error);
            }
        }
        fetchUser();
    }, [])

    return (
        <>
            <Provider>

                <Flex
                    p="2%"
                    bgColor="#e9e9e9"
                    overflow="hidden"
                    height="100vh"
                    width="100vw"
                    direction="column"
                    gap="10px"

                >


                    <Text
                        as="h1"
                        fontSize="24px"
                        color="black"
                        fontWeight="bold"
                        height="5%"

                    >
                        Account Settings
                    </Text>

                    <Flex
                        // height={isShortScreen ? "85%" : { base: "80%" }}
                        bgColor="white"
                        borderWidth="2px"
                        borderColor="gray.300"
                        borderRadius="xl"
                        flexDirection={{ base: "column", md: "row" }}

                    >
                        <Box

                            // justifyContent="center"
                            p={{ base: "2% 1%", md: "3% 1%" }}
                            width={{ base: "100%", md: "20%" }}
                            // height={{ base: "8%", md: "100%" }}
                            borderRightWidth={{ base: "0", md: "2px" }}
                            borderBottomWidth={{ base: "2px", md: "0" }}
                            borderColor="gray.200"

                        // bgColor="white"
                        >
                            <SidebarProfile />
                        </Box>

                        <Box
                            p="3%"
                            display="flex"
                            flexDirection="column"
                            width={{ base: "100%", md: "80%" }}
                            height="100%"
                        >
                            <MyProfile user={user} />
                        </Box>

                    </Flex>
                    <Flex
                        justifyContent="flex-end"
                        // border="2px dashed tomato"
                        gap="10px"

                    >

                        <Button asChild bgColor="gray.400" color="white">
                            <a href="/">Back</a>
                        </Button>
                        <Button bgColor="blue.600" color="white">Confirm</Button>
                    </Flex>
                </Flex>

            </Provider>
        </>
    )
}

export default EditProfile
