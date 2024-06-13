
// env 0 is development url, 1 is production url
const env = 0;

const baseURLs = [
    "http://localhost:8000/api",
    "https://api.winykhin.com/api"
]

const imageURLs = [
    "http://localhost:8000",
    "https://api.winykhin.com"
];

export const baseURL = baseURLs[env];
export const imageURL = imageURLs[env];

export const endpoints = {
    image: `${imageURL}/storage/images`,
    product: "/product",
    productMen: '/product/man',
    productWomen: '/product/woman',
    productDetail: '/product-detail',
    exchange: "/exchange",
    item: "/item",
    contact: "/contact"
}