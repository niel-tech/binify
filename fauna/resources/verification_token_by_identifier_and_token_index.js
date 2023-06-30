import faunadb from "faunadb"

const q = faunadb.query
const { Collection, CreateIndex } = q

const CreateVerificationTokenByIdentifierAndToken = CreateIndex({
  name: "verification_token_by_identifier_and_token",
  source: Collection("verification_tokens"),
  unique: true,
  terms: [{ field: ["data", "identifier"] }, { field: ["data", "token"] }],
})

export default CreateVerificationTokenByIdentifierAndToken
