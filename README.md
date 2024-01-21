# Blog - My Life In White And Green

Dieses Projekt entstand im Rahmen einen Full-Stack Developer Bootcamps als eigenständiges Projekt und wurde von mir zusätzlich zur Aufgabenstellung noch erweitert.

Das Projekt basiert auf dem MERN-Stack (MongoDB, ExpressJS, ReactJS, NodeJS) - Hier erstmal noch ohne MongoDB (also ohne Datenbank Anbindung)

Ziel des Projekts war, das Backend weiter zu verinnerlichen, insbesondere die Arbeit mit express.js und das hochladen von Dateien auf den Server mit dem npm package multer. Außerdem wurde die Verbindung zwischen Backend und Forontend weiter geübt.

Der Blog ist zu meinem Herzensprojekt geworden und ich werde diesen etwas später auch mit echten Daten füttern. Momentan enthält dieser nur Test Daten und es ist noch einiges daran zu tun.

#### Note!!!

Zurzeit ist der Blog noch nicht Responsive und bis jetzt nur auf Desktop optimiert!!!

## Table of Contents

- [Overview](#overview)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### How does the Blog work?

- Als erstes sehen die Besucher eine Startseite die nur einen Hero hat und über Button auf die Blog Artikel leitet.
- Außerdem kann im Navigationsmenü zwischen der Startseite, der Blog Seite und einer Admin Seite gewählt werden
- Die Blog Seite zeigt alle Blog Beiträge in Karten Form an aus denen ausgewählt werden kann. Jede Karte beinhaltet den Titel des Posts, einen Kurzbeschreibung und das Veröffentlichungsdatum. Außerdem kann ein Beitrag auch gelöscht werden. Wenn mit der Maus über eine Karte darüber gefahren wird, erscheint ein Mülleimer auf den man einen Beitrag löschen kann. Die einzelnen Karten selbst leiten auf eine detailirte Seite des jeweiligen Blog Posts weiter.
- Auf der Detail Seite eines BlogPosts sieht man das Bild, den Titel, den Autor, das Datum der Veröffentlichung, den Content und zusätzlich noch eine Sidebar mit weiteren Blog Posts die zuletzt erstellt wurden.
- Auf der Admin Seite kann ein Admin einen neuen Blog Post erstellen. Dabei kann er den Autor anlegen, den Titel, den Inhalt, Kategorien (Komma seperiert), SEO-Keywords (Komma seperiert) und eine Datei für das Titel Bild hochladen. Beim Absenden auf "Add Blog Post" wird der Blog erstellt und befindet sich dann auf der Blog Seite.

### Screenshot

#### Desktop:

![](./assets/img/screenshots/screenshot-desktop.png)

#### Modal for adding movie

![](./assets/img/screenshots/modal-for-adding-movie.png)

#### Flowchart

![](./assets/img/screenshots/flowcharts.png)

#### Starting Project

![](./assets/img/screenshots/project-start.png)

#### Project in Progress

![](./assets/img/screenshots/project-in-progress.png)

### Links

- Solution URL: [index.html](https://github.com/wilhelm-lenz/movie-database/blob/main/index.html)
- Solution URL: [style.css](https://github.com/wilhelm-lenz/movie-database/blob/main/assets/css/style.css)
- Solution URL: [main.js](https://github.com/wilhelm-lenz/movie-database/blob/main/assets/js/main.js)
- Live Page URL: [Movie Database Live](https://wilhelm-lenz.github.io/movie-database/)

## My Process

### Built With

- Semantic HTML5 markup
- SCSS custom properties
- JavaScript

### What I Learned

During the development of this application, I faced various challenges that I had to overcome. In particular, when selecting genres, I realized that the movies did not update immediately upon clicking, but only after clicking on another genre. This reminded me of the onChange event. With this, the browser can react immediately to changes, and only the movies with the correct genre are displayed.

### Continued Development

In the next phase of development, the focus will be on refactoring the code to improve modularity. Also, adherence to best practices will be emphasized to streamline the code in general. The HTML structure will also be revised for more semantics, and later responsiveness will be added to the project.

### Nützliche Ressourcen

- Netlify - [@app.netlify](https://app.netlify.com/drop/) [@netlify](https://netlify.com): Netlify is a development platform that enables scaling a web application. For example, a programmed web application can easily be converted into a mobile web app.

## Autor

- Wilhelm Lenz - [@wilhelm-lenz](https://github.com/wilhelm-lenz)
