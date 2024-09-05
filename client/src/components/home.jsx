import { useEffect, useState ,useContext} from "react";
import { useNavigate, useParams } from "react-router-dom";
import UserWidget from "../widgets/UserWidget"
import axios from "axios"
import { AuthContext } from "../context/AuthContext";
import "../css/home.css";
import Divider from '@mui/material/Divider';

const PostCard = (props)=>{

    return <div className="post-card">
        <div style={{display:"flex",justifyContent:"space-between", marginRight:"400px"}}>
        <b><u>Job Title: {props.jobTitle}</u></b>
        <br /><br />
        </div>
        <b>Company Name : </b>{props.companyName}<br /><br />
        <b>WorkPlace : </b>{props.workPlace}<br /><br />
        <b>Job Location : </b>{props.jobLocation}<br /><br />
        <b>Job Type : </b>{props.jobType}<br /><br />
        <b>Salary : </b>{props.salary}<br /><br />
        <a href={`/user/applyform/${props.user_id}`}><button className="apply-button" >Apply Now</button></a>
    </div>
}

const Requests = (props)=>{
  // const {user} = useContext(AuthContext);
  const handleClick = async (e)=>{
    const value = e.target.value;
    try{
      const response = await axios.put(`/user/connect/${props.user.from}/${props.user.to}/${value}/${props._id}`);
      console.log(response);
    }
    catch(error){
        console.log(error);
    }
   }
    return <div style={{margin:"2px 2px 2px 2px",border:"2px solid black"}}>
    
        <h1>You have a new friend Request from {props.user.username}</h1>
          <button onClick={handleClick} value="Accept">Accept</button>

        <button onClick = {handleClick} value="Reject">Reject</button>
        
    </div>
}
const Home = ()=>{

  const [user,setUser] = useState(null);
  const getUser = async () => {
      try{
        const response = await axios.get("/user/profile");
        console.log(response)
        if(response.status === 200){
          console.log(response.data);
          setUser(response.data.user);
          console.log(user)
        }
      }
      catch(err){
        console.log(err);
      }
  }

  useEffect(()=>{
    getUser()
  },[])


      // const {user} = useContext(AuthContext);
      // console.log(user);
        
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
              {/* <h2>Job Openings and Friend Requests</h2> */}
              <div className="allnotis">
              
              <div className="postsCard">
              {
                posts.map(PostCard)
              }
              </div>
              <div class="divider"></div>

              <div className="friendRequestsdiv"> 
              {/* {
                (user?.friendRequests ? user.friendRequests.map((friend)=> <Requests user={friend} />): <h1>You are not logged in</h1>)
              } */}
              {
                user?.friendRequests && user.friendRequests.length > 0 ? (
                  user.friendRequests.map((friendreq, index) => (
                    <Requests key={index} user={friendreq} />
                  ))
                ) : (
                  <h2>Your Friend Requests would show up here!!</h2>
                )
              }

              </div>
              </div>
          </div>
        </div>
      </div>
    )
}

export default Home;