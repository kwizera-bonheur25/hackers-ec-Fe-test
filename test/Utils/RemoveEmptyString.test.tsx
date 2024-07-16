import filterEmptyStrings from '../../src/utils/RemoveEmptyString';

describe('filterEmptyStrings function', () => {
	it('filters out empty strings correctly', () => {
		const testData = {
			name: 'John Doe',
			email: '',
			phone: '+250789438437',
			age: 30,
			address: '',
		};

		const expectedResult = {
			name: 'John Doe',
			phone: '+250789438437',
			age: 30,
		};

		expect(filterEmptyStrings(testData)).toStrictEqual(expectedResult);
	});

	it('handles values matching conditions correctly', () => {
		const testData = {
			name: '',
			email: ' ',
			phone: '+250789438437',
			age: 0,
			address: '123 Main St',
		};

		const expectedResult = {
			phone: '+250789438437',
			address: '123 Main St',
			age: 0,
		};

		expect(filterEmptyStrings(testData)).toStrictEqual(expectedResult);
	});

	it('handles objects with various data types', () => {
		const testData = {
			name: '',
			email: 'test@example.com',
			phone: '+250789438437',
			age: 0,
			active: false,
		};

		const expectedResult = {
			email: 'test@example.com',
			phone: '+250789438437',
			age: 0,
			active: false,
		};

		expect(filterEmptyStrings(testData)).toStrictEqual(expectedResult);
	});

	it('returns an empty object if all properties are filtered out', () => {
		const testData = {
			name: '',
			email: '',
			phone: '',
		};

		const expectedResult = {};

		expect(filterEmptyStrings(testData)).toStrictEqual(expectedResult);
	});
});
