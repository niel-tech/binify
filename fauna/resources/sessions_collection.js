import faunadb from "faunadb"

const q = faunadb.query
const { CreateCollection } = q

const CreateCollectionSessions = CreateCollection({
  name: "sessions",
  history_days: 0,
  ttl_days: null,
})

export default CreateCollectionSessions
