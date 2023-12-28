import { Box } from "@mui/material";

const userimage = ({image, size="60px"}) => {
    return (
        <Box width={size} height={size}>
            <img
                style={{objectFit:"cover" , borderRadius: "50%"}}
                width={size}
                height={size}
                alt="user"
                src={``}
            />
        </Box>
    );
};

export default userimage;