import faunadb from "faunadb"

const q = faunadb.query
const { Collection, CreateIndex } = q

const CreateIndexBinByUserId = CreateIndex({
  name: "bin_by_userId",
  source: Collection("Bin"),
  unique: false,
  terms: [{ field: ["data", "userId"] }],
})

export default CreateIndexBinByUserId
