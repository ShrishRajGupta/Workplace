import { useEffect, useState } from "react"
import UserWidget from "../widgets/UserWidget"
import axios from "axios"


const postCard = (props)=>{
    return <div style={{margin:"2px 2px 2px 2px",border:"2px solid black"}}>
        <p>JOB Title: {props.jobTitle}</p>
        <p>Company Name : {props.companyName}</p>
        <p>WorkPlace : {props.workPlace}</p>
        <p>Job Loacation : {props.jobLocation}</p>
        <p>Job Type : {props.jobType}</p>
        <p>Salary : {props.salary}</p>
    </div>
}
const Home = ()=>{
        const [posts,setposts] = useState([]);
        
        const getPosts = async () => {
            try {
              let response = await axios.get("/home");
              if (response.status === 200) {
                console.log(response.data);
                const postsData = await response.data.posts; // Assuming 'allposts' is a Promise
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
            <UserWidget />
            <h2>All posts</h2>
            {
                posts.map(postCard)
            }
        </div>
    )
}

export default Home;