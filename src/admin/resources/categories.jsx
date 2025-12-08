import {
  List,
  Datagrid,
  TextField,
  Edit,
  SimpleForm,
  TextInput,
  NumberInput,
  Create,
} from 'react-admin';

// Resource categories -> /categories endpoints
export const CategoriesList = () => (
  <List resource="categories">
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="name" />
      <TextField source="slug" />
      <TextField source="type" />
    </Datagrid>
  </List>
);

export const CategoriesEdit = () => (
  <Edit resource="categories">
    <SimpleForm>
      <TextInput source="name" isRequired />
      <TextInput source="slug" />
      <TextInput source="description" multiline fullWidth />
      <NumberInput source="sortOrder" />
      <TextInput source="type" />
    </SimpleForm>
  </Edit>
);

export const CategoriesCreate = () => (
  <Create resource="categories">
    <SimpleForm>
      <TextInput source="name" isRequired />
      <TextInput source="slug" />
      <TextInput source="description" multiline fullWidth />
      <NumberInput source="sortOrder" />
      <TextInput source="type" />
    </SimpleForm>
  </Create>
);

export const categoriesResource = {
  list: CategoriesList,
  edit: CategoriesEdit,
  create: CategoriesCreate,
};
