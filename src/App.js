import React, { useEffect, useState } from "react";
import Table from "./Table";

export const App = () => {
    const [userData, setUserData] = useState([]);
    const [cols, setCols] = useState({});
    const [showTable,setShowTable] = useState(false)
    const fetchUserDataFromAPI = async () => {
        const res = await fetch("https://dummyjson.com/users");
        const data = await res.json();
        setUserData(data?.users);
        setCols(data?.users[0]);
    };

    useEffect(() => {
        fetchUserDataFromAPI();
    }, []);

    const ignoredValues = ['hair', 'address','bank','company'];
    const colsList = Object.keys(cols).map(key=>(key))
    const getCOLNames = (selectedCOLS)=>{
        const colNames = Object.values(selectedCOLS)
        .filter(key => !ignoredValues.includes(key))
        .map(key =>{
            if(key=='id'){
                return { field: key, resizable: true,pinned:'left',width:100 }
            }
            else{
               return { field: key, resizable: true }
            }
        });
        return colNames;
    }
    const [selectedElements, setSelectedElements] = useState([]);

    const handleCheckboxChange = (event) => {
      const { value, checked } = event.target;
      if (checked) {
        setSelectedElements([...selectedElements, value]);
      } else {
        setSelectedElements(selectedElements.filter((element) => element !== value));
      }
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log('Selected elements:', selectedElements);
    };
  return (
    <>
         <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Select Columns</h1>
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-wrap  px-4 py-4">
          {colsList.map((element) => (
            <div key={element} className="flex items-center p-2">
              <input
                type="checkbox"
                id={element}
                value={element}
                checked={selectedElements.includes(element)}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <label htmlFor={element}>{element}</label>
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4"
          onClick={()=>{
            setShowTable(true)
          }}
        >
          Submit
        </button>
      </form>
    </div>

   {showTable && selectedElements.length && <Table colNames={getCOLNames(selectedElements)} userData={userData}/>}
    </>
  );
};
