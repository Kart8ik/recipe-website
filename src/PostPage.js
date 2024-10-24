import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './PostPage.css'

const PostPage = () => {
  const url="http://localhost:3500/recipes"
  const { id } = useParams()
  const [recipe,setRecipe] = useState(null)
  const navigate = useNavigate()

  useEffect(()=>{
    const getRecipe=async()=> {
      try {
        const data = await fetch(`${url}/${id}`)
        const newrecipe = await data.json()
        setRecipe(newrecipe)
      } catch (err) {
        console.log(err)
      }
    }
    getRecipe()
  },[id])

  const navpost=(id)=>{
    navigate(`/update/${id}`)
  }

  if (recipe==null) return <h1>loading...</h1>
  return (
    <main>
      <h1>{recipe.name}</h1>
      <h3>{recipe.desc}</h3>
      <div className='listItemComp'>
              <h4>prep time: {recipe.cooking_time} minutes</h4>
              <h4>difficulty: {recipe.difficulty}</h4>
      </div>
      <h3>ingredients:</h3>
      <ul>
        {(recipe.ingredients).map(item => (
          <li>{item}</li>
        ))}
      </ul>
      <h3>steps:</h3>
      <p>{recipe.steps}</p>
      <button onClick={() =>navpost(recipe.id)}>update recipe</button>
    </main>
  )
}

export default PostPage
