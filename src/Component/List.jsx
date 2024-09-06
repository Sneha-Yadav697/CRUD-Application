import  { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import ErrorPage from './ErrorPage';
import axios from 'axios';
import Shimmer from './Shimmer';


const List = () => {
//empdata will store all the api data     
const[empData , setEmpData] = useState()
//isloading is true while page is loading 
const[isLoading , setIsLoading] = useState(true);

const navigate = useNavigate()

//removing the data or deleting the data from the api
const Removefunction = async (id) => {
    if (window.confirm('Do you want to remove?')) {
      try {
        await axios.delete("http://localhost:3000/employee/"+ id);
        alert('Deleted successfully.');
        window.location.reload();
      } catch (err) {
        console.log(err.message);
      }
    }
  }

//navigating to Edit component and also passing the id 
const LoadEdit=(id)=>{   
navigate("/edit/"+id)
}
//navigating to detail component and also passing the id 
const LoadDetail=(id)=>{
    navigate("/detail/"+id)
}

useEffect(() => {
fetchData()  
}, []);

//fetching the data from the api and storing it into setEmpData and seeting the setIsLoading as false
const fetchData = async()=>{
    try{
       const res = await axios.get("http://localhost:3000/employee") 
       setEmpData(res.data)
       setIsLoading(false)
    }catch(error){
        <ErrorPage error={error}/>
    }
    }

  return isLoading === true?(<div className="w-full mx-[42%] my-[50%] "><HashLoader 
  color="#9e2bcf" 
  size={85}
/></div>) :(
<div className="w-full m-auto shadow-2xl shadow-gray-600   rounded-2xl border-2 p-2 border-gray-200 ">
       
    <div className="">
        <div className="card-title  my-3 ">
            <h2 className='text-center text-4xl'>Employee Listing</h2>
        </div>
        <div className="divbtn my-7 ">
                <Link to="/create" className="btn btn-success bg-green-700 rounded-2xl text-white p-4 my-6  ">Add New (+)</Link>
            </div>
        <div className="overflow-auto overflow-x-scroll  scroll-smooth ">
          
            <table className="w-full  ">
                <thead className="bg-gray-50 border-b-2 border-gray-200 text-black text-2xl ">
                    <tr>
                        <td className='p-3 text-lg font-semibold tracking-wide text-left whitespace-nowrap'>ID</td>
                        <td className='p-3 text-lg font-semibold tracking-wide text-left whitespace-nowrap'>Name</td>
                        <td className='p-3 text-lg font-semibold tracking-wide text-left whitespace-nowrap'>Email</td>
                        <td className='p-3 text-lg font-semibold tracking-wide text-left whitespace-nowrap'>Phone</td>
                        <td className='p-3 text-lg font-semibold tracking-wide text-left whitespace-nowrap'>Action</td>
                    </tr>
                </thead>
                <tbody>
                    {//if there is no data shimmer ui should display othervise the data should display
                     empData.length === 0?<Shimmer/>: empData &&
                        empData.map((item)=>(
                            <tr className='border-b-2' key={item.id}>
                               <td >{item.id}</td>
                                        <td className='p-3 text-lg text-gray-700 whitespace-nowrap'>{item.name}</td>
                                        <td className='p-3 text-lg text-gray-700 whitespace-nowrap'>{item.email}</td>
                                        <td className='p-3 text-lg text-gray-700 whitespace-nowrap'>{item.phone}</td>
                                        <td className='p-3 text-lg text-gray-700 whitespace-nowrap'><a onClick={() => { LoadEdit(item.id) }} className="bg-blue-900  p-2 rounded-xl text-white cursor-pointer ">Edit</a>
                                            <a onClick={() => { Removefunction(item.id) }} className=" bg-red-600 mx-2 p-2 rounded-xl text-white cursor-pointer ">Remove</a>
                                            <a onClick={() => { LoadDetail(item.id) }} className="bg-yellow-500  p-2 rounded-xl text-white cursor-pointer ">Details</a>
                                        </td>
                            </tr>
                        ))
                    }
                </tbody>

</table>
</div>
</div>
</div>
  );
}

export default List;
