import axios from "axios";
import { useEffect, useState } from "react";

const postCard = (props)=>{
    return <div style={{margin:"2px 2px 2px 2px",border:"2px solid black"}}>
        <p>{props.jobTitle}</p>
        <p>{props.companyName}</p>
        <p>{props.workPlace}</p>
        <p>{props.jobLocation}</p>
        <p>{props.jobType}</p>
        <p>{props.salary}</p>
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
            <h2>All posts</h2>
            {
                posts.map(postCard)
            }
       
        
        </div>
        
    )
}
export default Allposts;