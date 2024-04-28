export default function Failure(){
    return (
        <div className="h-screen">
            <div className="flex flex-col justify-center items-center h-screen px-8 py-12 bg-red-400">
                <h1 className="text-4xl">Payment Failed</h1>
                <p>Your Txn Id: </p>
            </div>
        </div>
    )
}