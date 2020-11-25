'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const { getRandomInt, shuffle } = require(`../../utils`);

const DEFAULT_COUNT = 1;
const MAX_COUNT = 1000;
const FILE_NAME = `mocks.json`;
const CATEGORIES = [
  'Деревья',
  'За жизнь',
  'Без рамки',
  'Разное',
  'IT',
  'Музыка',
  'Кино',
  'Программирование',
  'Железо',
];
const SENTENCES = [
  'Ёлки — это не просто красивое дерево. Это прочная древесина.',
  'Первая большая ёлка была установлена только в 1938 году.',
  'Вы можете достичь всего. Стоит только немного постараться и запастись книгами.',
  'Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.',
  'Золотое сечение — соотношение двух величин, гармоническая пропорция.',
  'Собрать камни бесконечности легко, если вы прирожденный герой.',
  'Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.',
  'Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.',
  'Программировать не настолько сложно, как об этом говорят.',
  'Простые ежедневные упражнения помогут достичь успеха.',
  'Это один из лучших рок-музыкантов.',
  'Он написал больше 30 хитов.',
  'Из под его пера вышло 8 платиновых альбомов.',
  'Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.',
  'Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?',
  'Достичь успеха помогут ежедневные повторения.',
  'Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.',
  'Как начать действовать? Для начала просто соберитесь.',
  'Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравятся только игры.',
  'Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.',
];
const TITLES = [
  'Ёлки. История деревьев',
  'Как перестать беспокоиться и начать жить',
  'Как достигнуть успеха не вставая с кресла',
  'Обзор новейшего смартфона',
  'Лучшие рок-музыканты 20-века',
  'Как начать программировать',
  'Учим HTML и CSS',
  'Что такое золотое сечение',
  'Как собрать камни бесконечности',
  'Борьба с прокрастинацией',
  'Рок — это протест',
  'Самый лучший музыкальный альбом этого года',
];
const randomDate = (start, end) => {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
};

const setArticleDate = () => {
  const startDate = new Date();
  const month = startDate.getMonth();
  const monthOffset = getRandomInt(0, 2);
  const newMonth = month - monthOffset;

  startDate.setMonth(newMonth);

  return randomDate(startDate, new Date());
};

const generateArticles = (count) =>
  Array(count)
    .fill({})
    .map(() => ({
      announce: shuffle(SENTENCES).slice(1, 5).join(` `),
      category: [CATEGORIES[getRandomInt(0, CATEGORIES.length - 1)]],
      createdDate: setArticleDate(),
      fullText: shuffle(SENTENCES)
        .slice(1, getRandomInt(1, SENTENCES.length - 1))
        .join(` `),
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
    }));

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countArticle = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countArticle > MAX_COUNT) {
      console.error(chalk.red(`Не больше 1000 объявлений`));
      process.exit(1);
    }

    const content = JSON.stringify(generateArticles(countArticle));

    try {
      await fs.writeFile(FILE_NAME, content);
      console.log(chalk.green(`Operation success. File created.`));
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
    }
  },
};
