import styled from 'styled-components'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { useFormik } from "formik"
import * as yup from "yup"
import toast from 'react-hot-toast'


function ProductionFormEdit() {
  const navigate = useNavigate()
  const { updateProduction, production_edit } = useOutletContext()

  const formSchema = yup.object().shape({
    title: yup.string().required("Must enter a title"),
    budget: yup.number().positive()
  })

 
        const formik = useFormik({
          initialValues: {
            title: production_edit.title,
            genre: production_edit.genre,
            budget: production_edit.budget,
            image: production_edit.image,
            director:  production_edit.director,
            description: production_edit.description,
          },
          validationSchema: formSchema,
          onSubmit: (formData) => {
            fetch(`/productions/${production_edit.id}`, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(formData),
            })
            .then(resp => {
              if (resp.ok) {
                return resp.json().then(patchedProduction => {
                  updateProduction(patchedProduction)
                  navigate(`/productions/${patchedProduction.id}`)
                  return patchedProduction
                })
              }
              return resp.json().then(errorObj => {
                toast.error(errorObj.message)
              })
            })
            .catch(error => {
              toast.error(error.message)
            })
          },
        })

    return (
      <div className='App'>
      {formik.errors&& Object.values(formik.errors).map(error => <h2>{error}</h2>)}
      <Form onSubmit={formik.handleSubmit}>
        <label>Title </label>
        <input type='text' name='title' value={formik.values.title} onChange={formik.handleChange}  />
        
        <label> Genre</label>
        <input type='text' name='genre' value={formik.values.genre} onChange={formik.handleChange}  />
      
        <label>Budget</label>
        <input type='number' name='budget' value={formik.values.budget} onChange={formik.handleChange} />
      
        <label>Image</label>
        <input type='text' name='image' value={formik.values.image} onChange={formik.handleChange}  />
      
        <label>Director</label>
        <input type='text' name='director' value={formik.values.director} onChange={formik.handleChange}  />
      
        <label>Description</label>
        <textarea type='text' rows='4' cols='50' name='description'  value={formik.values.description} onChange={formik.handleChange} />
      
        <input type='submit' />
      </Form> 
      </div>
    )
  }
  
  export default ProductionFormEdit

  const Form = styled.form`
    display:flex;
    flex-direction:column;
    width: 400px;
    margin:auto;
    font-family:Arial;
    font-size:30px;
    input[type=submit]{
      background-color:#42ddf5;
      color: white;
      height:40px;
      font-family:Arial;
      font-size:30px;
      margin-top:10px;
      margin-bottom:10px;
    }
  `