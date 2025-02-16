import { useNavigate } from 'react-router-dom';

const BackButton = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Navega a la página anterior
    };

    return (<>
        <button onClick={handleGoBack} className='btn btn-secondary'>
            Volver
        </button>
        &nbsp;&nbsp;
        </>);
};

export default BackButton;