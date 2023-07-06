import { Client as FaunaClient } from "faunadb"
import { gql, GraphQLClient } from "graphql-request"
import { Bin } from "../models/bin.model"

export const authClient = new FaunaClient({
  secret: (process.env.NODE_ENV === "development"
    ? process.env.DEV_FAUNA_ADMIN_KEY
    : process.env.FAUNA_ADMIN_KEY) as string,
  scheme: "https",
  domain: process.env.FAUNADB_DOMAIN,
  port: 443,
})

export const userClient = new GraphQLClient("https://graphql.eu.fauna.com/graphql", {
  headers: {
    authorization: `Bearer ${
      process.env.NODE_ENV === "development"
        ? process.env.NEXT_PUBLIC_DEV_FAUNA_USER_KEY
        : process.env.NEXT_PUBLIC_FAUNA_USER_KEY
    }`,
  },
  fetch: fetch,
})

export const GET_BINS_BY_USER = (sessionToken?: string) => gql`query getBinsByUser {
    getBinsByUser(
      session_token: "${sessionToken}"
    ) {
      title
      hashed_id
      lifetime
      readOnce
      isProtected
      createdAt
    }
  }`

export const getBinsByUser = (sessionToken: string): Promise<Bin[]> => {
  return userClient.request(GET_BINS_BY_USER(sessionToken)).then(({ getBinsByUser }: any) => getBinsByUser)
}

export const validateSession = (sessionToken: string): Promise<{ userId: string }> => {
  const query = `query validateSession {
    validateSession(
      session_token: "${sessionToken}"
    ) {
      userId
    }
  }`

  return userClient.request(query).then(({ validateSession }: any) => validateSession)
}

export const getBin = (hashed_id: string): Promise<Bin> => {
  const query = `query getBin {
    getBin(
      hashed_id: "${hashed_id}"
    ) {
      title
      hashed_id
      lifetime
      readOnce
      isProtected
      createdAt
    }
  }`

  return userClient.request(query).then(({ getBin }: any) => getBin)
}

export const readBin = (hashed_id: string, hashed_pw?: string): Promise<Bin> => {
  const query = `query readBin {
    readBin(
      hashed_id: "${hashed_id}"
      hashed_pw: "${hashed_pw}"
    ) {
      title
      hashed_id
      text
      lifetime
      readOnce
      isProtected
      createdAt
    }
  }`

  return userClient.request(query).then(({ readBin }: any) => readBin)
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
    | "lifetime",
  title?: string,
  userId?: string
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
        title: ${title ? `"${title}"` : null}
        userId: ${userId ? `"${userId}"` : null}
      ) {
        userId
        hashed_id
        title
        text
        lifetime
        readOnce
        isProtected
        createdAt
      }
    }
  `

  return userClient.request(query).then(({ createNewBin }: any) => createNewBin)
}
