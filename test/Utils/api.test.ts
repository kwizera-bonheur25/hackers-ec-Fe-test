import { AxiosError } from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import API from '../../src/utils/api';

describe('API Interceptors', () => {
	let mock: MockAdapter;

	beforeEach(() => {
		mock = new MockAdapter(API);
		localStorage.clear();
	});

	afterEach(() => {
		mock.restore();
	});

	it('should add Authorization header to requests', async () => {
		const token = 'token';
		localStorage.setItem('access_token', token);

		mock.onGet('/v1/api').reply(200, {});

		await API.get('/v1/api');

		const headers = mock.history.get[0]?.headers;
		expect(headers?.Authorization).toBe(`Bearer ${token}`);
	});

	it('should handle 401 error by clearing localStorage', async () => {
		localStorage.setItem('access_token', 'token');
		mock.onGet('/v1/api').reply(401);

		try {
			await API.get('/v1/api');
		} catch (error) {
			expect((error as AxiosError).response?.status).toBe(401);
		}

		expect(localStorage.getItem('access_token')).toBeNull();
	});

	it('should return the response for successful requests', async () => {
		const data = { message: 'success' };
		mock.onGet('/v1/api').reply(200, data);

		const response = await API.get('/v1/api');

		expect(response.data).toEqual(data);
	});

	it('should handle other errors and reject the promise', async () => {
		mock.onGet('/v1/api').reply(500);

		try {
			await API.get('/v1/api');
		} catch (error) {
			expect((error as AxiosError).response?.status).toBe(500);
		}
	});
});
