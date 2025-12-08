import {
  List,
  Datagrid,
  TextField,
  NumberField,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  Create,
} from 'react-admin';

// Resource products -> /products endpoints
export const ProductsList = () => (
  <List resource="products">
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="slug" />
      <TextField source="category" />
      <NumberField source="price" />
      <TextField source="status" />
    </Datagrid>
  </List>
);

export const ProductsEdit = () => (
  <Edit resource="products">
    <SimpleForm>
      <TextInput source="name" isRequired />
      <TextInput source="slug" />
      <TextInput source="category" />
      <TextInput source="type" />
      <TextInput source="origin" />
      <NumberInput source="price" />
      <NumberInput source="originalPrice" />
      <TextInput source="status" />
      <TextInput source="shortDescription" multiline fullWidth />
      <TextInput source="description" multiline fullWidth />
      <TextInput source="images" fullWidth helperText="Danh sách URL ảnh, phân cách bằng dấu phẩy" />
    </SimpleForm>
  </Edit>
);

export const ProductsCreate = () => (
  <Create resource="products">
    <SimpleForm>
      <TextInput source="name" isRequired />
      <TextInput source="slug" />
      <TextInput source="category" />
      <TextInput source="type" />
      <TextInput source="origin" />
      <NumberInput source="price" />
      <NumberInput source="originalPrice" />
      <TextInput source="status" />
      <TextInput source="shortDescription" multiline fullWidth />
      <TextInput source="description" multiline fullWidth />
      <TextInput source="images" fullWidth helperText="Danh sách URL ảnh, phân cách bằng dấu phẩy" />
    </SimpleForm>
  </Create>
);

export const productsResource = {
  list: ProductsList,
  edit: ProductsEdit,
  create: ProductsCreate,
};
