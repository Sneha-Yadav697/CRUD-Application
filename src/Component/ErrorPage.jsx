
//when the api not woking this page will show with error details
const ErrorPage = ({error}) => {
  return (
    <div>
 <h1>{error.status}</h1>
 <h1>{error.message}</h1>
 
    </div>
  );
}

export default ErrorPage;
