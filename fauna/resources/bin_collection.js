import faunadb from "faunadb"

const q = faunadb.query
const { CreateCollection } = q

const CreateCollectionBin = CreateCollection({
  name: "Bin",
  history_days: 0,
  ttl_days: null,
})

export default CreateCollectionBin
