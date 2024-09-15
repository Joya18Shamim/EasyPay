import { useLocation, useNavigate } from 'react-router-dom';

export const TransferSuccess = () => {
    const location = useLocation();
    const { name, amount } = location.state || {}; // Retrieve state
    const navigate = useNavigate(); // Initialize useNavigate

    const goToDashboard = () => {
        navigate('/dashboard'); // Redirect to dashboard
    };

    return (
        <div class="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div class="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div class="flex flex-col space-y-1.5 p-6">
                        <h2 class="text-3xl font-bold text-center">Transfer Successful</h2>
                    </div>
                    <div class="p-6">
                        <div class="text-center space-y-4">
                            {/* Checkmark Icon */}
                            <div class="flex justify-center items-center">
                                <svg 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    class="h-24 w-24 text-green-500" 
                                    viewBox="0 0 24 24" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    strokeWidth="2" 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round"
                                >
                                    <path d="M9 12l2 2l4 -4"></path>
                                    <circle cx="12" cy="12" r="10"></circle>
                                </svg>
                            </div>
                            <p class="text-xl font-semibold text-green-600">You have successfully transferred Rs {amount} to {name}.</p>
                            <button 
                                onClick={goToDashboard} 
                                class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-blue-500 text-white hover:bg-blue-600"
                            >
                                Go to Dashboard
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
