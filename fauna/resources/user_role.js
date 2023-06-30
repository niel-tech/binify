import faunadb from "faunadb"

const q = faunadb.query
const { CreateRole, Collection, Index, Function, Functions, Roles, Query, Lambda, And, Equals, Select, Var } = q

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
      resource: Collection("sessions"),
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
      resource: Index("bin_by_userId"),
      actions: {
        unrestricted_read: false,
        read: true,
      },
    },
    {
      resource: Index("session_by_session_token"),
      actions: {
        unrestricted_read: false,
        read: true,
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
      resource: Function("randomizer"),
      actions: {
        call: true,
      },
    },
    {
      resource: Function("getBinsByUser"),
      actions: {
        call: true,
      },
    },
    {
      resource: Function("validateSession"),
      actions: {
        call: true,
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
    {
      resource: Functions(),
      actions: {
        read: true,
        write: Query(
          Lambda(
            ["oldData", "newData"],
            And(
              Equals(Select(["name"], Var("oldData")), Select(["name"], Var("newData"))),
              Equals(Select(["role"], Var("oldData")), Select(["role"], Var("newData"))),
              Equals(Select(["body"], Var("oldData")), Select(["body"], Var("newData")))
            )
          )
        ),
        create: false,
        delete: false,
        history_read: false,
        history_write: false,
      },
    },
    {
      resource: Roles(),
      actions: {
        read: true,
        write: false,
        create: false,
        delete: false,
        history_read: false,
        history_write: false,
      },
    },
  ],
  membership: [],
})

export default CreateRoleUser
