import Elysia from "elysia";

export default new Elysia( { prefix : '/user'})
    .group('/auth', (app) =>
        app
            .post('/sign-in', () => 'Sign in')
            .post('/sign-up', () => 'Sign up')
            .get('/who-am-i', ( { set : { status }}) => () => {
                status = 201
                return JSON.stringify({
                    message : "wow"
                })
            }, {
                detail : {
                    tags: ['User']
                }
            })
    )
    .get('/id/:id', ({ params: { id } }) => id)
    .get('/id/:id/:name', ({ params: { id, name } }) => id + ' ' + name)
    .get('/id/*', ({ params }) => params['*'])
    .get('/json', ( {set} )=> {
      
    })
    .get('/', ({ redirect }) => {
        return redirect('https://youtu.be/whpVWVWBW4U?&t=8', 302)
    })
  