const socket = io();

const table = document.getElementById('table');

document.getElementById('btnAddProduct').addEventListener('click', () => {
  const prod = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    price: document.getElementById('price').value,
    code: document.getElementById('code').value,
    stock: document.getElementById('stock').value,
    category: document.getElementById('category').value,
    status: true,
  };
  socket.emit('message', prod);
  fetch('/products', {
    method: 'post',
    body: JSON.stringify(prod),
    headers: {
      'Content-type': 'application/json',
    },
  })
    .then((result) => result.json())
    .then((result) => {
      if (result.status === 'error') throw new Error(result.error);
    })
    .then(() => fetch('/products'))
    .then((result) => result.json())
    .then((result) => {
      if (result.status === 'error') throw new Error(result.error);
      socket.emit('productList', result.payload);
      document.getElementById('title').value = '';
      document.getElementById('description').value = '';
      document.getElementById('price').value = '';
      document.getElementById('code: ').value = '';
      document.getElementById('stock').value = '';
      document.getElementById('category').value = '';
    })
    .catch((err) => console.log(err));
});

deleteProduct = (id) => {
  fetch(`/products/${id}`, {
    method: 'delete',
  })
    /* .then((result) => {
      socket.emit('message', result);
    }) */
    .then((result) => result.json())
    .then((result) => {
      //if (result.status === 'error') throw new Error(result.error);
      socket.emit('message', result);
      socket.emit('productList', result.payload);
      alert('producto eliminado correctamente');
    })
    .catch((err) => alert(err));
};

socket.on('updatedProducts', (data) => {
  table.innerHTML = `<tr>
            <td></td>
            <td>Producto</td>
            <td>Descripcion</td>
            <td>Precio</td>
            <td>Codigo</td>
            <td>Stock</td>
            <td>Categoria</td>
        </tr>`;
  socket.emit('message', 'entro a updatear');
  for (product of data) {
    let tr = document.createElement('tr');
    tr.innerHTML = `
            <td><button onclick="deleteProduct(${product.id})">Eliminar</button></td>
            <td>${product.title}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td>${product.code}</td>
            <td>${product.stock}</td>
            <td>${product.category}</td>
            `;
    table.getElementsByTagName('tbody')[0].appendChild(tr);
  }
});
