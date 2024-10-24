import React, { useState, useEffect } from 'react'
import './UpdatePost.css'
import apiRequest from './apiRequest'
import { useNavigate, useParams } from 'react-router-dom'

const UpdatePost = () => {
  const url="http://localhost:3500/recipes"
  const [newRecipe,setNewRecipe]=useState({name:'',desc:'',ingredients:[],steps:'',cooking_time:0,difficulty:''})
  const navigate=useNavigate()
  const { id } = useParams()

  useEffect(()=>{
    const getRecipe=async()=>{
      try{
        const result = await fetch(`${url}/${id}`)
        const recipe = await result.json()
        setNewRecipe(recipe)
      } catch(err) {
        console.log(err)
      }
    }
    getRecipe()
  },[id])


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
    const updateOptions={
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body: JSON.stringify(newRecipe)
    }
    const updurl= `${url}/${id}`
    const result = await apiRequest(updurl,updateOptions)
    if (result) console.log("error:reload the page")
    if (!result) {
      setNewRecipe({name:'',desc:'',ingredients:[],steps:'',cooking_time:'',difficulty:''})
      navigate('/')
    }
  }

  return (
    <main>
      <h1>Update the recipe</h1>
      <form className='recipeForm' onSubmit={submitform}>
        <label>name</label>
        <input name='name' type='text' value={newRecipe.name} onChange={e=>updateRecipe(e)} required placeholder={newRecipe.name}/>
        <label>description</label>
        <input name='desc' type='text' value={newRecipe.desc} onChange={e=>updateRecipe(e)} required placeholder={newRecipe.desc}/>
        <label>ingredients</label>
        <input name='ingredients' type='text' value={newRecipe.ingredients} onChange={e=>updateRecipe(e)} required placeholder={newRecipe.ingredients}/>
        <label>steps</label>
        <textarea name='steps' className='steps' value={newRecipe.steps} onChange={e=>updateRecipe(e)} required placeholder={newRecipe.steps}/>
        <label>cooking time</label>
        <input name='cooking_time' type='number' value={newRecipe.cooking_time} onChange={e=>updateRecipe(e)} required placeholder={newRecipe.cooking_time}/>
        <label>difficulty</label>
        <select value={newRecipe.difficulty} onChange={e=>updateRecipe(e)} name='difficulty' required placeholder={newRecipe.difficulty}>
          <option value='' disabled>select</option>
          <option>very easy</option>
          <option>easy</option>
          <option>medium</option>
          <option>hard</option>
          <option>very hard</option>
        </select>
        <button type='submit'>submit</button>
      </form>
    </main>
  )
}

export default UpdatePost      