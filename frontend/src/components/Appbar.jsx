
// // Appbar.jsx
// export const Appbar = ({ fullName }) => {
//     // Extract the first character of the firstName
//     const firstCharacter = fullName ? fullName.charAt(0).toUpperCase() : '';

//     return (
//         <div className="shadow h-14 flex justify-between">
//             <div className="flex flex-col justify-center h-full ml-4">
//                 PayTM App
//             </div>
//             <div className="flex">
//                 <div className="flex flex-col justify-center h-full mr-4">
//                     Hello, {fullName}
//                 </div>
//                 <div className="rounded-full h-12 w-12 bg-slate-300 flex justify-center mt-1 mr-2">
//                     <div className="flex flex-col justify-center h-full text-xl">
//                         {firstCharacter}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };
import { useNavigate } from 'react-router-dom';

export const Appbar = ({ fullName }) => {
    const navigate = useNavigate();

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from localStorage
        navigate('/signin'); // Redirect to the sign-in page
    };

    // Extract the first character of the fullName
    const firstCharacter = fullName ? fullName.charAt(0).toUpperCase() : '';

    return (
        <div className="shadow h-14 flex justify-between items-center px-4">
            <div className="flex items-center">
                <span className="text-lg font-bold">PayTM App</span>
                <button 
                    onClick={handleLogout} 
                    className="ml-6 bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
            <div className="flex items-center">
                <span className="mr-4">Hello, {fullName}</span>
                <div className="rounded-full h-12 w-12 bg-slate-300 flex justify-center items-center">
                    <span className="text-xl">{firstCharacter}</span>
                </div>
            </div>
        </div>
    );
};
