import faunadb from "faunadb"

const q = faunadb.query
const { CreateCollection } = q

const CreateCollectionAccounts = CreateCollection({
  name: "accounts",
  history_days: 0,
  ttl_days: null,
})

export default CreateCollectionAccounts
