import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Details = () => {
const {empid} = useParams();
const [empdata , setEmpdata] = useState({})

    useEffect(()=>{
        //fetching the data from api with the id we get from useParam
        fetch("http://localhost:3000/employee/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            setEmpdata(resp);
        }).catch((err) => {
            console.log(err.message);
        })
    },[])
  return (
    <div>
         

               <div className="w-full sm:w-[50%]  m-auto shadow-2xl shadow-gray-500   rounded-2xl border-2 p-2 border-gray-200">
                
            <div className="my-3  px-6 ">
                <div className="card-title">
                    <h2 className="text-center text-4xl">Employee Details</h2>
                </div>
               
{
    empdata &&
                    <div className="text-xl sm:text-2xl my-4 leading-9  px-6  ">
                        <h2 >The Employee name is : <b className="text-gray-600">{empdata.name}</b>  ({empdata.id})</h2>
                        <h3 className="font-bold">Contact Details</h3>
                        <h5>Email is :<b className="text-gray-600"> {empdata.email}</b></h5>
                        <h5>Phone is : <b className="text-gray-600">{empdata.phone}</b></h5>
                        <Link to="/" ><button className=" bg-orange-700 p-2 text-xl rounded-xl text-white my-4">Back to Listing</button> </Link>
                    </div>
                }
            </div>
            </div>
        
        </div >
  );
}

export default Details;
