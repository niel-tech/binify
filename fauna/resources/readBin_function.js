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
  Do,
  LT,
  ToTime,
  Now,
  Update,
  Merge,
} = q

const CreateFunctionReadBin = CreateFunction({
  name: "readBin",
  role: Role("user"),
  body: Query(
    Lambda(
      ["hashed_id", "hashed_pw"],
      Let(
        {
          getBin: If(
            Exists(Match(Index("bin_by_hashed_id"), Var("hashed_id"))),
            Get(Match(Index("bin_by_hashed_id"), Var("hashed_id"))),
            null
          ),
        },
        Let(
          {
            canAccess: Or(
              Not(ContainsField("hashed_password", Select("data", Var("getBin")))),
              If(
                And(Not(IsNull(Var("getBin"))), If(Not(Equals(Select(["data", "lifetime"], Var("getBin")), "forever")), LT(Now(), ToTime(Select(["data", "lifetime"], Var("getBin")))),true)),
                Equals(Select(["data", "hashed_password"], Var("getBin")), Var("hashed_pw")),
                false
              )
            ),
          },
          Do(
            If(
              And(
                ContainsField("readOnce", Select("data", Var("getBin"))),
                Select(["data", "readOnce"], Var("getBin"))
              ),
              Update(Select("ref", Var("getBin")), {
                ttl: Now(),
                data: Merge(Select("data", Var("getBin")), { lifetime: Now() }),
              }),
              null
            ),
            {
              hashed_id: If(Var("canAccess"), Select(["data", "hashed_id"], Var("getBin")), null),
              lifetime: If(Var("canAccess"), Select(["data", "lifetime"], Var("getBin")), null),
              text: If(Var("canAccess"), Select(["data", "text"], Var("getBin")), null),
              readOnce: If(Var("canAccess"), Select(["data", "readOnce"], Var("getBin")), null),
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
      )
    )
  ),
})

export default CreateFunctionReadBin
