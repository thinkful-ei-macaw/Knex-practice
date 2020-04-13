require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})


console.log('knex and driver installed correctly');

knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .where({ name: 'Point of view gun' })
    .then(result => {
        console.log(result)
    })
    .catch(err => console.log(err))
//const amazong_products = knexInstance.table('amazong_products');
//const product = amazong_products.where({ name: 'Point of view gun' }).fetched()

//console.log(product)

function searchByProduceName(searchTerm) {
    knexInstance
        .select('product_id', 'name', 'price', 'category')
        .from('amazong_products')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}

searchByProduceName('holo')

function paginateProducts(page) {
    const productsPerPage = 10
    const offset = productsPerPage * (page - 1)
    knexInstance
        .select('product_id', 'name', 'price', 'category')
        .from('amazong_products')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

paginateProducts(2)

function getProductsWithImages() {
    knexInstance
        .select('product_id', 'name', 'price', 'category', 'image')
        .from('amazong_products')
        .whereNotNull('image')
        .then(result => {
            console.log(result)
        })
}

getProductsWithImages()