import {
    ManageAccountsOutlined,
    EditOutlined,
    LocationOnOutlined,
    WorkOutlineOutlined,
} from "@mui/icons-material";

import {Box, Typography, Divider, useTheme } from "@mui/material";
import userimage from "../components/userimage";
import FlexBetween from "../components/FlexBetween";
import widgetwrapper from "../components/widgetwrapper";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

const UserWidget = () => {
    const [user, setUser] = useState([]);
    const {palette} = useTheme();
    const navigate = useNavigate();
  
    // const dark = palette.neutral.dark;
    // const medium = palette.neutral.medium;
    // const main = palette.neutral.main;


    const getUser = async () => {
        try {
          let response = await axios.get("/user/profile");
          if (response.status === 200) {
            console.log(response.data.user);
            setUser(response.data.user);
          }
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      };

    useEffect(()=>{
        getUser();
    },[])

    return (
        <widgetwrapper>
            {/*First Row*/}
            <FlexBetween
                gap = "0.5rem"
                pb = "1.1rem"
                // onClick = {()=>navigate(`/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <userimage  />
                    <Box>
                        <Typography
                            variant="h4"
                            color="black"
                            fontWeight="500"
                            sx={{
                                "&:hover":{
                                    color: 'black',
                                    cursor: "pointer"
                                }
                            }}>
                                {user.username}
                            </Typography>
                            {/* <Typography color={medium}>{friends.length} friends</Typography> */}
                    </Box>
                    <ManageAccountsOutlined />
                </FlexBetween>

                <Divider />

                {/*Second Row*/}
                <Box p="1rem 0">
                    <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                        <LocationOnOutlined fontSize="large" sx={{color:"black"}} />
                        <Typography color="black">{user.About}</Typography>
                    </Box>

                    <Box display="flex" alignItems="center" gap="1rem">
                        <WorkOutlineOutlined fontSize="large" sx={{color:"black"}} />
                        <Typography color="black">{user.Education}</Typography>
                    </Box>
                </Box>

                {/*Third Row*/}
                <Box p="1rem 0">
                    <FlexBetween mb="0.5rem">
                        <Typography color="black">Who's viewed your profile</Typography>
                        <Typography color="black" fontWeight="500">{user.workExperience}</Typography>
                    </FlexBetween>

                    <FlexBetween>
                        <Typography color="black">Impressions of your project</Typography>
                        <Typography color="black" fontWeight="500">{user.Skills}</Typography>
                    </FlexBetween>
                </Box>
                {/*Fourth Row*/}
                <Box p="1rem 0">
                    <Typography fontSize="1rem" color="black" fontWeight="500" mb="1rem">
                        Social Profiles
                    </Typography>
                    <FlexBetween gap="1rem" mb="0.5rem">
                        <FlexBetween gap="1rem">
<<<<<<< HEAD
                            <img src="#" alt="twitter" />
=======
                            <img src="" alt="twitter" />
>>>>>>> ccb34bc3a3944cbc28d8a422765967a2e0b2d85a
                            <Box>
                                <Typography color="black" fontWeight="500">
                                    Twitter
                                </Typography>
                                <Typography color="black">Social Network</Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color:"black"}} />
                    </FlexBetween>

                    <FlexBetween gap="1rem">
                        <FlexBetween gap="1rem">
<<<<<<< HEAD
                            <img src="#" alt="linkedin" />
=======
                            <img src="" alt="linkedin" />
>>>>>>> ccb34bc3a3944cbc28d8a422765967a2e0b2d85a
                            <Box>
                                <Typography color="black"fontWeight="500">
                                    LinkedIn
                                </Typography>
                                <Typography color="black">Network Platform</Typography>
                            </Box>
                        </FlexBetween>
                        <EditOutlined sx={{color:"black"}} />
                    </FlexBetween>
                </Box>
            </FlexBetween>            
        </widgetwrapper>
    )
};

export default UserWidget;