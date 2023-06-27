import faunadb from "faunadb"

const q = faunadb.query
const {
  CreateFunction,
  Query,
  Var,
  Lambda,
  Role,
  Match,
  Index,
  IsNull,
  Select,
  Exists,
  ContainsField,
  And,
  Get,
  If,
  Or,
  Equals,
  Not,
  Let,
} = q

const CreateFunctionGetBin = CreateFunction({
  name: "getBin",
  role: Role("user"),
  body: Query(
    Lambda(
      ["hashed_id"],
      Let(
        {
          getBin: If(
            Exists(Match(Index("bin_by_hashed_id"), Var("hashed_id"))),
            Get(Match(Index("bin_by_hashed_id"), Var("hashed_id"))),
            null
          ),
        },
        {
          hashed_id: If(Not(IsNull(Var("getBin"))), Select(["data", "hashed_id"], Var("getBin")), null),
          lifetime: If(Not(IsNull(Var("getBin"))), Select(["data", "lifetime"], Var("getBin")), null),
          readOnce: If(Not(IsNull(Var("getBin"))), Select(["data", "readOnce"], Var("getBin")), null),
          isProtected: And(
            ContainsField("hashed_password", Select("data", Var("getBin"))),
            Not(
              Or(
                Equals(Select(["data", "hashed_password"], Var("getBin")), "null"),
                Equals(Select(["data", "hashed_password"], Var("getBin")), "undefined")
              )
            )
          ),
        }
      )
    )
  ),
})

export default CreateFunctionGetBin
