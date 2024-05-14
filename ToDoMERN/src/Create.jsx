import React,{useState} from 'react'
import axios from 'axios';

const Create = () => {
    const [task,setTask] = useState('');
    const handleAdded = () => {
        try{
            const response = axios.post('http://localhost:5000/add',{task: task})
            console.log("Response from backend",response);
            location.reload();
        }
        catch(err){
            console.log(err,"Error in Create.jsx");
        }

    }
    return (
        <div className='create_form'>
            <input type="text" placeholder='Enter task' onChange={(e) => setTask(e.target.value)} className="create_input"/>
            <button type="submit" onClick={handleAdded} className="create_button">Add</button>
        </div>
    )
}

export default Create
