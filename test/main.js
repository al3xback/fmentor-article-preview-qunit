import jsdom from 'jsdom';
import axios from 'axios';

const { JSDOM } = jsdom;
const { test } = QUnit;

const url = 'https://al3xback.github.io/fmentor-article-preview-qunit/';

const getData = () => {
	return axios
		.get(url)
		.then((res) => {
			const { document } = new JSDOM(res.data).window;
			return document;
		})
		.catch((err) => {
			throw new Error(err);
		});
};

QUnit.module('DOM', (hooks) => {
	hooks.beforeEach(async (assert) => {
		try {
			const document = await getData();
			global.document = document;
		} catch (err) {
			console.log(err);
		}
	});

	test("should have a card wrapper element with a class of 'card'", (assert) => {
		const cardEl = document.querySelector('.card');

		assert.ok(cardEl);
	});

	test("should have a card image wrapper element with a class of 'card__image'", (assert) => {
		const cardImgEl = document.querySelector('.card__image');

		assert.ok(cardImgEl);
	});

	test("should have a card content wrapper element with a class of 'card__content'", (assert) => {
		const cardContentEl = document.querySelector('.card__content');

		assert.ok(cardContentEl);
	});
});
