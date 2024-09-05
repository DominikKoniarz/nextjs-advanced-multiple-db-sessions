# Multiple Database Sessions with Next.js and Lucia auth

Simple app to showcase use case of database sessions. Main feauture is possibility to simply create account and then log in with multiple devices. Then all your sessions will be listed at /dashboard page. You are able to log out any session remotely. It is a common security factor in many apps - you can log out any session from any device when you fill it could be for ex. stollen.

# Tech

Next.js is core of this project. On top of that I used lucia auth for authentication.
<br/>
Couple other packages were used. Ex. arctic for OAuth authentication, bcrypt, react-hook-form, zod, next-safe-action, shadcn/ui and magicui and more.
<br/>
Beside showcasing possibility of remotely invalidating sessions I could improve my design skills. Better with every new project.
<br/>
Project is hosted on Vercel. Used Vercel postgres.

# Try it!

App is available [here](https://advanced-sessions.dominikkoniarz.pl/).
