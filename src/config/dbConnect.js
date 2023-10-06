const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
    id: String,
    products: [{
        product: { type: Schema.Types.ObjectId, ref: 'Product' },
        quantity: Number
    }]
});

const Cart = mongoose.model('Cart', cartSchema);

const messageSchema = new Schema({
    sender: String,
    content: String,
    timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

const productSchema = new Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number
});

const Product = mongoose.model('Product', productSchema);

// Conecta con la base de datos
mongoose.connect('mongodb+srv://testrdz32:z0n3T7msJnV2nKLA@clusterbackend.unryogc.mongodb.net/ecommerce?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
    console.log('Conexión exitosa a la base de datos.');
});

module.exports = { Cart, Message, Product };