import { test as base } from '@playwright/test'
import { TestOptions} from '../../type'
// export type TestOptions ={
//     userLogin: any,
//     apiURL:string
// }

export const test = base.extend<TestOptions>({
    userLogin:[{username:'myname1@gmail.com', password:'password'}, {option:true}],
    apiURL:['', {option:true}],
    baseURI: process.env.TESTAPP,
})
//https://stackoverflow.com/questions/77476850/how-do-you-add-a-custom-property-to-the-playwright-config-file