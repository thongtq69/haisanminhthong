import simpleRestProvider from 'ra-data-simple-rest';
import { API_BASE_URL } from '../config/api';

// Base REST provider
const baseProvider = simpleRestProvider(API_BASE_URL);

// Map blogs resource to /admin/blog endpoints
const mapResource = (resource) => {
  if (resource === 'blogs') return 'admin/blog';
  return resource;
};

const wrappedProvider = {
  getList: (resource, params) => baseProvider.getList(mapResource(resource), params),
  getOne: (resource, params) => baseProvider.getOne(mapResource(resource), params),
  getMany: (resource, params) => baseProvider.getMany(mapResource(resource), params),
  getManyReference: (resource, params) => baseProvider.getManyReference(mapResource(resource), params),
  update: (resource, params) => baseProvider.update(mapResource(resource), params),
  updateMany: (resource, params) => baseProvider.updateMany(mapResource(resource), params),
  create: (resource, params) => baseProvider.create(mapResource(resource), params),
  delete: (resource, params) => baseProvider.delete(mapResource(resource), params),
  deleteMany: (resource, params) => baseProvider.deleteMany(mapResource(resource), params),
};

export default wrappedProvider;
