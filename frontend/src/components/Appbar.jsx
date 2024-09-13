
// Appbar.jsx
export const Appbar = ({ fullName }) => {
    // Extract the first character of the firstName
    const firstCharacter = fullName ? fullName.charAt(0).toUpperCase() : '';

    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4">
                PayTM App
            </div>
            <div className="flex">
                <div className="flex flex-col justify-center h-full mr-4">
                    Hello, {fullName}
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-300 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {firstCharacter}
                    </div>
                </div>
            </div>
        </div>
    );
};
