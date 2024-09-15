import { StatusMap } from "elysia"
import { BadRequest } from "../error/errorHandler"

export const areaRectangle = async function(width :string, length : string, status? : number | keyof StatusMap){
    try {

        const widthInt = parseInt(width)
        const lengthInt = parseInt(length)

        if (widthInt === 2) {
            throw new BadRequest('width is two and its fake error')
        }
              
        if (typeof widthInt != 'number') {
          throw new BadRequest('width is not number')
        }
    
        if (typeof lengthInt != 'number') {
          throw new BadRequest('length is not number')
        }
        const area = widthInt * lengthInt

        status = 201
        
        return { status : true, message : 'success', result : area }

    } catch (err) {
        throw err
    }
}