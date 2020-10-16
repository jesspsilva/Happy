<h3 align="center">
    <img alt="Happy" width="280" title="#logo" src="./github_assets/logo.png">
    <br>
</h3>

# :books: Table of Contents

- [About](#about)
- [Technologies](#technologies)
- [How to run](#como-usar)
- [How to Contribute](#como-contribuir)

<a id="about"></a>

## :star: About

The <strong>Happy</strong> project was developed during the Next Level Week, by Rocketseat, during the 12th to the 18th of October.
The project is inspired by Charities.

<a id="technologies"></a>

## :computer: Technologies

The project was developed using the following technologies

- [TypeScript](https://www.typescriptlang.org/)
- [React](https://pt-br.reactjs.org/)
- [Styled Components](https://styled-components.com/)
- [Node.js](https://nodejs.org/en/)
- [SQLite](https://www.sqlite.org/index.html)
- [Express](https://expressjs.com/)
- [HTML](https://html.com/)
- [CSS](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
- [JavaScript](https://www.javascript.com/)


### Web Screenshot
<div style="display: flex; flex-direction: 'row'; align-items: 'center';">
       <img src="./github_assets/web1.png" width="400px">
       <img src="./github_assets/web2.png" width="400px">
</div>

## :arrow_forward: How to run

### :one: Back-End - API server
Clone the project on your computer:
```bash 
$ git clone https://github.com/jesspsilva/Happy-Web/backend
```
Install the dependencies:
```bash
cd backend
yarn install
yarn typeorm migration:run  // creating the tables on happy table with postgres
yarn dev
```
Go to <a href="http://127.0.0.1:3333/orphanages" target="_blank">http://127.0.0.1:3333/orphanages</a> to view

### :two: Front-End - Web Application
To start the **application** clone this repository:
```bash 
$ git clone https://github.com/jesspsilva/Happy-Web
```
Then use the commands bellow:
```bash
cd Happy-Web/web
yarn install
yarn start
```
After this process the `localhost: 3000` page will automatically open in your browser or acsess <a href="http://127.0.0.1:3000/orphanages" target="_blank">http://127.0.0.1:3000/orphanages</a>

### :yellow_heart: How to contribute
- Fork this repository;
- Create a branch with your feature: `git checkout -b my-feature`
- Commit your changes: `git commit -m 'Describe your new feature'`
- Push your branch: `git push origin my-feature`

## :scroll: License

This project is under the MIT license. See the [licence page](https://opensource.org/licenses/MIT) for more details.

If you like it, leave a :star:!
