import { useEffect, useState } from "react";
import { useFirestore } from "../Hooks/useFirestore";
import { FormValidate } from "../Utils/FormValidate";

import Title from "../components/Title";
import Button from "../components/Button";


const Home = () => {

  
  
  const {required,} = FormValidate()
  const { data, error, loading, getData, addData, deleteData,updateData} = useFirestore(); // Renamed to deleteData for consistency
  const [text, setText] = useState('');
  const[newOriginID,setNewOriginID] =useState()

  useEffect(() => {
    getData();
  }, []); // This will call getData when the component mounts

  if (loading.getData) return <p>Loading data...</p>;
  if (error) return <p>{error}</p>;



  const handleSubmit = async (e) => {
    e.preventDefault();
    if(newOriginID)
    {
      await updateData(newOriginID,text)
      setNewOriginID('')
      setText('')
      return 
    }
    await addData(text);
    setText('');
  };

  const handleClickDelete = async (nanoid) => {
    console.log("click delete");
    await deleteData(nanoid); // Use the item's nanoid
  };

  const handleClickEdit = (item) => {
    console.log("click edit")
    setText(item.origin)
    setNewOriginID(item.nanoid)
  }



  return (
    <div>
      <Title text="Home" />
      <form onSubmit={handleSubmit()}>
        <input
          placeholder="ex:http://bluuweb.org"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        {
          newOriginID ? (

            <Button
            type="submit"
            text="EDIT URL"
            color="green"
            loading={loading.addData}
          />

          ):
          (

                <Button
              type="submit"
              text="ADD URL"
              color="red"
              loading={loading.addData}
            />

          )
        }
        
      </form>
      {data.map((item) => (
        <div key={item.nanoid}>
          <p>{item.nanoid}</p>
          <p>{item.origin}</p>
          <p>{item.uid}</p>
            <div className="flex space-x-2">

              <Button
              type="button"
              text="Delete"
              color="red"
              loading={loading[item.nanoid]} // Adjust loading state for delete
              onClick={() => handleClickDelete(item.nanoid)} // Pass the correct nanoid
            />
            <Button
              type="button"
              text="Edit"
              color="green"
              onClick={() => handleClickEdit(item)} // Pass the correct nanoid
            />

            </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
