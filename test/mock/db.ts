import { factory, primaryKey, oneOf } from '@mswjs/data';
import { faker } from '@faker-js/faker';

export const db = factory({
	categories: {
		id: primaryKey(() => faker.string.uuid()),
		name: () => faker.commerce.product.name,
	},
	users: {
		id: primaryKey(() => faker.string.uuid()),
		firstName: () => faker.internet.userName(),
		lastName: () => faker.internet.userName(),
		email: () => faker.internet.email(),
		Active: () => faker.helpers.arrayElement(['Active', 'isActive']),
		role: () => faker.helpers.arrayElement(['ADMIN', 'BUYER', 'SELLER']),
	},
	roles: {
		id: primaryKey(() => faker.string.uuid()),
		roleName: () => faker.internet.userName(),
	},
	products: {
		id: primaryKey(() => faker.string.uuid()),
		name: () => faker.commerce.product.name,
		discount: () => faker.commerce.product.name,
		price: () => faker.commerce.product.name,
		category: () => faker.commerce.product.name,
		expiryDate: () => faker.commerce.product.name,
		status: () => faker.commerce.product.name,
		images: () => faker.helpers.arrayElement(['image1', 'image2', 'image3']),
	},
	reviews: {
		id: primaryKey(() => faker.string.uuid()),
		userId: () => faker.commerce.productName(),
		productId: () => faker.commerce.productName(),
		feedBack: () => faker.lorem.text(),
		ratings: () => faker.helpers.arrayElement([1, 2, 3, 4, 5]),
		user: oneOf('users'),
		product: oneOf('products'),
	},
});
