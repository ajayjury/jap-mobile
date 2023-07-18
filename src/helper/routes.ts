type api_routes = {
    login: string,
    register: string,
    forgot_password: string,
    products: string,
    product: string,
    categories: string,
    category: string,
    pincode: string,
    profile: string,
}
export const api_routes: api_routes = {
    login: '/api/v1/auth/login',
    register: '/api/v1/auth/register',
    forgot_password: '/api/v1/auth/forgot-password',
    products: '/api/v1/product/main/paginate',
    product: '/api/v1/product/main/detail',
    categories: '/api/v1/category/main/paginate',
    category: '/api/v1/category/main/detail',
    pincode: '/api/v1/product/main/pincode',
    profile: '/api/v1/profile',
}