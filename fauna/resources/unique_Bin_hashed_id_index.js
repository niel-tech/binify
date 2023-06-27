import faunadb from "faunadb"

const q = faunadb.query
const { Collection, CreateIndex } = q

const CreateIndexUniqueBinHashedId = CreateIndex({
  name: "unique_Bin_hashed_id",
  unique: true,
  serialized: true,
  source: Collection("Bin"),
  terms: [
    {
      field: ["data", "hashed_id"],
    },
  ],
})

export default CreateIndexUniqueBinHashedId
