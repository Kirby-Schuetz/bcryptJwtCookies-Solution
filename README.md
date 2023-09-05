### Demo using JWT, bcrypt, and httpOnly cookies

#### First

1. Make sure that locally you `createDb bcrypt`
2. Also dont forget to `npm install`
3. To seed the database run `npm run seed`
4. To start the server run `npm run start:dev`

#### To set it up yourself
```git checkout startingPoint``` and give it a try!

### Also...

There is a branch `git checkout reactFrontEnd`, which shows you how to add
a react-app inside of our repository, and use express to serve the build folder
in production

##### If you do this...
...you can also run ```npm run build```  and test out the build version at PORT=5000

#### httpOnly

This prevents XSS Cross-Site-Scripting attacks on your site... localStorage is vulnerable!


