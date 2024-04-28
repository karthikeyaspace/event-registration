import { Link } from "react-router-dom";

export default function Home() {


    return (
        <div className="home flex flex-col justify-center items-center py-6">
            <h1 className="text-4xl">REGISTER FOR TECHNOVISTA</h1>

            <div className="flex flex-row flex-wrap justify-center items-center w-1/3 h-full">
                <h1 className="text-2xl mt-4 p-4 border-2 border-black hover:bg-gray-300 mx-4 my-8 w-48 h-24 flex justify-center items-center  rounded-md">Coding contest</h1>
                <h1 className="text-2xl mt-4 p-4 border-2 border-black hover:bg-gray-300 mx-4 my-8 w-48 h-24 flex justify-center items-center  rounded-md">24hr hackathon</h1>
                <h1 className="text-2xl mt-4 p-4 border-2 border-black hover:bg-gray-300 mx-4 my-8 w-48 h-24 flex justify-center items-center  rounded-md">Game of Threats</h1>
                <h1 className="text-2xl mt-4 p-4 border-2 border-black hover:bg-gray-300 mx-4 my-8 w-48 h-24 flex justify-center items-center  rounded-md">Cyber Hunt</h1>
                <h1 className="text-2xl mt-4 p-4 border-2 border-black hover:bg-gray-300 mx-4 my-8 w-48 h-24 flex justify-center items-center  rounded-md">Tech elocution</h1>
                <h1 className="text-2xl mt-4 p-4 border-2 border-black hover:bg-gray-300 mx-4 my-8 w-48 h-24 flex justify-center items-center  rounded-md">Project Expo</h1>
                <h1 className="text-2xl mt-4 p-4 border-2 border-black hover:bg-gray-300 mx-4 my-8 w-48 h-24 flex justify-center items-center  rounded-md">Red Teaming</h1>
                <h1 className="text-2xl mt-4 p-4 border-2 border-black hover:bg-gray-300 mx-4 my-8 w-48 h-24 flex justify-center items-center  rounded-md">Data visualization</h1>

            </div>

            <div className="flex flex-col justify-center items-left gap-2">
                <h2 className="text-2xl">149/- for VNR students</h2>
                <h2 className="text-2xl">199/- for non VNR students</h2>
                <h2 className="text-2xl">5 to 7 June 2024</h2>

            </div>
             <Link to='register'>
                <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-6 py-3 me-2 mb-2 mt-4"><h1 className="text-lg">Register for technovista</h1></button>
             </Link>   
        </div>
    );
}
