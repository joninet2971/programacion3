import { Fragment, useState, useEffect } from 'react'
import './App.css'

function App() {

  
  const [listaProducto, setListaProducto] = useState([
    { id: 1, nombre: "Monitor", precio: 250, stock: 10 },
    { id: 2, nombre: "Teclado", precio: 50, stock: 25 },
    { id: 3, nombre: "Mouse", precio: 30, stock: 40 }
  ]
  )

  const [inputNombreProducto, setInputNombreProducto] = useState('')
  const [inputPrecioProducto, setInputPrecioProducto] = useState('')
  const [inputStockProducto, setInputStockProducto] = useState('')

  useEffect(() => {
    const productosGuardados = localStorage.getItem('productos')
    if (productosGuardados) {
      setListaProducto(JSON.parse(productosGuardados))
    }
  }, []);

  const guardarEnLocalStorage = (productos) => {
    localStorage.setItem('productos', JSON.stringify(productos))
  }


  const addProducto = () => {
    if (inputNombreProducto !== '') {
      const nuevoProducto = {
        id: Date.now(),
        nombre: inputNombreProducto,
        precio: inputPrecioProducto,
        stock: inputStockProducto
      }
      const nuevaLista = [...listaProducto, nuevoProducto]

      setListaProducto([...listaProducto, nuevoProducto])

      guardarEnLocalStorage(nuevaLista)

      setInputNombreProducto('')
      setInputPrecioProducto('')
      setInputStockProducto('')
    }
  }
  


  const removeProducto = (id) => {
    const nuevaLista = listaProducto.filter(producto => producto.id !== id)

    setListaProducto(nuevaLista)
    guardarEnLocalStorage(nuevaLista)
  }

  const [editId, setEditId] = useState(null)

  const cargarDatosProducto = (producto) => {
    setInputNombreProducto(producto.nombre)
    setInputPrecioProducto(producto.precio)
    setInputStockProducto(producto.stock)
    setEditId(producto.id) 
  }

  const editProducto = () => {
    if (editId) {
      const listaEditada = listaProducto.map(producto => {
        if(producto.id === editId) {
          return {
            ...producto,
            nombre: inputNombreProducto,
            precio: inputPrecioProducto,
            stock: inputStockProducto
          }
        }
        return producto
      })
      
      setListaProducto(listaEditada)

      guardarEnLocalStorage(listaEditada)
      
      setInputNombreProducto('')
      setInputPrecioProducto('')
      setInputStockProducto('')
      setEditId(null)
    }
  }

  return (
    <Fragment>
      <div className="container">
        {/* Formulario */}
        <div className="form-container">
          <h2>Agregar Productos</h2>
          <div className="form-group">
            <label>Nombre:</label>
            <input 
              type="text"
              value={inputNombreProducto}
              onChange={(e) => setInputNombreProducto(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Precio:</label>
            <input 
              type="number"
              value={inputPrecioProducto}
              onChange={(e) => setInputPrecioProducto(e.target.value)}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Stock:</label>
            <input 
              type="number"
              value={inputStockProducto}
              onChange={(e) => setInputStockProducto(e.target.value)}
              className="form-input"
            />
          </div>
          <button 
            onClick={() => editId ? editProducto() : addProducto()}
            className={`btn ${editId ? 'btn-edit' : 'btn-add'}`}
          >
            {editId ? 'Actualizar Producto' : 'Agregar Nuevo Producto'}
          </button>
        </div>

        {/* Tabla de Productos */}
        <div>
          <h2>Listado de Productos</h2>
          <table className="table">
            <thead>
              <tr>
                <th className="table-header">Nombre</th>
                <th className="table-header">Precio</th>
                <th className="table-header">Stock</th>
                <th className="table-header">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {listaProducto.map((producto) => (
                <tr key={producto.id}>
                  <td className="table-cell">{producto.nombre}</td>
                  <td className="table-cell">${producto.precio}</td>
                  <td className="table-cell">{producto.stock}</td>
                  <td className="table-cell">
                    <button 
                      onClick={() => removeProducto(producto.id)}
                      className="btn btn-delete"
                    >
                      Eliminar
                    </button>
                    <button 
                      onClick={() => cargarDatosProducto(producto)}
                      className="btn btn-edit"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Fragment>
  )
}

export default App