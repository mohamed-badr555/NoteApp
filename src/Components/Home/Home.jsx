import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

// or via CommonJS
export default function Home() {
  
        let token =localStorage.getItem('token');
        let baseUrl = "https://sticky-note-fe.vercel.app/";
        let decoded=   jwtDecode(token)

        let userID= decoded._id

   const [notes, setNotes] = useState([])
         async  function  getAllNotes(){
            let {data} = await axios.get(baseUrl+ "getUserNotes",{
                headers:{
                    token,userID
                }
            })
            if(data.message == "success"){
                setNotes(data.Notes)
                Swal.fire({
                    title: "Updated!",
                    text: "Your note has been updated.",
                    icon: "success"
                  });
            }else{
                setNotes([])
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                    footer: '<a href="#">Why do I have this issue?</a>'
                  });
            }
           }

useEffect(() => {
 getAllNotes()
 

}, [])

const [note, setnote] = useState({title:"",desc:"",userID,token})

 function getNote({target}){
    setnote({...note,[target.name]:target.value})
 } 
async function addNote(e){
    e.preventDefault();
    let {data} = await axios.post(baseUrl+"addNote",note)
    if(data.message == "success"){
        getAllNotes()
    }
}
async function deleteNote(NoteID){
 await axios.delete(baseUrl+"deleteNote",{
    data:{
        NoteID,
        token
    }
})
getAllNotes()
}



  function getNoteId(NoteIndex){
     document.querySelector("#exampleModal1 input").value =notes[NoteIndex].title;
     document.querySelector("#exampleModal1 textarea").value =notes[NoteIndex].desc;
     setnote({...note,'title':notes[NoteIndex].title,'desc':notes[NoteIndex].desc,NoteID:notes[NoteIndex]._id})
  }
 async function  updateNote(e){
e.preventDefault()
    let {data} =await axios.put(baseUrl+"updateNote",note);
    if (data.message == "updated") {
        getAllNotes()
    }else{
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
    }
 }

  return (
    <div>

<div className="container my-5">
                <div className="col-md-12 text-end">
                    <Link  className="add p-2 btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fas fa-plus-circle"></i> Add
                        New</Link>
                </div>
            </div>

                        {/* <!-- Add Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form onSubmit={addNote} id="add-form" >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input onChange={getNote} placeholder="Type Title" name="title" className="form-control" type="text" />
                                <textarea onChange={getNote}  className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button data-bs-dismiss="modal" type="submit" className="btn btn-info"><i className="fas fa-plus-circle"></i> Add Note</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>


            
            {/* <!-- Edit Modal --> */}
            <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form onSubmit={updateNote} id="edit-form">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input onChange={getNote} placeholder="Type Title" name="title" className="form-control" type="text" />
                                <textarea onChange={getNote} className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" data-dismiss="modal">Close</button>
                                <button data-bs-dismiss="modal" type="submit" className="btn btn-info">Update Note</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>





            <div className="container">
                <div className="row">

          
                   {notes.map((note,idx)=> {
                    return    <div key={idx}  className="col-md-4 my-4">
                    <div className="note p-4">
                        <h3 className="float-start">{note.title}</h3>
                        <Link  onClick={()=> {getNoteId(idx)}} data-bs-toggle="modal" data-bs-target="#exampleModal1" ><i className="fas fa-edit float-end edit"></i></Link>
                        <Link onClick={()=> {deleteNote(note._id)}}> <i className="fas fa-trash-alt float-end px-3 del"></i></Link>
                        <span className="clearfix"></span>
                        <p>{note.desc}</p>
                    </div>
                </div>
                   })}
                  


                </div>




                <div className="row">
                    <h2 className='text-white text-center '>No notes found</h2>
                </div>

</div>


    </div>
  )
}
