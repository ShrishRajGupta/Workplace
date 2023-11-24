import axios from "axios";
import { useEffect, useState } from "react";

const postCard = (props)=>{
    return <div style={{margin:"2px 2px 2px 2px",border:"2px solid black"}}>
        <p>JobTitle : {props.jobTitle}</p>
        <p>CompanyName : {props.companyName}</p>
        <p>WorkPlace : {props.workPlace}</p>
        <p>JobLocation : {props.jobLocation}</p>
        <p>JobType : {props.jobType}</p>
        <p>Salary : {props.salary}</p>
    </div>
}
const Allposts = ()=>{
        const [posts,setposts] = useState([]);
        
        const getPosts = async () => {
            try {
              let response = await axios.get("/user/allposts");
              if (response.status === 200) {
                console.log(response.data);
                const postsData = await response.data.allposts; // Assuming 'allposts' is a Promise

                setposts(postsData);
              }
            } catch (err) {
              console.log(err);
            }
          };
        useEffect(()=>{
            getPosts();
        },[]);
    return (
        <div>
            <h2>Notifications</h2>
            {
                posts.map(postCard)
            }
       
        
        </div>
        
    )
}
export default Allposts;