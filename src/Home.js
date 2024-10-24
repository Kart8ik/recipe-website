import React, { useEffect, useState } from 'react'
import './Home.css'
import apiRequest from './apiRequest'
import {useNavigate} from 'react-router-dom'

const Home = () => {
  const url="http://localhost:3500/recipes"
  const [recipes,setRecipes]=useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    const getRecipes= async ()=>{
      try{const result = await fetch(url)
      const data = await result.json()
      setRecipes(data)
      console.log(data)
      } catch(err){
        console.log("error in loading api data")
      }
    }

    getRecipes()
  },[])

  const deleteRecipe= async (e)=>{
    const id = e.target.value
    const newRecipes=recipes.filter(recipe => recipe.id!==id)
    setRecipes(newRecipes)

    const deleteOptions = {method:'DELETE'}

    const delUrl = `${url}/${id}`
    const result = await apiRequest(delUrl,deleteOptions)
    if (result) console.log('error in deleting item')
  }

  const enterRecipe=(e)=>{
    const id=e.target.value
    navigate(`/${id}`)
  }

  return (
    <main>
      <ul className='recipeList'>
        {recipes.map(recipe =>(
          <li key={recipe.id}>
            <button className='namebtn' value={recipe.id} onClick={e => enterRecipe(e)}>{recipe.name}</button>
            <p>{recipe.desc}</p>
            <div className='listItemComp'>
              <h4>{recipe.cooking_time} minutes</h4>
              <h4>{recipe.difficulty}</h4>
              <button value={recipe.id} onClick={e=>deleteRecipe(e)} >delete</button>
            </div>
            <hr />
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Home
