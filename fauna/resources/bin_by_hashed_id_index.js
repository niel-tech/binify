import faunadb from "faunadb"

const q = faunadb.query
const { Collection, CreateIndex } = q

const CreateIndexBinByHashedId = CreateIndex({
  name: "bin_by_hashed_id",
  unique: true,
  serialized: true,
  source: Collection("Bin"),
  terms: [
    {
      field: ["data", "hashed_id"],
    },
  ],
})

export default CreateIndexBinByHashedId
