import { TIngredient } from '@utils-types';

export const bunFirstMock: TIngredient = {
  _id: '1',
  name: 'Булка 1',
  type: 'bun',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/bun-01.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
};
export const bunSecondMock: TIngredient = {
  _id: '2',
  name: 'Булка 2',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
};

export const mainFirstMock: TIngredient = {
  _id: '3',
  name: 'Начинка 1',
  type: 'main',
  proteins: 44,
  fat: 26,
  carbohydrates: 85,
  calories: 643,
  price: 988,
  image: 'https://code.s3.yandex.net/react/code/meat-03.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png'
};
export const mainSecondMock: TIngredient = {
  _id: '4',
  name: 'Начинка 2',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png'
};

export const sauceFirstMock: TIngredient = {
  _id: '5',
  name: 'Соус 1',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
};
export const sauceSecondMock: TIngredient = {
  _id: '6',
  name: 'Соус 2',
  type: 'sauce',
  proteins: 50,
  fat: 22,
  carbohydrates: 11,
  calories: 14,
  price: 80,
  image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png'
};

export const mockIngredients: TIngredient[] = [
  bunFirstMock,
  bunSecondMock,
  mainFirstMock,
  mainSecondMock,
  sauceFirstMock,
  sauceSecondMock
];

export const mockFeed = {
  success: true,
  orders: [
    {
      _id: '669e64dd9ed280001b475567',
      ingredients: ['61c0c5a71d1f82001bdaaa6d'],
      status: 'done',
      name: 'Флюоресцентный бургер',
      createdAt: '2024-07-22T13:55:41.987Z',
      updatedAt: '2024-07-22T13:55:42.687Z',
      number: 99312
    },
    {
      _id: '669e63c79ed280001b47552b',
      ingredients: ['61c0c5a71d1f82001bdaaa78'],
      status: 'done',
      name: 'Альфа-сахаридный бургер',
      createdAt: '2024-07-22T13:51:03.876Z',
      updatedAt: '2024-07-22T13:51:04.581Z',
      number: 99310
    },
    {
      _id: '669e60c29ed280001b4754e8',
      ingredients: ['61c0c5a71d1f82001bdaaa6d', '61c0c5a71d1f82001bdaaa6f'],
      status: 'done',
      name: 'Бессмертный флюоресцентный бургер',
      createdAt: '2024-07-22T13:38:10.209Z',
      updatedAt: '2024-07-22T13:38:10.900Z',
      number: 99308
    }
  ],
  total: 99331,
  totalToday: 466
};

export const mockOrders = {
  success: true,
  orders: [
    {
      _id: '66e2dfd6119d45001b5066e0',
      ingredients: [
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa0946',
        '643d69a5c3f7b9001cfa0942',
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093d'
      ],
      owner: '66d83149119d45001b5040b1',
      status: 'done',
      name: 'Минеральный флюоресцентный spicy био-марсианский бургер',
      createdAt: '2024-09-12T12:34:30.396Z',
      updatedAt: '2024-09-12T12:34:30.970Z',
      number: 52816,
      __v: 0
    }
  ]
};

export const mockPostOrder = {
  success: true,
  name: 'Минеральный флюоресцентный spicy био-марсианский бургер',
  order: {
    ingredients: [
      {
        _id: '643d69a5c3f7b9001cfa0941',
        name: 'Биокотлета из марсианской Магнолии',
        type: 'main',
        proteins: 420,
        fat: 142,
        carbohydrates: 242,
        calories: 4242,
        price: 424,
        image: 'https://code.s3.yandex.net/react/code/meat-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0946',
        name: 'Хрустящие минеральные кольца',
        type: 'main',
        proteins: 808,
        fat: 689,
        carbohydrates: 609,
        calories: 986,
        price: 300,
        image: 'https://code.s3.yandex.net/react/code/mineral_rings.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/mineral_rings-mobile.png',
        image_large:
          'https://code.s3.yandex.net/react/code/mineral_rings-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa0942',
        name: 'Соус Spicy-X',
        type: 'sauce',
        proteins: 30,
        fat: 20,
        carbohydrates: 40,
        calories: 30,
        price: 90,
        image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
      },
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0
      }
    ],
    _id: '66e2dfd6119d45001b5066e0',
    owner: {
      name: 'Аня',
      email: 'annettetk@yandex.ru',
      createdAt: '2024-09-04T10:07:05.663Z',
      updatedAt: '2024-09-09T08:27:05.482Z'
    },
    status: 'done',
    name: 'Минеральный флюоресцентный spicy био-марсианский бургер',
    createdAt: '2024-09-12T12:34:30.396Z',
    updatedAt: '2024-09-12T12:34:30.970Z',
    number: 52816,
    price: 2790
  }
};

export const mockUser = {
  success: true,
  user: {
    email: 'a@yandex.ru',
    name: 'Аня'
  }
};
