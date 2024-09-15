import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import { ErrorNotFound, BadRequest } from "./error/errorHandler";
import { userController, shapeController } from './controllers'

const app = new Elysia( { prefix : '/api/v1'}).error( { ErrorNotFound, BadRequest })
  .use(swagger({
    scalarConfig : {
      theme : 'none',
      metaData : {
        articleAuthor : ["Naufal Andya"],
        author : "Naufal Andya",
      }
    },
    swaggerOptions : {
      persistAuthorization : true
    },
    path : "/api-docs",
    documentation: {
        // openapi : "WOW",

        info: {
            title: 'Andya API Documentation',
            version: '1.0.0',
            description : "API for studying",
            contact : {
              email : "andyakuliah@tgmai.com",
              name : "Naufal Andya Faiz",
              url : "https://github.com/naufalandya"
            }
        },
        tags: [
          { name: 'User', description: 'User Feature' },
          { name: 'Shape', description: 'Calculate Shape' }
        ],
        components: {
          securitySchemes: {
            JwtAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT"
            }
          }
        },
        servers: [{ url: "http://localhost:3500" }]
    }
  }))
  .trace(async ({ onHandle }) => {
    onHandle(({ begin, onStop }) => {
    onStop(({ end }) => {
          console.log('handle took', end - begin, 'ms')
    })
    })
  })

  .onError( ( { code, set, error }) =>  {
    switch (code) {
      case 'ErrorNotFound':

        set.headers["content-type"] = "application/json;charset=utf-8"
        set.status = 404

        return error
      
      case 'NOT_FOUND':
        set.headers["content-type"] = "application/json;charset=utf-8"
        return  error
      
      case 'BadRequest':

        set.headers["content-type"] = "application/json;charset=utf-8"
        set.status = 400

        return error
    }
  }
  
  )

  .use(userController)
  .use(shapeController)
  .get("/", () => "Hello Elysia")
  .get("/hi", () => "Hoiiii")
  .get("/inijson", () => "halo")
  .get('/video', Bun.file('aaa.mp4'))
  .get('/error', () => {
    throw new ErrorNotFound('the page is under construction :)')
  })
  // .get('/custom-status', ({ redirect }) => {
  //   // You can also set custom status to redirect
  //   return redirect('https://youtu.be/whpVWVWBW4U?&t=8', 302)
  // })

  .listen(3500);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
