function ProductList() {
    const [products, setProducts] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    const [productModal, setProductModal] = React.useState(false)


    React.useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=12')
            .then(response => response.json())
            .then(products => setProducts(products))
            .finally(() => setLoading(false))
    }, [])

    function truncateWords(text, limit = 90) {
        if (text.length <= limit) return text

        const words = text.split(/\s+/)
        let result = ""

        for (let word of words) {
            if ((result + word).length > limit) break
            result += (result ? " " : "") + word
        }

        return result + "..."
    }

    return (
        <div className="wrapper">
            <header className="header">Product List</header>
            {loading ? (
                <div className="loader-box">
                    <span className="loader"></span>
                </div>
            ) : (
                <ul className="product-list">
                    {products.map(product => (
                        <li key={product.id} className="product-item">
                            <title className="product-header">
                                #{product.id}&nbsp;
                                {product.title}
                            </title>
                            <div className="product-body">
                                {truncateWords(product.body)}
                            </div>
                            <button className="product-btn" onClick={() => setProductModal(product)}>
                                See more
                            </button>
                        </li>
                    ))}
                    {productModal && (
                        <div className="modal-overlay" onClick={() => setProductModal(false)}>
                            <div className="modal-body">
                                <p className="modal__product-title">#{productModal.id} {productModal.title}</p>
                                <p className="modal__product-body">{productModal.body}</p>
                                <button className="modal-close" onClick={() => setProductModal(false)}>Close</button>
                            </div>
                        </div>
                    )}
                </ul>
            )}
        </div>
    )
}

const app = <>
    <ProductList />
</>
ReactDOM.createRoot(document.getElementById('root')).render(app)