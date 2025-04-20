
import { Box } from "@chakra-ui/react"
import PropTypes from 'prop-types';

export const DecorativeBox = ({ children, ...props }) => {
    return (
        <Box bg="teal.300" borderRadius="md" textAlign="center" {...props}>
            {children}
        </Box>
    );
}

DecorativeBox.propTypes = {
    children: PropTypes.node,
    height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}
