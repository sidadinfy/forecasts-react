# SCMA Application

## For Development

1. Fork this repo into local
2. Clone the fork into local
3. [IMPORTANT] git checkout into dev branch.
4. After cloning, npm install
5. Navigate into the client folder, npm install
6. Navigate back to root of folder, npm start
7. It should compile all the CSS files and start the backend and Frontend
8. [IMPORTANT]Any Changes should go first into dev branch always.

## For Production

1. [IMPORTANT] git checkout to dev branch.
2. Navigate into client folder, npm run build
3. Commit all the build changes into git
4. Give pull request to master and sync all the changes
5. Go into production github account
6. Sync the production main branch from the developer main branch.
7. Once synced check for the chnages files in the github with the commit message
8. Go to the production heroku account.
9. Navigate to the deploy tab and run manual deploy. [IMPORTANT] DONT CHANGE ANYTHING ELSE
10. If the build succeeded then everything will work, if the build did not happen follow the DEBUG section
    <br/>
    <br/>
    <br/>

### FILES AND FOLDERS

---

### **Client Folder**(FRONTEND) <br/>

- All the react code is inside this folder. Any react changes needs to follow these guidlines.
- This project is using Prime React and Tailwind CSS libraries. Please visit the websites to see the components available before creating own component

- [Prime React](https://primefaces.org/primereact/showcase/#/setup)
- [TailwindCSS](https://tailwindcss.com/docs)

---

# !!!!!!! [IMPORTANT] PLEASE FOLLOW GUIDELINES !!!!!!

## CSS Files

All CSS files must be inside the `assets` file,

1. DON'T add any CSS inside `main.css`.

2. DON'T change the `tailwind.css` file.

3. ALL CSS can be added `only custom.css`, dont use `!important` &nbsp;in any style always <u>use custom classes</u> to override styles.

## Image Files

All Images must be put in a folder named img inside assets

1. Images must be imported like the following.

`import image from "../../assets/img/img1.png"`

2. Image can be used like the following.

```javascript
<img src={image} alt="imag" className="" />
```

## React Components

1. All the custom react components `must` be inside the `components` folder.
2. Dont Use component as part of the name of the folder or the file.
3. Always create a folder and inside that add the file.
4. When using Prime React components always send the {...this.props} back in the props.
5. Always use class based components, unless really necesary use functional with hooks.
6. Avoid using any other packages because adding uneccassary packages becomes heavy on the app. Especially utility packages like lodash or momentjs or even jquery.
7. For any CSS animations use this website to tweak and add it in custom.css. [Animista](https://animista.net/)

## Rules Of Adding a Page

1. All the pages reside inside the `views` folder inside `components`.
2. Keep more short and descriptive names of pages. They will follow the same pattern as the components. Folder then add file.
3. In order to add a New Page called `About`, first you need to open `routes.js` present in the src folder root.
4. Open that file and you will find 3 comments
   - Links
     - will contain just paths like `/about`
   - Link Names
     - Will contain name of the path, it will be used when you want to display as the title of the page using React-Helmet
   - Pages
     - Pages created for navigation
5. Lastly it will have a const named `routes` it will be a array of objects.

   ```javascript
   export const linkAbout = "/about";
   export const linkNameAbout = "About";
   const About = React.lazy(() => import("./components/views/About/About"));
   const routes = [
     {
       path: linkAbout,
       exact: true,
       name: linkNameAbout,
       component: Maintain,
     },
   ];
   ```
