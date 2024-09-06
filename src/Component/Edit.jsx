import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Edit = () => {
    const { empid } = useParams();
//editing the data of api 
    useEffect(() => {
        fetch("http://localhost:3000/employee/" + empid).then((res) => {
            return res.json();
        }).then((resp) => {
            idchange(resp.id);
            namechange(resp.name);
            emailchange(resp.email);
            phonechange(resp.phone);
            activechange(resp.isactive);
        }).catch((err) => {
            console.log(err.message);
        })
    }, []);

 //making state variables cause the new data will be store in these state to edit these values
    const[id,idchange]=useState("");
    const[name,namechange]=useState("");
    const[email,emailchange]=useState("");
    const[phone,phonechange]=useState("");
    const[active,activechange]=useState(true);
    const[validation,valchange]=useState(false);


    
    const navigate=useNavigate();

//when we click submit the updated values will get stored to api
    const handlesubmit=()=>{
     const empdata={id,name,email,phone,active};
      fetch("http://localhost:3000/employee/"+empid,{
        method:"PUT",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(empdata)
      }).then((res)=>{
        alert('Saved successfully.')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }

  return (
    <div>

        <div className="w-full sm:w-[50%]  m-auto shadow-2xl shadow-gray-500   rounded-2xl border-2 p-2 border-gray-200">
            <div className="my-3">
                <form className="container" onSubmit={handlesubmit}>

                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2 className="text-center text-4xl">Employee Edit</h2>
                        </div>
                        <div className="card-body px-6">

                            <div className="font-medium">

                                <div className="my-4">
                                    <div className="flex flex-col text-xl">
                                        <label>ID</label>
                                        <input value={id} disabled="disabled" className="bg-gray-200 "></input>
                                    </div>
                                </div>

                                <div className="my-4">
                                    <div className="flex flex-col text-xl">
                                        <label>Name</label>
                                        <input required value={name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className="bg-gray-100 font-normal"></input>
                                    {name.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                    </div>
                                </div>

                                <div className="my-4">
                                    <div className="flex flex-col text-xl">
                                        <label>Email</label>
                                        <input value={email} onChange={e=>emailchange(e.target.value)} className="bg-gray-100 font-normal"></input>
                                    </div>
                                </div>

                                <div className="my-4">
                                    <div className="flex flex-col text-xl">
                                        <label>Phone</label>
                                        <input value={phone} onChange={e=>phonechange(e.target.value)} className="bg-gray-100 
                                            font-normal"></input>
                                    </div>
                                </div>

                                <div className="my-4">
                                    <div className="flex-col text-xl">
                                    <input checked={active} onChange={e=>activechange(e.target.checked)} type="checkbox" className="form-check-input"></input>
                                        <label  className="form-check-label">Is Active</label>
                                        
                                    </div>
                                </div>
                                <div className="my-4">
                                    <div className=" flex gap-4">
                                       <button className=" bg-green-800 rounded-lg text-white p-2 px-8" type="submit">Save</button>
                                       <Link to="/" className=" bg-orange-700 rounded-lg text-white p-2 px-8">Back</Link>
                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </form>

            </div>
        </div>
    </div>
  );
}

export default Edit;
