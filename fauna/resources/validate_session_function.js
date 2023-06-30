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
  And,
  Get,
  If,
  Not,
  Let,
  LT,
  Now,
} = q

const CreateFunctionValidateSession = CreateFunction({
  name: "validateSession",
  role: Role("user"),
  body: Query(
    Lambda(
      ["session_token"],
      Let(
        {
          getSessionToken: If(
            Exists(Match(Index("session_by_session_token"), Var("session_token"))),
            Get(Match(Index("session_by_session_token"), Var("session_token"))),
            null
          ),
          isValid: And(
            Not(IsNull(Var("getSessionToken"))),
            LT(Now(), Select(["data", "expires"], Var("getSessionToken")))
          ),
        },
        {
          userId: If(Var("isValid"), Select(["data", "userId"], Var("getSessionToken")), null),
        }
      )
    )
  ),
})

export default CreateFunctionValidateSession
