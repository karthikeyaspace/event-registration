import { Link } from "react-router-dom";

export default function Home() {


    return (
        <div className="home">
            <h1 className="text-4xl ">REGISTER FOR TECHNOVISTA</h1>
             <Link to='register'>
                <button>Register for technovista</button>
             </Link>   
        </div>
    );
}
