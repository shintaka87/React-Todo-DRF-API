import React, {useState, useEffect} from 'react';
import axios from 'axios';

const DrfApiFetch = () => {

    const [tasks, setTasks] = useState([]);
    const [selectedTask, setSelectedTask] = useState([]);
    const [editedTask, setEditedTask] = useState({id: '', title: ''});
    const [id, setId] = useState(1);

    useEffect(() =>{
        axios.get('http://127.0.0.1:8000/api/tasks/', {
            headers: {
                'Authorization': 'Token 6d50776f76379501dacb900abfe956ff1d67e924'
            }
        })
        .then(res => {setTasks(res.data);
        });
    },[]);

   
    const deleteTask = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/tasks/${id}/`, {
            headers: {
                'Authorization': 'Token 6d50776f76379501dacb900abfe956ff1d67e924'
            }})
            .then(res => {setTasks(tasks.filter(task => task.id !== id));
            setSelectedTask([]);
            if (editedTask.id === id) {
                setEditedTask({ id: "", title: "" });
              }
        });
    };

    const newTask = (task) => {
        const data = {
            title: task.title,
        };
        axios.post(`http://127.0.0.1:8000/api/tasks/`, data,{
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Token 6d50776f76379501dacb900abfe956ff1d67e924'
            }})
            .then(res => {setTasks([...tasks, res.data]); 
            setEditedTask({id:'', title:''});
        });
    };

    const editTask = (task) => {
        
        axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, task,{
            headers: {
                'Content-Type':'application/json',
                'Authorization': 'Token 6d50776f76379501dacb900abfe956ff1d67e924'
            }})
            .then(res => {setTasks(tasks.map(task=> (task.id === editedTask.id ? res.data: task)));
                setEditedTask({id:'', title:''});
            });
    };

    const handleInputChange = (evt) => {
        const value = evt.target.value
        const name = evt.target.name
        setEditedTask({...editedTask, [name]:value});
    };

  return (
    <div>
        <ul>
            {
                tasks.map(task => (<li key={task.id}> {task.title} 
                <button onClick={() => deleteTask(task.id)}>
                <i className='fas fa-trash-alt'></i></button>
                <button onClick={() => setEditedTask(task)}>
                <i className='fas fa-pen'></i></button>
                </li>))
                
            }
        </ul>

       
        <h3>{selectedTask.title}{selectedTask.id}</h3>
        
        <input type="text" name="title" value={editedTask.title} onChange={(evt) => handleInputChange(evt)} placeholder="??????????????????" required></input>
        {editedTask.id ?(
        <button onClick={() => editTask(editedTask)}>Update</button>) :
        (<button onClick={() => newTask(editedTask)}>Create</button>)}
    </div>
  )
}

export default DrfApiFetch