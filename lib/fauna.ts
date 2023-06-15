import { gql, GraphQLClient } from "graphql-request"
import { Bin } from "../models/bin.model"

const graphQLClient = new GraphQLClient("https://graphql.eu.fauna.com/graphql", {
  headers: {
    authorization: `Bearer ${process.env.FAUNA_USER_KEY}`,
  },
})

export const getBin = (hashed_id: string): Promise<Bin> => {
  const query = `query getBin {
    getBin(
      hashed_id: "${hashed_id}"
    ) {
      hashed_id
      lifetime
      readOnce
      isProtected
    }
  }`

  return graphQLClient.request(query).then(({ getBin }: any) => getBin)
}

export const readBin = (hashed_id: string, hashed_pw?: string): Promise<Bin> => {
  const query = `query readBin {
    readBin(
      hashed_id: "${hashed_id}"
      hashed_pw: "${hashed_pw}"
    ) {
      hashed_id
      text
      lifetime
      readOnce
      isProtected
    }
  }`

  return graphQLClient.request(query).then(({ readBin }: any) => readBin)
}

export const createNewBin = (
  hashed_id: string,
  text: string,
  hashed_password: string | null,
  readOnce: boolean,
  offset: number,
  unit:
    | "day"
    | "days"
    | "half day"
    | "half days"
    | "hour"
    | "hours"
    | "minute"
    | "minutes"
    | "second"
    | "seconds"
    | "millisecond"
    | "milliseconds"
    | "microsecond"
    | "microseconds"
    | "nanosecond"
    | "nanoseconds"
): Promise<Bin> => {
  const query = `
    mutation createNewBin {
      createNewBin(
        hashed_id: "${hashed_id}"
        text: "${text}"
        hashed_password: "${hashed_password}"
        readOnce: ${readOnce}
        offset: ${offset}
        unit: "${unit}"
      ) {
        hashed_id
        text
        lifetime
        readOnce
        isProtected
      }
    }
  `
  console.log(query)

  return graphQLClient.request(query).then(({ createNewBin }: any) => createNewBin)
}
