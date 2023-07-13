import faunadb from "faunadb"

const q = faunadb.query
const { CreateFunction, Query, Var, Lambda, Role, Exists, Match, Index, If, Let, Call } = q

const CreateFunctionCreateUniqueId = CreateFunction({
  name: "createUniqueId",
  role: Role("user"),
  body: Query(
    Lambda(
      ["_"],
      Let(
        {
          getRandString: Call("randomString", 5),
        },
        If(
          Exists(Match(Index("bin_by_hashed_id"), Var("getRandString"))),
          Call("createUniqueId", null),
          Var("getRandString")
        )
      )
    )
  ),
})

export default CreateFunctionCreateUniqueId
