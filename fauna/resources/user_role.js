import faunadb from "faunadb"

const q = faunadb.query
const { CreateRole, Collection, Index, Function } = q

const CreateRoleUser = CreateRole({
  name: "user",
  privileges: [
    {
      resource: Collection("Bin"),
      actions: {
        read: true,
        write: true,
        create: true,
        delete: false,
        history_read: false,
        history_write: false,
        unrestricted_read: false,
      },
    },
    {
      resource: Index("bin"),
      actions: {
        unrestricted_read: false,
        read: true,
      },
    },
    {
      resource: Function("createBin"),
      actions: {
        call: true,
      },
    },
    {
      resource: Function("getBin"),
      actions: {
        call: true,
      },
    },
    {
      resource: Index("bin_by_hashed_id"),
      actions: {
        unrestricted_read: false,
        read: true,
      },
    },
    {
      resource: Function("readBin"),
      actions: {
        call: true,
      },
    },
  ],
  membership: [],
})

export default CreateRoleUser
