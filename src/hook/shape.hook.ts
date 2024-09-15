import { t } from "elysia"
import { BadRequest } from "../error/errorHandler"

export const rectangleAreaHook  = {

    //Validation
    body : t.Object({
      name : t.String( 
        { 
          example : "naufalandya",
          description : "user's name",
          maxLength : 50, 
          minLength : 8,
        },                    
      ),

      email : t.String( { 
        example : "naufalandya@gmail.com",
        description : "user's email",
        format : 'email' ,
        maxLength : 50, 
        minLength : 17,
        error({ errors, type, validator, value }) {

          if (errors[0].type == 52) { //expected minLength
            throw new BadRequest("Expected string length greater or equal to 17 !")
          }

          return { error : errors[0].message, all : errors }
      } 
      } )

    },
    {
      error :  'invalid object',
    }
  ),

  //API-DOC response

  detail : {
    summary: "Find rectangle area",
    tags : ['Shape'],
    security: [{ JwtAuth: [] }],
    description : "Find rectangle area with width and length along your name",
    responses : {
        200 : {
          description : "Success",
          content : {
            "application/json" : {
              schema: {
                type: "object",
                properties : {
                  status : {
                    type : "boolean",
                    description : "rectangle's area successfully created",
                    example : true
                  },
                }
              }
            }
          }
        }
    },
 },
}