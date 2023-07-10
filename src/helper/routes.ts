type api_routes = {
    login: string,
    register: string,
    forgot_password: string,
    products: string,
}
export const api_routes: api_routes = {
    login: '/api/v1/auth/login',
    register: '/api/v1/auth/register',
    forgot_password: '/api/v1/auth/forgot-password',
    products: '/api/v1/product/main/paginate',
}