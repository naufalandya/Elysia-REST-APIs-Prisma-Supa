import Elysia, { LocalHook, t } from "elysia";
import { BadRequest } from "../error/errorHandler";
import { areaRectangle } from "../model/shape.model";
import { rectangleAreaHook } from '../hook/shape.hook';

export default new Elysia()
    .group('/shape', (app) =>
        app
            .get("/triangle/area/:surface/:height", ({ set, params : { surface , height }}) => {
            
                const tinggiInterger = parseInt(surface)
                const alasInteger = parseInt(height)
            
                console.log(tinggiInterger)
            
                if (typeof tinggiInterger != 'number') {
                  throw new BadRequest('alas is not number')
                }
            
                if (typeof alasInteger != 'number') {
                  throw new BadRequest('tinggi is not number')
                }
                const segitiga = tinggiInterger * alasInteger /2 
            
                set.status = 200
            
                return { result : segitiga }
              })
            .post("/rectangle/area/:width/:length", async ({ set : { status }, params : { width , length }}) => 
                areaRectangle(width, length, status), rectangleAreaHook as object
        ) 
    )   
          