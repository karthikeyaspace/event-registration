export default function Success(){
    return (
        <div className="success h-screen">
            <div className="success-block flex flex-col justify-center items-center h-screen px-8 py-12 bg-green-400">
                <h1 className="text-4xl">Payment successful</h1>
                <p>Your Txn Id: </p>
            </div>
        </div>
    )
}