const USER_API_URL = 'http://localhost/api/usuarios'
const FACTURAS_API_URL = 'http://localhost/api/facturas'
const CLIENTES_API_URL = 'http://localhost/api/clientes'
const USUARIOS_API_URL = 'http://localhost/api/usuarios'
const PRODUCTOS_API_URL = 'http://localhost/api/productos'

enum EstadoPago {
    pagado, pendiente, vencido
}

export default {
    USER_API_URL,
    FACTURAS_API_URL,
    CLIENTES_API_URL,
    PRODUCTOS_API_URL,
    USUARIOS_API_URL,
    EstadoPago
}