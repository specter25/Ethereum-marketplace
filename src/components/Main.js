import React, {useState} from 'react'

const Main = ({createProduct , products , purchaseProduct , address}) => {

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
        <p>&nbsp;</p>
        <h2>Buy Product</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { products.map((product, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                  <td>{product.owner}</td>
                  <td>
                    { !product.purchased && product.owner.toString() !== address.toString()
                      ? <button
                          name={product.id}
                          value={product.price}
                          onClick={(event) => {
                            purchaseProduct(event.target.name, event.target.value)
                          }}
                        >
                          Buy
                        </button>
                      : null
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </div>
    )
}

export default Main
