import faunadb from "faunadb"

const q = faunadb.query
const { Collection, CreateIndex } = q

const CreateIndexBin = CreateIndex({
  name: "bin",
  unique: false,
  serialized: true,
  source: Collection("Bin"),
})

export default CreateIndexBin
