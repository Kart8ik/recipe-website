import React, { useState } from 'react'
import './NewPost.css'
import apiRequest from './apiRequest'
import { useNavigate } from 'react-router-dom'

const NewPost = () => {
  const url="http://localhost:3500/recipes"
  const [newRecipe,setNewRecipe]=useState({name:'',desc:'',ingredients:[],steps:'',cooking_time:0,difficulty:''})
  const navigate=useNavigate()

  const updateRecipe=(e)=>{
    switch (e.target.name) {
      case 'name':
        setNewRecipe({...newRecipe,name:e.target.value})  
        break;
      case 'desc':
        setNewRecipe({...newRecipe,desc:e.target.value})  
        break;
      case 'ingredients':
        const inglist=(e.target.value).split(',')
        setNewRecipe({...newRecipe,ingredients:inglist})  
        break;
      case 'steps':
        setNewRecipe({...newRecipe,steps:e.target.value})  
        break;
      case 'cooking_time':
        setNewRecipe({...newRecipe,cooking_time:e.target.value}) 
        break;
      case 'difficulty':
        setNewRecipe({...newRecipe,difficulty:e.target.value})  
        break;
    
      default:
        break;
    }
  }

  const submitform= async (e)=>{
    e.preventDefault()
    const addOptions={
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newRecipe)
    }

    const result = await apiRequest(url,addOptions)
    if (result) console.log("error:reload the page")
    if (!result) {
      setNewRecipe({name:'',desc:'',ingredients:[],steps:'',cooking_time:'',difficulty:''})
      navigate('/')
    }
  }

  return (
    <main>
      <h1>Enter a new Recipe</h1>
      <form className='recipeForm' onSubmit={submitform}>
        <label>name</label>
        <input name='name' type='text' value={newRecipe.name} onChange={e=>updateRecipe(e)} required/>
        <label>description</label>
        <input name='desc' type='text' value={newRecipe.desc} onChange={e=>updateRecipe(e)} required/>
        <label>ingredients</label>
        <input name='ingredients' type='text' value={newRecipe.ingredients} onChange={e=>updateRecipe(e)} required/>
        <label>steps</label>
        <textarea name='steps' className='steps' value={newRecipe.steps} onChange={e=>updateRecipe(e)} required/>
        <label>cooking time</label>
        <input name='cooking_time' type='number' value={newRecipe.cooking_time} onChange={e=>updateRecipe(e)} required/>
        <label>difficulty</label>
        <select value={newRecipe.difficulty} onChange={e=>updateRecipe(e)} name='difficulty' required>
          <option value='' disabled>select</option>
          <option>very easy</option>
          <option>easy</option>
          <option>medium</option>
          <option>hard</option>
          <option>very hard</option>
        </select>
        <button type='submit' className='submit'>submit</button>
      </form>
    </main>
  )
}

export default NewPost      