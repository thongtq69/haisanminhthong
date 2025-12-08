import {
  List,
  Datagrid,
  TextField,
  DateField,
  Edit,
  SimpleForm,
  TextInput,
  BooleanInput,
  Create,
  SelectInput,
} from 'react-admin';
import { RichTextInput } from 'ra-input-rich-text';

// Resource blogs -> /admin/blog endpoints (mapped via dataProvider)
const statusChoices = [
  { id: 'draft', name: 'Draft' },
  { id: 'published', name: 'Published' },
];

export const BlogsList = () => (
  <List resource="blogs">
    <Datagrid rowClick="edit">
      <TextField source="id" />
      <TextField source="title" />
      <TextField source="slug" />
      <TextField source="status" />
      <BooleanInput source="isFeatured" disabled />
      <DateField source="publishedAt" />
    </Datagrid>
  </List>
);

export const BlogsEdit = () => (
  <Edit resource="blogs">
    <SimpleForm>
      <TextInput source="title" isRequired fullWidth />
      <TextInput source="slug" fullWidth helperText="Để trống để tự sinh từ title" />
      <TextInput source="category" />
      <TextInput source="tags" fullWidth helperText="Danh sách tag, phân cách dấu phẩy" />
      <TextInput source="shortDescription" multiline fullWidth label="Mô tả ngắn" />
      <TextInput source="excerpt" multiline fullWidth label="Excerpt" />
      <TextInput source="coverImage" fullWidth label="Cover image URL" />
      <TextInput source="galleryImages" fullWidth helperText="Danh sách URL ảnh, phân cách dấu phẩy" />
      <RichTextInput source="content" label="Nội dung" />
      <BooleanInput source="isFeatured" label="Featured" />
      <SelectInput source="status" choices={statusChoices} />
      <TextInput source="seoTitle" fullWidth />
      <TextInput source="seoDescription" fullWidth multiline />
    </SimpleForm>
  </Edit>
);

export const BlogsCreate = () => (
  <Create resource="blogs">
    <SimpleForm>
      <TextInput source="title" isRequired fullWidth />
      <TextInput source="slug" fullWidth helperText="Để trống để tự sinh từ title" />
      <TextInput source="category" />
      <TextInput source="tags" fullWidth helperText="Danh sách tag, phân cách dấu phẩy" />
      <TextInput source="shortDescription" multiline fullWidth label="Mô tả ngắn" />
      <TextInput source="excerpt" multiline fullWidth label="Excerpt" />
      <TextInput source="coverImage" fullWidth label="Cover image URL" />
      <TextInput source="galleryImages" fullWidth helperText="Danh sách URL ảnh, phân cách dấu phẩy" />
      <RichTextInput source="content" label="Nội dung" />
      <BooleanInput source="isFeatured" label="Featured" />
      <SelectInput source="status" choices={statusChoices} />
      <TextInput source="seoTitle" fullWidth />
      <TextInput source="seoDescription" fullWidth multiline />
    </SimpleForm>
  </Create>
);

export const blogsResource = {
  list: BlogsList,
  edit: BlogsEdit,
  create: BlogsCreate,
};
