import { useLoader } from '../../contextAPI/loaderContext';
import { BeatLoader } from 'react-spinners';



// Component to display the spinner based on the loading state
export const LoadingSpinner = () => {
    const { isLoading } = useLoader();

    if (!isLoading) return null;

    return (
        <div style={{
            position: 'fixed', // Fix the spinner position
            top: '50%', // Center vertically
            left: '50%', // Center horizontally
            transform: 'translate(-50%, -50%)', // Adjust the exact center
            zIndex: 1500 // Make sure it is above other content
        }}>
            <BeatLoader color="#36D7B7" />
        </div>
    );
}