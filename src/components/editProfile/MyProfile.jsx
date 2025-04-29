import { Box, Flex, Icon, Text, useMediaQuery } from "@chakra-ui/react"
import { Avatar } from "@chakra-ui/react"
import bhaktapurImg from '../../assets/bhaktapuriph.jpg';
import { CiEdit } from "react-icons/ci";
import PropTypes from "prop-types";


const MyProfile = ({ user }) => {
    const [isShortScreen] = useMediaQuery("(max-height: 800px)");
    // const [isCompactView] = useMediaQuery("(max-width: 768px) and (max-height: 600px)");

    const fullName = user.fullName || ""; // fallback to empty if undefined
    const firstSpaceIndex = fullName.indexOf(" ");

    let firstName = fullName;
    let lastName = "-";

    // Helper to capitalize first letter
    const capitalize = (str) => {
        if (!str) return "";
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    };

    if (firstSpaceIndex !== -1) {
        firstName = fullName.slice(0, firstSpaceIndex);
        lastName = fullName.slice(firstSpaceIndex + 1).trim();
    }

    firstName = capitalize(firstName);
    lastName = capitalize(lastName);
    let capitalizedFullName = capitalize(fullName);
    // console.log(fullName);

    const dob = user.dob;
    const dateOnly = new Date(dob).toLocaleDateString('en-CA');

    return (
        <>
            <Text
                as="h2"
                fontSize="20px"
                color="black"
                fontWeight="bold"
                pb={{ base: "10px" }}
            >
                My Profile
            </Text>

            <Flex
                width={{ base: "100%" }}
                height="100%"
                direction="column"
                // border="2px solid green"
                gap="5px"
            >
                <Flex
                    width={{ base: "100%" }}
                    // height={isShortScreen ? "25%" : { base: "16%", sm: "18%", md: "18%", lg: "19%", xl: "20%" }}
                    borderColor="gray.200"
                    borderRadius="xl"
                    borderWidth="2px"
                    bgColor="white"
                    p="2.5%"
                    alignItems="center"
                    gap="20px"
                >
                    <Avatar.Root
                        boxSize={isShortScreen ? "60px" : {
                            base: "60px",
                            sm: "75px",
                            md: "85px",
                            lg: "86px",
                            xl: "90px",
                            "2xl": "95px"
                        }}
                    >
                        <Avatar.Fallback name={capitalizedFullName} />
                        <Avatar.Image src={bhaktapurImg} />
                    </Avatar.Root>



                    <Box
                        // border="2px dashed green"
                        width="70%"
                    >
                        <Text
                            as="h4"
                            color="black"
                            fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl", xl: "2xl" }}
                        >{capitalizedFullName}</Text>
                        <Text
                            color="gray"
                            fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                        >Intern</Text>
                        <Text
                            color="gray"
                            fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                        >Satungal, Kalanki</Text>


                    </Box>

                    <Flex
                        borderWidth="1px"
                        borderColor="gray.200"
                        p=".5% 1%"
                        borderRadius="50px"
                        gap="2px"
                        alignItems="center"
                        position="absolute"
                        // right="6%"
                        right={{ base: "12%", md: "9%" }}

                    >
                        <Text
                            color="gray"
                            fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }

                            }
                        >Edit</Text>
                        <Icon as={CiEdit} boxSize={5} color="gray" />
                        {/* <Icon size="md" color="gray">

                            <CiEdit />
                        </Icon> */}
                    </Flex>
                </Flex>


                <Flex
                    width={{ base: "100%" }}
                    // height={isShortScreen ? "50%" : { base: "50%" }}
                    // height={isShortScreen ? "68%" : { base: "58%", sm: "45%", md: "50%", lg: "50%", xl: "61%", "2xl": "70%" }}
                    borderColor="gray.200"

                    borderRadius="xl"
                    borderWidth="2px"
                    direction="column"
                    bgColor="white"
                    p="2.5%"
                    gap={isShortScreen ? "10px" : { base: "20px" }}
                >
                    <Flex
                        // border="2px dashed green"
                        width="100%"
                        height={{ base: "12%", xl: "15%" }}
                    >
                        <Text
                            as="h4"
                            color="black"
                            fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl", xl: "2xl" }}
                            width="90%"
                            fontWeight="bold"

                        >Personal Information</Text>
                        <Flex
                            borderWidth="1px"
                            borderColor="gray.200"

                            p=".5% 1%"
                            borderRadius="50px"
                            gap="2px"
                            position="absolute"
                            right={{ base: "12%", md: "9%" }}
                        >
                            <Text
                                color="gray"
                                fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                            >Edit</Text>
                            <Icon as={CiEdit} boxSize={5} color="gray" />
                            {/* <Icon size="md" color="gray">

                                <CiEdit />
                            </Icon> */}
                        </Flex>

                    </Flex>

                    <Flex
                        // border="2px dashed brown"
                        width="100%"
                        height="100%"
                        gap="20%"
                    // height={{ base: "12%", xl: "15%" }}
                    >
                        <Flex
                            direction="column"
                            gap="20px"

                        >
                            <Box
                            >

                                <Text
                                    color="gray"
                                    fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                                >First Name</Text>

                                <Text
                                    as="h6"
                                    color="black"
                                    fontSize={{ base: "12px", sm: "md", md: "lg", lg: "xl", xl: "xl" }}
                                >{firstName}</Text>
                            </Box>

                            <Box>

                                <Text
                                    color="gray"
                                    fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                                >Last Name</Text>

                                <Text
                                    as="h6"
                                    color="black"
                                    fontSize={{ base: "12px", sm: "md", md: "lg", lg: "xl", xl: "xl" }}
                                >{lastName}</Text>
                            </Box>

                            <Box>

                                <Text
                                    color="gray"
                                    fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                                >Email address</Text>

                                <Text
                                    as="h6"
                                    color="black"
                                    fontSize={{ base: "12px", sm: "md", md: "lg", lg: "xl", xl: "xl" }}
                                >{user.email}</Text>
                            </Box>


                        </Flex>

                        <Flex
                            direction="column"
                            gap="20px"

                        >

                            {/* <Box>
                                <Text
                                    color="gray"
                                    fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                                >Phone</Text>

                                <Text
                                    as="h6"
                                    color="black"
                                    fontSize={{ base: "12px", sm: "md", md: "lg", lg: "xl", xl: "xl" }}
                                >9846531138</Text>
                            </Box> */}
                            <Box>
                                <Text
                                    color="gray"
                                    fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                                >Gender</Text>

                                <Text
                                    as="h6"
                                    color="black"
                                    fontSize={{ base: "12px", sm: "md", md: "lg", lg: "xl", xl: "xl" }}
                                >{user.gender}</Text>
                            </Box>

                            <Box>

                                <Text
                                    color="gray"
                                    fontSize={{ base: "xs", sm: "sm", md: "md", lg: "lg" }}
                                >DOB</Text>

                                <Text
                                    as="h6"
                                    color="black"
                                    fontSize={{ base: "12px", sm: "md", md: "lg", lg: "xl", xl: "xl" }}
                                >{dateOnly}</Text>
                            </Box>
                        </Flex>
                    </Flex>



                </Flex>

            </Flex>

        </>
    )
}

export default MyProfile

MyProfile.propTypes = {
    user: PropTypes.shape({
        fullName: PropTypes.string,
        email: PropTypes.string,
        gender: PropTypes.string,
        dob: PropTypes.string,
        createdAt: PropTypes.string,
    }).isRequired,
};