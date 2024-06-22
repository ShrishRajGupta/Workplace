<div align="centre">

  # Workplace  ![Workplace](/client/public/icons8-job-64.png)
</div>

## Table of Contents
<details>
  <summary>Expand</summary>
  <ol>

- [Features](#Features)
- [Images](#Images)
- [TechStack](#TechStack)
- [Installation](#installation)
- [Maintainers](#Maintainers)
- [Technologies](#technologies)
- [License](#license)
- [Contributing](#contributing)

</ol>
</details>

## Images
<div align="centre">
<img src="./client/public/images/Demo/photo_4.jpg" width ="450px" title="Profile page" alt="Profile page">
<img src="./client/public/images/Demo/photo_1.jpg" title="Chat" alt ="Demo img" width="450px">
<img src="./client/public/images/Demo/photo_2.jpg" width ="450px" title="Resume Builder" alt ="Resume Builder">
<img src="./client/public/images/Demo/photo_3.jpg" width ="450px" title="Login page">
<!-- <img src="./client/public/images/Demo/photo_5.jpeg"> -->
</div>

## Features

- Job posting and management for employers
- Real-time chat between employers and job seekers
- Real-time notifications for job applications and **critical email** updates 
- Inbuilt resume builder for job seekers
- Job searching and application for job seekers
- Profile management for both employers and job seekers

<!-- Badges -->


<!-- ![](https://img.shields.io/github/forks/ShrishRajGupta/Workplace.svg) -->
![](https://img.shields.io/badge/Maintained-Yes-indigo)
![](https://img.shields.io/github/stars/ShrishRajGupta/Workplace.svg)
![](https://img.shields.io/github/issues/ShrishRajGupta/Workplace)
![](https://img.shields.io/github/last-commit/ShrishRajGupta/Workplace)

#### [Documentation](https://github.com/ShrishRajGupta/Workplace/blob/abhishek/README.md)
#### [Request Feature](https://github.com/ShrishRajGupta/Workplace/issues)



##  TechStack 
👾
<details>
  <summary>Client</summary>
  <ul>
    <a href = "https://reactjs.org/">
    React.js </a>
  </ul>
  <ul>
    <a href = "https://redux.js.org/">
    Redux </a>
  </ul>
  <ul>
    <a href = "https://mui.com/">
    Material-UI </a>
  </ul>
  <ul>
    <a href = "https://socket.io/">
  Socket io
    </a>

  </ul>
</details>

<details>
  <summary>Server</summary>
  <ul>
  <a href = "https://nodejs.org/en/">
    Node.js</a>
  </ul>
</details>

<details>
<summary>Database</summary>
    <ul>
    <a href = "https://www.mongodb.com/" >
    MongoDB</a>
    </ul>
    <ul>
    <a href = "https://cloudinary.com" >
    Cloudinary</a>
    </ul>

</details>
<br />

## Requirements
[Workplace](https://github.com/ShrishRajGupta/Workplace) is a NodeJS application based.

For codebase use the package manager [npm](https://www.npmjs.com/) to install [Workplace](https://github.com/ShrishRajGupta/Workplace).

<br>

## Installation
```bash
git clone https://github.com/ShrishRajGupta/Workplace.git
npm install
```

### Setup Environment Variables
Create a .env file in the root directory and add the following variables:

```bash
ACCESS_TOKEN  # Secret key for JWT

CLOUDINARY_APIKEY  # Cloudinary API Key
CLOUDINARY_APISECRET  # Cloudinary API Secret
CLOUDINARY_CLOUDNAME # Cloudinary Cloud Name

MONGO_URL  # MongoDB URL
GMAIL_USER # Gmail Email
GMAIL_PASS # Gmail Password

```
#### Setup Cloudinary
- Create an account on [Cloudinary](https://cloudinary.com/)
- Get the API Key, API Secret, and Cloud Name
- Add the API Key, API Secret, and Cloud Name to the .env file

#### Setup MongoDB
- Create an account on [MongoDB](https://www.mongodb.com/)
- Create a new cluster
- Get the MongoDB URL
- Add the MongoDB URL to the .env file

#### Setup Client
```bash
cd client
npm install
npm start
```
### Start the Server
```bash
cd server
npm install
npm start
```

## Maintainers 👨‍💻
  <div>
      <p align="center">
<a href="https://github.com/ShrishRajGupta/Workplace/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=ShrishRajGupta/Workplace" />
</a></p>
  </div>

- ### [Shrish Raj Gupta](https://github.com/ShrishRajGupta)   [<img height="13" src="https://cdn.svgporn.com/logos/linkedin.svg" />](https://www.linkedin.com/in/shrishrajgupta/)
- ### [Abhishek Yadav](https://github.com/AbhishekYMNNIT)  [<img height="13" src="https://cdn.svgporn.com/logos/linkedin.svg" />](https://www.linkedin.com/in/abhishekyadav123/)
- ### [Shreyansh Jaiswal](https://github.com/CodeBuster09)  [<img height="13" src="https://cdn.svgporn.com/logos/linkedin.svg" />]( https://www.linkedin.com/in/shreyanshjaiswal09/)

## Licence 🍁
### [**MIT**](/LICENSE)  &copy; [Shrish Raj Gupta](https://github.com/ShrishRajGupta)

## Contributing 💙

PR's are welcome !Found a Bug ? 

Create an [Issue](https://github.com/ShrishRajGupta/Workplace/issues).

## 💖 Like this project ?

Leave a ⭐ If you think this project is cool.
 <p align="center"><img src="https://github.githubassets.com/images/mona-whisper.gif" alt="mona whisper" /></p>
