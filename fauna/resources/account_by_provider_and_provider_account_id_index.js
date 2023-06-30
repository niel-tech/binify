import faunadb from "faunadb"

const q = faunadb.query
const { Collection, CreateIndex } = q

const CreateIndexAccountByProviderAndProviderAccountId = CreateIndex({
  name: "account_by_provider_and_provider_account_id",
  source: Collection("accounts"),
  unique: true,
  terms: [{ field: ["data", "provider"] }, { field: ["data", "providerAccountId"] }],
})

export default CreateIndexAccountByProviderAndProviderAccountId
