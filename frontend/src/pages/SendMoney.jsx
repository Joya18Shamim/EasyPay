// import { useNavigate, useSearchParams } from 'react-router-dom';
// import axios from "axios";
// import { useState } from 'react';

// export const SendMoney = () => {
//     const [searchParams] = useSearchParams();
//     const id = searchParams.get("id");
//     const name = searchParams.get("name");
//     const [amount, setAmount] = useState(0);
//     const [isLoading, setIsLoading] = useState(false); // Loading state
//     const navigate = useNavigate(); //1

//     return <div class="flex justify-center h-screen bg-gray-100">
//         <div className="h-full flex flex-col justify-center">
//             <div
//                 class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
//             >
//                 <div class="flex flex-col space-y-1.5 p-6">
//                 <h2 class="text-3xl font-bold text-center">Send Money</h2>
//                 </div>
//                 <div class="p-6">
//                 <div class="flex items-center space-x-4">
//                     <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
//                     <span class="text-2xl text-white">{ name ? name[0].toUpperCase() : ''}</span>
//                     </div>
//                     <h3 class="text-2xl font-semibold">{name}</h3>
//                 </div>
//                 <div class="space-y-4">
//                     <div class="space-y-2">
//                     <label
//                         class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                         for="amount"
//                     >
//                         Amount (in Rs)
//                     </label>
//                     <input
//                         onChange={(e) => {
//                             setAmount(e.target.value);
//                         }}
//                         type="number"
//                         class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
//                         id="amount"
//                         placeholder="Enter amount"
//                     />
//                     </div>

//                     <button onClick={() => {
//                         axios.post("http://localhost:3000/api/v1/account/transfer", {
//                             to: id,
//                             amount
//                         }, {
//                             headers: {
//                                 Authorization: "Bearer " + localStorage.getItem("token")
//                             }
//                         }).then(() => {
//                               // Set loading to false and redirect to the success page with amount
//                             setIsLoading(false);
//                             // Redirect to the success page with amount
//                             navigate('/transfer-success', {
//                                 state: { name, amount }
//                             });
//                         }).catch((error) => {
//                             setIsLoading(false); // Handle error
//                             console.error("Transfer failed", error);
//                             // You can handle the error state here
//                         });
//                     }} class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white">
//                         Initiate Transfer
//                     </button>
//                 </div>
//                 </div>
//         </div>
//       </div>
//     </div>
// }
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from "axios";
import { useState, useEffect } from 'react';

export const SendMoney = () => {
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const name = searchParams.get("name");
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState(0); // User's current balance
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const navigate = useNavigate();

    // Fetch the user's current balance
    useEffect(() => {
        // Assuming you have an API to get the current user's balance
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => {
            setBalance(response.data.balance); // Set the balance from the response
        }).catch((error) => {
            console.error("Failed to fetch balance", error);
        });
    }, []);

    const handleTransfer = () => {
        if (amount > balance) {
            alert("Insufficient balance. Please enter an amount less than or equal to your available balance.");
            return; // Stop the transfer if the amount is greater than the balance
        }

        setIsLoading(true); // Set loading to true before starting transaction

        axios.post("http://localhost:3000/api/v1/account/transfer", {
            to: id,
            amount
        }, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        }).then(() => {
            setIsLoading(false);
            navigate('/transfer-success', {
                state: { name, amount }
            });
        }).catch((error) => {
            setIsLoading(false);
            console.error("Transfer failed", error);
        });
    };

    return (
        <div class="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div class="flex flex-col space-y-1.5 p-6">
                        <h2 class="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center space-x-4">
                            <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span class="text-2xl text-white">{name ? name[0].toUpperCase() : ''}</span>
                            </div>
                            <h3 class="text-2xl font-semibold">{name}</h3>
                        </div>
                        <div class="space-y-4">
                            <div class="space-y-2">
                                <label class="text-sm font-medium leading-none" htmlFor="amount">
                                    Amount (in Rs)
                                </label>
                                <input
                                    onChange={(e) => setAmount(Number(e.target.value))} // Convert input to number
                                    type="number"
                                    class="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                />
                                {/* <p class="text-sm text-gray-500">Your balance: ₹{balance}</p> Show balance */}
                            </div>

                            {/* Display loading spinner and message when loading */}
                            {isLoading ? (
                                <div class="flex flex-col items-center space-y-2">
                                    {/* Tailwind spinner */}
                                    <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-green-500"></div>
                                    <p class="text-lg font-semibold">Transaction Processing...</p>
                                </div>
                            ) : (
                                <button 
                                    onClick={handleTransfer} 
                                    class="justify-center rounded-md text-sm font-medium h-10 px-4 py-2 w-full bg-green-500 text-white hover:bg-green-600 transition-colors"
                                >
                                    Initiate Transfer
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

