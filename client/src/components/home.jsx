import { useEffect, useState ,useContext} from "react"
import UserWidget from "../widgets/UserWidget"
import axios from "axios"
import { Context } from '..';

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

const Requests = (props)=>{
  const {isAuthenticated,User,setUser} = useContext(Context);
  const handleClick = async (e)=>{
    const value = e.target.value;
    try{
      const response = await axios.put(`/user/connect/${props.from}/${props.to}/${value}/${props._id}`);
      setUser(response.data.user);
      console.log(response);
    }
    catch(error){
        console.log(error);
    }
   }
    return <div style={{margin:"2px 2px 2px 2px",border:"2px solid black"}}>
    
        <h1>You have a new friend Request from {props.username}</h1>
          <button onClick={handleClick} value="Accept">Accept</button>

        <button onClick = {handleClick} value="Reject">Reject</button>
        
        
    </div>
}
const Home = ()=>{
      const {isAuthenticated,User} = useContext(Context);
        const [posts,setposts] = useState([]);
        const getUser = async()=>{

        }
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
            getUser();
        },[]);
    return (
        <div>
            <UserWidget />
            <h2>Notifications</h2>
            {
              (User.friendRequests !== undefined ?User.friendRequests.map(Requests): <h1>You are not logged in</h1>)
            }
            {
                posts.map(postCard)
            }

        </div>
    )
}

export default Home;