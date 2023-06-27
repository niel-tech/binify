import faunadb from "faunadb"

const q = faunadb.query
const {
  CreateFunction,
  Query,
  Var,
  Lambda,
  Role,
  Create,
  TimeAdd,
  Collection,
  Now,
  ToString,
  If,
  Or,
  Equals,
  Not,
  Let,
} = q

const CreateFunctionCreateBin = CreateFunction({
  name: "createBin",
  body: Query(
    Lambda(
      ["hashed_id", "text", "hashed_password", "readOnce", "offset", "unit"],
      Let(
        { calcLifeTime: TimeAdd(Now(), Var("offset"), Var("unit")) },
        Create(Collection("Bin"), {
          ttl: Var("calcLifeTime"),
          data: {
            hashed_id: Var("hashed_id"),
            text: Var("text"),
            lifetime: ToString(Var("calcLifeTime")),
            readOnce: Var("readOnce"),
            hashed_password: If(
              Or(Equals(Var("hashed_password"), "null"), Equals(Var("hashed_password"), "undefined")),
              null,
              Var("hashed_password")
            ),
            isProtected: Not(Or(Equals(Var("hashed_password"), "null"), Equals(Var("hashed_password"), "undefined"))),
          },
        })
      )
    )
  ),
  role: Role("user"),
})

export default CreateFunctionCreateBin
