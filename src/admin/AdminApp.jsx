import { Admin, Resource } from 'react-admin';
import dataProvider from './dataProvider';
import { productsResource } from './resources/products';
import { categoriesResource } from './resources/categories';
import { blogsResource } from './resources/blogs';

// AdminApp sử dụng react-admin, map tới các endpoint REST của backend
// products -> /products, categories -> /categories, blogs -> /admin/blog (được map trong dataProvider)
const AdminApp = () => (
  <Admin dataProvider={dataProvider} basename="/admin/ra">
    <Resource name="products" {...productsResource} />
    <Resource name="categories" {...categoriesResource} />
    <Resource name="blogs" {...blogsResource} />
  </Admin>
);

export default AdminApp;
