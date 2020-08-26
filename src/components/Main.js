import React, {useState} from 'react'

const Main = ({createProduct}) => {

    const [ formData , setFormData] = useState({
        productName:'',
        productPrice:'',
    })

    const handleChange=(e)=>{
        setFormData({...formData , [e.target.name]:e.target.value})
        console.log(formData)
    }
    const handleSubmit =(e)=>{
        e.preventDefault();
        const name = formData.productName
        const price = window.web3.utils.toWei(formData.productPrice, 'Ether')
        createProduct(name, price)
        console.log(name , price);
    }

    return (
<div id="content">
        <h1>Add Product</h1>
        <form onSubmit={ (e)=> handleSubmit(e)}  >
          <div className="form-group mr-sm-2">
            <input
              name="productName"
              type="text"
              onChange={(e)=>{handleChange(e)}}
              className="form-control"
              placeholder="Product Name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              name="productPrice"
              type="text"
              onChange={(e)=>{handleChange(e)}}
              className="form-control"
              placeholder="Product Price"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Product</button>
        </form>
        </div>
    )
}

export default Main
