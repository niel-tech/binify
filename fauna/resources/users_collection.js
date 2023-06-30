import faunadb from "faunadb"

const q = faunadb.query
const { CreateCollection } = q

const CreateCollectionUsers = CreateCollection({
  name: "users",
  history_days: 0,
  ttl_days: null,
})

export default CreateCollectionUsers
