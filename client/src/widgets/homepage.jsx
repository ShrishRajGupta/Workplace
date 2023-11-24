
import "../css/home.css";
const Homepage = ()=>{
    return (
        <div className="home"style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", flexDirection: "column"}}>
        <img src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"></img>
        <div className="innerdiv1">
        <h1 style={{ textAlign: "left", marginBottom: "10px" }}>Welcome to WorkPlace</h1>
        <div>
          <a href="/user/login"><button style={{ margin: "0 50px" }}>Login</button></a>
          <a href="/user/register"><button style={{ margin: "0 10px" }}>Signup</button></a>
        </div>
        </div>
      </div>
    )
}
export default Homepage;