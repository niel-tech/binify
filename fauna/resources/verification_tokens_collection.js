import faunadb from "faunadb"

const q = faunadb.query
const { CreateCollection } = q

const CreateCollectionVerificationTokens = CreateCollection({
  name: "verification_tokens",
  history_days: 0,
  ttl_days: null,
})

export default CreateCollectionVerificationTokens
