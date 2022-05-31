import { AlertType } from "../types/alert";

const Alert = ({type, message, display}: AlertType) => {
  
  return(
    (display) ?
      (type === 'danger') ?
      <div className='relative alert border-2 border-solid border-red-600 bg-red-100 rounded-lg py-3 px-6 mb-3 text-base text-red-700 inline-flex items-center w-1/3 alert-dismissible fade show' role="alert">
        <strong className="mr-1">Error </strong> {message}
      </div> :
      <div className='relative alert border-2 border-solid border-green-600 bg-green-100 rounded-lg py-3 px-6 mb-3 text-base text-green-700 inline-flex items-center w-1/3 alert-dismissible fade show' role="alert">
        <strong className="mr-1">Success </strong> {message}
      </div>
    :<></>
  );
};

export default Alert;