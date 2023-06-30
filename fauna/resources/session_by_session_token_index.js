import faunadb from "faunadb"

const q = faunadb.query
const { Collection, CreateIndex } = q

const CreateIndexSessionBySessionToken = CreateIndex({
  name: "session_by_session_token",
  source: Collection("sessions"),
  unique: true,
  terms: [{ field: ["data", "sessionToken"] }],
})

export default CreateIndexSessionBySessionToken
