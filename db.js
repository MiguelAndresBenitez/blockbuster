const mongoose = require('mongoose')

//conexion a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/blockbuster', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Conexión exitosa a la base de datos');
})
.catch((error) => {
    console.error('Error al conectar a la base de datos:', error);
});