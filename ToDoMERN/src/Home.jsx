import React, { useState, useEffect } from 'react'
import Create from './Create';
import axios from 'axios';
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs';

const Home = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        try {
            axios.get('http://localhost:5000/get')
                .then((result) => setData(result.data))
                .catch(err => console.log(err));
        }
        catch (err) {
            console.log(err, 'Error in Home.jsx');
        }
    }, [])

    const handleEdit = (id) => {
        try{
            axios.put('http://localhost:5000/update/'+id)
            .then((result) =>{
                location.reload();
            })
            .catch(err => console.log(err))
        }
        catch(err){
            console.log(err,"Something fishy in handleEdit");
        }
    }

    const handleDelete = (id) => {
        try{
            axios.delete('http://localhost:5000/delete/'+id)
            .then((result) =>{
                location.reload();
            })
            .catch(err => console.log(err))
        }
        catch(err){
            console.log(err,"Something fishy in handleEdit");
        }
    }

    return (
        <div className='homed'>
            <h2 className='text-3xl'>TO DO LIST</h2>
            <Create />
            {
                data.length === 0
                    ?
                    <div>
                        <h2 className='text-3xl'>No Data</h2>
                    </div>
                    :
                    data.map((item) => {
                        return (
                            <div className='tasked'>
                                <div className="checkboxed" onClick={() => handleEdit(item._id)}>
                                    {item.done ? 
                                    <BsFillCheckCircleFill className="isoned" />
                                    :
                                    <BsCircleFill className="iconed" />
                                    }
                                    <p className={item.done ? "line-through" : ""}>{item.task}</p>
                                    {/* <p>{item.task}</p> */}
                                </div>
                                <div>
                                    <span><BsFillTrashFill className="iconed"  onClick={() => handleDelete(item._id)}/></span>
                                </div>
                            </div>
                        )
                    })
            }
        </div>
    )
}

export default Home
