import json, { tableHeaderColumns } from './data';
import MoviesTable from './MoviesTable';

const moviesTable = new MoviesTable(tableHeaderColumns);
moviesTable.create(json);

const params = [
  ['id'],
  ['id', true],
  ['title'],
  ['title', true],
  ['year'],
  ['year', true],
  ['imdb'],
  ['imdb', true],
];

let paramIndex = 0;

setInterval(() => {
  moviesTable.sort(...params[paramIndex]);
  if (paramIndex >= params.length - 1) paramIndex = 0;
  else paramIndex += 1;
}, 2000);
