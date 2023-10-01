const productos = [
    {
      title: "Producto 1",
      description: "Descripción del Producto 1",
      price: 19.99,
      code: "P001",
      stock: 100,
      category: "Electrónica",
      status: true,
      thumbnail: ["imagen1.jpg", "imagen2.jpg"]
    },
    {
      title: "Producto 2",
      description: "Descripción del Producto 2",
      price: 29.99,
      code: "P002",
      stock: 50,
      category: "Ropa",
      status: true,
      thumbnail: ["imagen3.jpg"]
    },
    {
      title: "Producto 3",
      description: "Descripción del Producto 3",
      price: 9.99,
      code: "P003",
      stock: 200,
      category: "Hogar",
      status: true,
      thumbnail: ["imagen4.jpg", "imagen5.jpg", "imagen6.jpg"]
    },
    {
      title: "Producto 4",
      description: "Descripción del Producto 4",
      price: 39.99,
      code: "P004",
      stock: 75,
      category: "Electrónica",
      status: true,
      thumbnail: ["imagen7.jpg"]
    },
    {
      title: "Producto 5",
      description: "Descripción del Producto 5",
      price: 14.99,
      code: "P005",
      stock: 150,
      category: "Ropa",
      status: true,
      thumbnail: ["imagen8.jpg", "imagen9.jpg"]
    },
    {
      title: "Producto 6",
      description: "Descripción del Producto 6",
      price: 49.99,
      code: "P006",
      stock: 90,
      category: "Hogar",
      status: true,
      thumbnail: ["imagen10.jpg"]
    },
    {
      title: "Producto 7",
      description: "Descripción del Producto 7",
      price: 29.99,
      code: "P007",
      stock: 120,
      category: "Electrónica",
      status: true,
      thumbnail: ["imagen11.jpg"]
    },
    {
      title: "Producto 8",
      description: "Descripción del Producto 8",
      price: 17.99,
      code: "P008",
      stock: 80,
      category: "Ropa",
      status: true,
      thumbnail: ["imagen12.jpg"]
    },
    {
      title: "Producto 9",
      description: "Descripción del Producto 9",
      price: 24.99,
      code: "P009",
      stock: 110,
      category: "Hogar",
      status: true,
      thumbnail: ["imagen13.jpg", "imagen14.jpg"]
    },
    {
      title: "Producto 10",
      description: "Descripción del Producto 10",
      price: 34.99,
      code: "P010",
      stock: 60,
      category: "Electrónica",
      status: true,
      thumbnail: ["imagen15.jpg"]
    },
    {
      title: "Producto 11",
      description: "Descripción del Producto 11",
      price: 22.99,
      code: "P011",
      stock: 95,
      category: "Ropa",
      status: true,
      thumbnail: ["imagen16.jpg"]
    },
    {
      title: "Producto 12",
      description: "Descripción del Producto 12",
      price: 14.99,
      code: "P012",
      stock: 130,
      category: "Hogar",
      status: true,
      thumbnail: ["imagen17.jpg"]
    },
    {
      title: "Producto 13",
      description: "Descripción del Producto 13",
      price: 39.99,
      code: "P013",
      stock: 70,
      category: "Electrónica",
      status: true,
      thumbnail: ["imagen18.jpg", "imagen19.jpg"]
    },
    {
      title: "Producto 14",
      description: "Descripción del Producto 14",
      price: 27.99,
      code: "P014",
      stock: 100,
      category: "Ropa",
      status: true,
      thumbnail: ["imagen20.jpg"]
    },
    {
      title: "Producto 15",
      description: "Descripción del Producto 15",
      price: 19.99,
      code: "P015",
      stock: 85,
      category: "Hogar",
      status: true,
      thumbnail: ["imagen21.jpg"]
    },
    {
      title: "Producto 16",
      description: "Descripción del Producto 16",
      price: 32.99,
      code: "P016",
      stock: 110,
      category: "Electrónica",
      status: true,
      thumbnail: ["imagen22.jpg"]
    },
    {
      title: "Producto 17",
      description: "Descripción del Producto 17",
      price: 16.99,
      code: "P017",
      stock: 75,
      category: "Ropa",
      status: true,
      thumbnail: ["imagen23.jpg"]
    },
    {
      title: "Producto 18",
      description: "Descripción del Producto 18",
      price: 9.99,
      code: "P018",
      stock: 160,
      category: "Hogar",
      status: true,
      thumbnail: ["imagen24.jpg"]
    },
    {
      title: "Producto 19",
      description: "Descripción del Producto 19",
      price: 44.99,
      code: "P019",
      stock: 55,
      category: "Electrónica",
      status: true,
      thumbnail: ["imagen25.jpg", "imagen26.jpg"]
    },
    {
      title: "Producto 20",
      description: "Descripción del Producto 20",
      price: 19.99,
      code: "P020",
      stock: 120,
      category: "Ropa",
      status: true,
      thumbnail: ["imagen27.jpg"]
    },
    {
      title: "Producto 21",
      description: "Descripción del Producto 21",
      price: 29.99,
      code: "P021",
      stock: 90,
      category: "Hogar",
      status: true,
      thumbnail: ["imagen28.jpg"]
    },
    {
      title: "Producto 22",
      description: "Descripción del Producto 22",
      price: 12.99,
      code: "P022",
      stock: 140,
      category: "Electrónica",
      status: true,
      thumbnail: ["imagen29.jpg"]
    },
    {
      title: "Producto 23",
      description: "Descripción del Producto 23",
      price: 23.99,
      code: "P023",
      stock: 70,
      category: "Ropa",
      status: true,
      thumbnail: ["imagen30.jpg"]
    },
    {
      title: "Producto 24",
      description: "Descripción del Producto 24",
      price: 11.99,
      code: "P024",
      stock: 180,
      category: "Hogar",
      status: true,
      thumbnail: ["imagen31.jpg", "imagen32.jpg"]
    },
    {
      title: "Producto 25",
      description: "Descripción del Producto 25",
      price: 34.99,
      code: "P025",
      stock: 65,
      category: "Electrónica",
      status: true,
      thumbnail: ["imagen33.jpg"]
    },
    {
      title: "Producto 26",
      description: "Descripción del Producto 26",
      price: 18.99,
      code: "P026",
      stock: 110,
      category: "Ropa",
      status: true,
      thumbnail: ["imagen34.jpg"]
    },
    {
      title: "Producto 27",
      description: "Descripción del Producto 27",
      price: 7.99,
      code: "P027",
      stock: 200,
      category: "Hogar",
      status: true,
      thumbnail: ["imagen35.jpg"]
    },
    {
      title: "Producto 28",
      description: "Descripción del Producto 28",
      price: 29.99,
      code: "P028",
      stock: 90,
      category: "Electrónica",
      status: true,
      thumbnail: ["imagen36.jpg"]
    },
    {
      title: "Producto 29",
      description: "Descripción del Producto 29",
      price: 16.99,
      code: "P029",
      stock: 130,
      category: "Ropa",
      status: true,
      thumbnail: ["imagen37.jpg"]
    },
    {
      title: "Producto 30",
      description: "Descripción del Producto 30",
      price: 21.99,
      code: "P030",
      stock: 75,
      category: "Hogar",
      status: true,
      thumbnail: ["imagen38.jpg"]
    }
  ];
  
  // Puedes agregar más objetos de producto según tus necesidades
  
  export default productos;