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
  If,
  Or,
  Equals,
  Not,
  Let,
  ToString,
  Call,
} = q

const CreateFunctionCreateBin = CreateFunction({
  name: "createBin",
  body: Query(
    Lambda(
      ["hashed_id", "text", "hashed_password", "readOnce", "offset", "unit", "title", "userId"],
      Let(
        { calcLifeTime: If(Not(Equals(Var("unit"), "lifetime")), TimeAdd(Now(), Var("offset"), Var("unit")), null) },
        Create(Collection("Bin"), {
          ttl: Var("calcLifeTime"),
          data: {
            title: Var("title"),
            userId: Var("userId"),
            hashed_id: Var("hashed_id"),
            text: Var("text"),
            lifetime: If(
              Not(Equals(Var("unit"), "lifetime")),
              ToString(TimeAdd(Now(), Var("offset"), Var("unit"))),
              "forever"
            ),
            readOnce: Var("readOnce"),
            hashed_password: If(
              Or(Equals(Var("hashed_password"), "null"), Equals(Var("hashed_password"), "undefined")),
              null,
              Var("hashed_password")
            ),
            isProtected: Not(Or(Equals(Var("hashed_password"), "null"), Equals(Var("hashed_password"), "undefined"))),
            createdAt: ToString(Now()),
            sortValues: {
              v1: Call("randomizer", 1),
              v2: Call("randomizer", 1),
              v3: Call("randomizer", 1),
              v4: Call("randomizer", 1),
              v5: Call("randomizer", 1),
            },
          },
        })
      )
    )
  ),
  role: Role("user"),
})

export default CreateFunctionCreateBin
