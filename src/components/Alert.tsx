interface AlertProps {
    message: string;
  }
  
  export default function Alert(props: AlertProps) {
    const { message } = props;
  
    return (
      <div
        className=" bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded absolute bottom-3 right-3 mb-2 text-center"
        role="alert"
      >
        <span className="sm:inline block">{message}</span>
      </div>
    );
  }