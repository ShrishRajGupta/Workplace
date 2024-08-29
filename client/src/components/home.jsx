import { useEffect, useState ,useContext} from "react";
import { useNavigate } from "react-router-dom";
import UserWidget from "../widgets/UserWidget"
import axios from "axios"
import { AuthContext } from "../context/AuthContext";
import "../css/home.css";
const PostCard = (props)=>{

    return <div className="post-card">
        <div style={{display:"flex",justifyContent:"space-between"}}>
        <p>JOB Title: {props.jobTitle}</p>
        <a href="/user/applyform"><button className="apply-button" >Apply Now</button></a>
        </div>
        <p>Company Name : {props.companyName}</p>
        <p>WorkPlace : {props.workPlace}</p>
        <p>Job Location : {props.jobLocation}</p>
        <p>Job Type : {props.jobType}</p>
        <p>Salary : {props.salary}</p>
    </div>
}

const Requests = (props)=>{
  const {user} = useContext(AuthContext);
  const handleClick = async (e)=>{
    const value = e.target.value;
    try{
      const response = await axios.put(`/user/connect/${props.from}/${props.to}/${value}/${props._id}`);
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
      const {user} = useContext(AuthContext);
      console.log(user);
        
        document.addEventListener('DOMContentLoaded', function() {
          const loading = document.getElementById('loading');
      
          // Show loading spinner before the window unloads
          window.addEventListener('beforeunload', function() {
              loading.style.display = 'flex';
          });
      
          // Optional: Show loading spinner on link clicks
          document.querySelectorAll('a').forEach(link => {
              link.addEventListener('click', function(event) {
                  event.preventDefault();
                  loading.style.display = 'flex';
                  setTimeout(() => {
                      window.location.href = this.href;
                  }, 500); // Delay for visual effect
              });
          });
      });
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
            <div id="loading" class="loading">
                <div class="spinner">
                </div>
          </div>
        <div className="homediv">
          <div className="userInfodiv">
                <UserWidget />
          </div>

          <div className="notidiv">
              <h2>Notifications</h2>
              <div>
              <div className="friendRequestsdiv">
              {
                (user.user.friendRequests !== undefined ?user.user.friendRequests.map(Requests): <h1>You are not logged in</h1>)
              }
              </div>
              {
                posts.map(PostCard)
              }
              </div>
          </div>
        </div>
      </div>
    )
}

export default Home;