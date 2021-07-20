import React, {useState} from 'react'
import axios from 'axios'

/* title, description */

/* This is the browser, we are in react - the form is not coming from the server. This HTML is directly in the browser */
const initialFormState = {title: '', description: ''}

function AddProject(){
    const [formState, setFormState] = useState(initialFormState)
    
    function handleChange (event) {  
        const {name, value} = event.target;
        setFormState({...formState, [name]: value});
    }
    
        /*
          If you type "a" in the title input,
          name = title, value = "a"
          setFormState({
            ...forState,
            title: "a"
          })
          Copying a value and overriding every time there is a keystroke
        */

    function handleFormSubmit(event){
        event.preventDefault()
        const {title, description} = formState

        axios.post('http://localhost:5000/api/projects', {title, description}) /* axios needs the address of your server - the server is a seperate service 
        This will send to this address, whatever is in the {} object - the body for axios*/
        .then(setFormState(initialFormState))
        .catch(err => console.log(err)) // we can console.log because we are in the browser, in the front end
    }

    return(
    <div>
        <form onSubmit={handleFormSubmit}>
          <label>Title:</label>
          <input type="text" name="title" value={formState.title} onChange={ e => handleChange(e)}/>
          <label>Description:</label>
          <textarea name="description" value={formState.description} onChange={ e => handleChange(e)} />
          <input type="submit" value="Submit" />
        </form>
    </div>


    )

}



export default AddProject;