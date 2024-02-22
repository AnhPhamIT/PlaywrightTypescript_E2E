import { test as base } from '@playwright/test'
export type TestOptions ={
    userLogin: any
}

export const test = base.extend<TestOptions>({
    userLogin:[{username:'myname1@gmail.com', password:'password'}, {option:true}]
})