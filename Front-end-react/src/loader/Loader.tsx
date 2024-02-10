import './Loader.css'
export const Loader = () => {
    return (
        <div className="Loader d-flex vh-100
        justify-content-center align-items-center">
            <div className="lds-circle"><div></div>
            </div>
        </div>
    );
};